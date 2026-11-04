import * as esbuild from "esbuild";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function buildApp() {
  console.log("=== Building Client (Vite) ===");
  execSync("npx vite build", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production" },
  });

  console.log("\n=== Building Server (esbuild) ===");
  await esbuild.build({
    entryPoints: [path.resolve(root, "server/index.ts")],
    bundle: true,
    platform: "node",
    target: "node22",
    format: "cjs",
    outfile: path.resolve(root, "dist/index.cjs"),
    external: [
      "pg-native",
      "better-sqlite3",
      "bufferutil",
      "utf-8-validate",
      "lightningcss",
      "sharp",
      "@babel/core",
      "@babel/preset-typescript",
      "vite",
      "@vitejs/plugin-react",
      "@replit/vite-plugin-runtime-error-modal",
      "@replit/vite-plugin-cartographer",
      "@replit/vite-plugin-dev-banner",
      "../vite.config",
      "../vite.config.ts",
    ],
    define: {
      "import.meta.dirname": "__dirname",
      "import.meta.url": "import_meta_url",
    },
    banner: {
      js: 'const import_meta_url = "file://" + __filename;',
    },
    alias: {
      "@shared": path.resolve(root, "shared"),
    },
    sourcemap: true,
    minify: false,
    loader: {
      ".ts": "ts",
    },
  });

  console.log("\n=== Build Complete! ===");
  console.log("  Client: dist/public/");
  console.log("  Server: dist/index.cjs");
}

buildApp().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
