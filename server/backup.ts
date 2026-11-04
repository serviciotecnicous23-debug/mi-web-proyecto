/**
 * Automated Database Backup System
 * 
 * Supports:
 * - Scheduled pg_dump backups via node-cron
 * - Local file storage with rotation (keeps last N backups)
 * - Optional S3/R2 upload for off-site storage
 * - Manual backup trigger via admin API
 * 
 * Environment variables:
 *   BACKUP_ENABLED        - "true" to enable scheduled backups (default: "false")
 *   BACKUP_CRON           - Cron schedule (default: "0 3 * * *" = daily at 3 AM)
 *   BACKUP_RETENTION_DAYS - Days to keep local backups (default: 7)
 *   BACKUP_S3_BUCKET      - S3/R2 bucket name for off-site storage (optional)
 *   BACKUP_S3_PREFIX      - Key prefix in bucket (default: "backups/")
 *   DATABASE_URL           - PostgreSQL connection string (required)
 * 
 * S3/R2 credentials reuse the same env vars as file storage:
 *   S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY
 */

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import cron from "node-cron";

const execAsync = promisify(exec);

// ─── Configuration ───────────────────────────────────────────────────────────

const BACKUP_DIR = path.resolve(process.cwd(), "backups");
const BACKUP_ENABLED = process.env.BACKUP_ENABLED === "true";
const BACKUP_CRON = process.env.BACKUP_CRON || "0 3 * * *"; // Daily at 3 AM
const BACKUP_RETENTION_DAYS = parseInt(process.env.BACKUP_RETENTION_DAYS || "7", 10);
const BACKUP_S3_BUCKET = process.env.BACKUP_S3_BUCKET || "";
const BACKUP_S3_PREFIX = process.env.BACKUP_S3_PREFIX || "backups/";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, "-").replace("T", "_").slice(0, 19);
}

function ensureBackupDir(): void {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log(`[backup] Created backup directory: ${BACKUP_DIR}`);
  }
}

/**
 * Parse DATABASE_URL to extract connection details for pg_dump.
 * Returns env vars to pass to the child process.
 */
function parseDatabaseUrl(url: string): Record<string, string> {
  const parsed = new URL(url);
  return {
    PGHOST: parsed.hostname,
    PGPORT: parsed.port || "5432",
    PGDATABASE: parsed.pathname.slice(1),
    PGUSER: parsed.username,
    PGPASSWORD: decodeURIComponent(parsed.password),
    // Pass SSL mode for production connections
    ...(process.env.NODE_ENV === "production" ? { PGSSLMODE: "require" } : {}),
  };
}

// ─── Core Backup Function ────────────────────────────────────────────────────

export interface BackupResult {
  success: boolean;
  filename?: string;
  filepath?: string;
  sizeBytes?: number;
  durationMs: number;
  uploadedToS3?: boolean;
  error?: string;
}

/**
 * Run a pg_dump backup and optionally upload to S3/R2.
 */
export async function runBackup(): Promise<BackupResult> {
  const startTime = Date.now();
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return {
      success: false,
      durationMs: Date.now() - startTime,
      error: "DATABASE_URL not configured",
    };
  }

  ensureBackupDir();

  const timestamp = getTimestamp();
  const filename = `backup_${timestamp}.sql.gz`;
  const filepath = path.join(BACKUP_DIR, filename);

  try {
    const pgEnv = parseDatabaseUrl(databaseUrl);

    // pg_dump with gzip compression
    // --no-owner and --no-privileges for portability across environments
    const command = `pg_dump --format=plain --no-owner --no-privileges | gzip > "${filepath}"`;

    await execAsync(command, {
      env: { ...process.env, ...pgEnv },
      timeout: 300_000, // 5 minute timeout
    });

    // Verify file was created and has content
    const stats = fs.statSync(filepath);
    if (stats.size < 100) {
      // Gzip header alone is ~20 bytes; an empty dump with gzip is suspect
      throw new Error(`Backup file suspiciously small: ${stats.size} bytes`);
    }

    console.log(`[backup] Created: ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);

    // Upload to S3/R2 if configured
    let uploadedToS3 = false;
    if (BACKUP_S3_BUCKET) {
      try {
        await uploadToS3(filepath, filename);
        uploadedToS3 = true;
        console.log(`[backup] Uploaded to S3: ${BACKUP_S3_PREFIX}${filename}`);
      } catch (s3Err) {
        console.error(`[backup] S3 upload failed:`, s3Err);
        // Don't fail the whole backup if S3 upload fails
      }
    }

    // Clean up old backups
    await cleanOldBackups();

    return {
      success: true,
      filename,
      filepath,
      sizeBytes: stats.size,
      durationMs: Date.now() - startTime,
      uploadedToS3,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[backup] Failed:`, message);

    // Clean up partial file
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return {
      success: false,
      durationMs: Date.now() - startTime,
      error: message,
    };
  }
}

// ─── S3/R2 Upload ────────────────────────────────────────────────────────────

async function uploadToS3(filepath: string, filename: string): Promise<void> {
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");

  const client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION || "auto",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    },
    forcePathStyle: true, // Required for R2 and MinIO
  });

  const fileStream = fs.createReadStream(filepath);
  const stats = fs.statSync(filepath);

  await client.send(
    new PutObjectCommand({
      Bucket: BACKUP_S3_BUCKET,
      Key: `${BACKUP_S3_PREFIX}${filename}`,
      Body: fileStream,
      ContentLength: stats.size,
      ContentType: "application/gzip",
      ContentEncoding: "gzip",
    })
  );
}

// ─── Cleanup ─────────────────────────────────────────────────────────────────

async function cleanOldBackups(): Promise<void> {
  if (!fs.existsSync(BACKUP_DIR)) return;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - BACKUP_RETENTION_DAYS);

  const files = fs.readdirSync(BACKUP_DIR).filter((f) => f.startsWith("backup_") && f.endsWith(".sql.gz"));

  let removed = 0;
  for (const file of files) {
    const filepath = path.join(BACKUP_DIR, file);
    const stats = fs.statSync(filepath);
    if (stats.mtime < cutoffDate) {
      fs.unlinkSync(filepath);
      removed++;
    }
  }

  if (removed > 0) {
    console.log(`[backup] Cleaned up ${removed} old backup(s) (retention: ${BACKUP_RETENTION_DAYS} days)`);
  }
}

// ─── List Backups ────────────────────────────────────────────────────────────

export interface BackupInfo {
  filename: string;
  sizeBytes: number;
  createdAt: string;
}

export function listBackups(): BackupInfo[] {
  if (!fs.existsSync(BACKUP_DIR)) return [];

  return fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => f.startsWith("backup_") && f.endsWith(".sql.gz"))
    .map((filename) => {
      const filepath = path.join(BACKUP_DIR, filename);
      const stats = fs.statSync(filepath);
      return {
        filename,
        sizeBytes: stats.size,
        createdAt: stats.mtime.toISOString(),
      };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// ─── Restore ─────────────────────────────────────────────────────────────────

export async function restoreBackup(filename: string): Promise<{ success: boolean; error?: string }> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return { success: false, error: "DATABASE_URL not configured" };
  }

  const filepath = path.join(BACKUP_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return { success: false, error: `Backup file not found: ${filename}` };
  }

  // Basic path traversal protection
  if (filename.includes("..") || filename.includes("/")) {
    return { success: false, error: "Invalid filename" };
  }

  try {
    const pgEnv = parseDatabaseUrl(databaseUrl);
    const command = `gunzip -c "${filepath}" | psql`;

    await execAsync(command, {
      env: { ...process.env, ...pgEnv },
      timeout: 600_000, // 10 minute timeout for restore
    });

    console.log(`[backup] Restored from: ${filename}`);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[backup] Restore failed:`, message);
    return { success: false, error: message };
  }
}

// ─── Scheduler ───────────────────────────────────────────────────────────────

let scheduledTask: ReturnType<typeof cron.schedule> | null = null;

export function startBackupScheduler(): void {
  if (!BACKUP_ENABLED) {
    console.log("[backup] Scheduled backups disabled (set BACKUP_ENABLED=true to enable)");
    return;
  }

  if (!process.env.DATABASE_URL) {
    console.log("[backup] Skipping backup scheduler — no DATABASE_URL configured");
    return;
  }

  if (!cron.validate(BACKUP_CRON)) {
    console.error(`[backup] Invalid cron expression: ${BACKUP_CRON}`);
    return;
  }

  scheduledTask = cron.schedule(BACKUP_CRON, async () => {
    console.log("[backup] Starting scheduled backup...");
    const result = await runBackup();
    if (result.success) {
      console.log(`[backup] Scheduled backup completed in ${result.durationMs}ms — ${result.filename}`);
    } else {
      console.error(`[backup] Scheduled backup failed: ${result.error}`);
    }
  });

  console.log(`[backup] Scheduler active — cron: "${BACKUP_CRON}" | retention: ${BACKUP_RETENTION_DAYS} days | S3: ${BACKUP_S3_BUCKET || "disabled"}`);
}

export function stopBackupScheduler(): void {
  if (scheduledTask) {
    scheduledTask.stop();
    scheduledTask = null;
    console.log("[backup] Scheduler stopped");
  }
}
