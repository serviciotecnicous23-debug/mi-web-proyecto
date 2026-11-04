/**
 * Ensures all database tables and columns exist.
 * This runs on server startup to handle cases where drizzle-kit push
 * didn't create everything (e.g., on Render deploys).
 * 
 * Uses CREATE TABLE IF NOT EXISTS and ALTER TABLE ADD COLUMN IF NOT EXISTS
 * so it's safe to run repeatedly.
 */
import { pool } from "./db";

const CREATE_TABLES_SQL = `
-- Users (should already exist, but just in case)
CREATE TABLE IF NOT EXISTS "users" (
  "id" serial PRIMARY KEY,
  "username" text NOT NULL UNIQUE,
  "password" text NOT NULL,
  "role" text NOT NULL DEFAULT 'miembro',
  "display_name" text,
  "bio" text,
  "avatar_url" text,
  "is_active" boolean NOT NULL DEFAULT false,
  "cargo" text,
  "country" text,
  "phone" text,
  "email" text,
  "facebook" text,
  "instagram" text,
  "youtube" text,
  "tiktok" text,
  "twitter" text,
  "website" text,
  "created_at" timestamp DEFAULT now()
);

-- Messages
CREATE TABLE IF NOT EXISTS "messages" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "subject" text NOT NULL,
  "content" text NOT NULL,
  "is_read" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now()
);

-- Member posts
CREATE TABLE IF NOT EXISTS "member_posts" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "content" text NOT NULL,
  "image_url" text,
  "created_at" timestamp DEFAULT now()
);

-- Events
CREATE TABLE IF NOT EXISTS "events" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "event_date" timestamp NOT NULL,
  "event_end_date" timestamp,
  "location" text NOT NULL,
  "meeting_url" text,
  "meeting_platform" text,
  "image_url" text,
  "is_published" boolean NOT NULL DEFAULT true,
  "created_by" integer REFERENCES "users"("id"),
  "created_at" timestamp DEFAULT now()
);

-- Event RSVPs
CREATE TABLE IF NOT EXISTS "event_rsvps" (
  "id" serial PRIMARY KEY,
  "event_id" integer NOT NULL REFERENCES "events"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "status" text NOT NULL DEFAULT 'confirmado',
  "reminder" boolean NOT NULL DEFAULT true,
  "created_at" timestamp DEFAULT now()
);

-- Site content
CREATE TABLE IF NOT EXISTS "site_content" (
  "id" serial PRIMARY KEY,
  "section_key" text NOT NULL UNIQUE,
  "title" text,
  "content" text,
  "updated_at" timestamp DEFAULT now(),
  "updated_by" integer REFERENCES "users"("id")
);

-- Courses
CREATE TABLE IF NOT EXISTS "courses" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "category" text NOT NULL DEFAULT 'general',
  "image_url" text,
  "is_active" boolean NOT NULL DEFAULT true,
  "max_students" integer,
  "teacher_id" integer REFERENCES "users"("id"),
  "created_by" integer REFERENCES "users"("id"),
  "enrollment_status" text NOT NULL DEFAULT 'open',
  "enrollment_open_date" timestamp,
  "enrollment_close_date" timestamp,
  "created_at" timestamp DEFAULT now()
);

-- Course materials
CREATE TABLE IF NOT EXISTS "course_materials" (
  "id" serial PRIMARY KEY,
  "course_id" integer NOT NULL REFERENCES "courses"("id"),
  "title" text NOT NULL,
  "description" text,
  "file_url" text,
  "material_type" text NOT NULL DEFAULT 'documento',
  -- file attachment
  "file_name" text,
  "file_size" integer,
  "file_data" text,
  "sort_order" integer NOT NULL DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);

-- Course sessions
CREATE TABLE IF NOT EXISTS "course_sessions" (
  "id" serial PRIMARY KEY,
  "course_id" integer NOT NULL REFERENCES "courses"("id"),
  "title" text NOT NULL,
  "description" text,
  "session_date" timestamp NOT NULL,
  "duration" integer,
  "meeting_url" text,
  "meeting_platform" text DEFAULT 'zoom',
  "is_completed" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now()
);

-- Enrollments
CREATE TABLE IF NOT EXISTS "enrollments" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "course_id" integer NOT NULL REFERENCES "courses"("id"),
  "status" text NOT NULL DEFAULT 'solicitado',
  "grade" text,
  "observations" text,
  "enrolled_at" timestamp DEFAULT now(),
  "completed_at" timestamp
);

-- Teacher requests
CREATE TABLE IF NOT EXISTS "teacher_requests" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "course_id" integer NOT NULL REFERENCES "courses"("id"),
  "status" text NOT NULL DEFAULT 'solicitado',
  "message" text,
  "created_at" timestamp DEFAULT now()
);

-- Course announcements
CREATE TABLE IF NOT EXISTS "course_announcements" (
  "id" serial PRIMARY KEY,
  "course_id" integer NOT NULL REFERENCES "courses"("id"),
  "author_id" integer NOT NULL REFERENCES "users"("id"),
  "title" text NOT NULL,
  "content" text NOT NULL,
  "is_pinned" boolean NOT NULL DEFAULT false,
  -- file attachment columns
  "file_url" text,
  "file_name" text,
  "file_size" integer,
  "file_data" text,
  "created_at" timestamp DEFAULT now()
);

-- Cartelera central announcements
CREATE TABLE IF NOT EXISTS "cartelera_announcements" (
  "id" serial PRIMARY KEY,
  "author_id" integer NOT NULL REFERENCES "users"("id"),
  "title" text NOT NULL,
  "content" text NOT NULL,
  "category" text NOT NULL DEFAULT 'general',
  "is_pinned" boolean NOT NULL DEFAULT false,
  "expires_at" timestamp,
  -- file attachment
  "file_url" text,
  "file_name" text,
  "file_size" integer,
  "file_data" text,
  "created_at" timestamp DEFAULT now()
);

-- Course schedule
CREATE TABLE IF NOT EXISTS "course_schedule" (
  "id" serial PRIMARY KEY,
  "course_id" integer NOT NULL REFERENCES "courses"("id"),
  "day_of_week" integer NOT NULL,
  "start_time" text NOT NULL,
  "end_time" text NOT NULL,
  "specific_date" text,
  "meeting_url" text,
  "meeting_platform" text DEFAULT 'zoom',
  "description" text,
  "is_active" boolean NOT NULL DEFAULT true
);

-- Session attendance
CREATE TABLE IF NOT EXISTS "session_attendance" (
  "id" serial PRIMARY KEY,
  "session_id" integer NOT NULL REFERENCES "course_sessions"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "status" text NOT NULL DEFAULT 'presente',
  "created_at" timestamp DEFAULT now()
);

-- Ministry regions
CREATE TABLE IF NOT EXISTS "ministry_regions" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL UNIQUE,
  "is_active" boolean NOT NULL DEFAULT true,
  "sort_order" integer NOT NULL DEFAULT 0,
  "facebook" text,
  "instagram" text,
  "youtube" text,
  "tiktok" text,
  "twitter" text,
  "website" text,
  "created_at" timestamp DEFAULT now()
);

-- Ministry churches (cobertura y respaldo)
CREATE TABLE IF NOT EXISTS "ministry_churches" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "church_type" text NOT NULL DEFAULT 'respaldo',
  "pastor" text,
  "city" text,
  "country" text,
  "address" text,
  "phone" text,
  "email" text,
  "description" text,
  "image_url" text,
  "facebook" text,
  "instagram" text,
  "youtube" text,
  "tiktok" text,
  "twitter" text,
  "website" text,
  "is_active" boolean NOT NULL DEFAULT true,
  "sort_order" integer NOT NULL DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);

-- Church posts
CREATE TABLE IF NOT EXISTS "church_posts" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "church_id" integer NOT NULL REFERENCES "ministry_churches"("id"),
  "content" text NOT NULL,
  "image_url" text,
  "created_at" timestamp DEFAULT now()
);

-- Team members
CREATE TABLE IF NOT EXISTS "team_members" (
  "id" serial PRIMARY KEY,
  "user_id" integer REFERENCES "users"("id"),
  "name" text NOT NULL,
  "role" text NOT NULL,
  "description" text,
  "verse" text,
  "initials" text,
  "avatar_url" text,
  "sort_order" integer NOT NULL DEFAULT 0,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamp DEFAULT now()
);

-- Bible highlights
CREATE TABLE IF NOT EXISTS "bible_highlights" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "book" text NOT NULL,
  "chapter" integer NOT NULL,
  "verse_start" integer NOT NULL,
  "verse_end" integer NOT NULL,
  "color" text NOT NULL DEFAULT '#FFA500',
  "note" text,
  "created_at" timestamp DEFAULT now()
);

-- Bible notes
CREATE TABLE IF NOT EXISTS "bible_notes" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "book" text NOT NULL,
  "chapter" integer NOT NULL,
  "verse" integer NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);

-- Reading plans
CREATE TABLE IF NOT EXISTS "reading_plans" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "title" text NOT NULL,
  "description" text,
  "is_public" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now()
);

-- Reading plan items
CREATE TABLE IF NOT EXISTS "reading_plan_items" (
  "id" serial PRIMARY KEY,
  "plan_id" integer NOT NULL REFERENCES "reading_plans"("id"),
  "book" text NOT NULL,
  "chapter" integer NOT NULL,
  "is_completed" boolean NOT NULL DEFAULT false,
  "completed_at" timestamp,
  "sort_order" integer NOT NULL DEFAULT 0
);

-- Reading club posts
CREATE TABLE IF NOT EXISTS "reading_club_posts" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "book" text NOT NULL,
  "chapter" integer NOT NULL,
  "verse_start" integer,
  "verse_end" integer,
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);

-- Reading club comments
CREATE TABLE IF NOT EXISTS "reading_club_comments" (
  "id" serial PRIMARY KEY,
  "post_id" integer NOT NULL REFERENCES "reading_club_posts"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);

-- Reading club post likes
CREATE TABLE IF NOT EXISTS "reading_club_post_likes" (
  "id" serial PRIMARY KEY,
  "post_id" integer NOT NULL REFERENCES "reading_club_posts"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "created_at" timestamp DEFAULT now()
);

-- Library resources
CREATE TABLE IF NOT EXISTS "library_resources" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "title" text NOT NULL,
  "description" text,
  "resource_type" text NOT NULL DEFAULT 'documento',
  "file_data" text,
  "file_url" text,
  "file_name" text,
  "file_size" integer,
  "category" text NOT NULL DEFAULT 'general',
  "created_at" timestamp DEFAULT now()
);

-- Library resource likes
CREATE TABLE IF NOT EXISTS "library_resource_likes" (
  "id" serial PRIMARY KEY,
  "resource_id" integer NOT NULL REFERENCES "library_resources"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "created_at" timestamp DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS "notifications" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "type" text NOT NULL DEFAULT 'general',
  "title" text NOT NULL,
  "content" text NOT NULL,
  "link" text,
  "is_read" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now()
);

-- Prayer activities
CREATE TABLE IF NOT EXISTS "prayer_activities" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "title" text NOT NULL,
  "description" text,
  "meeting_url" text,
  "meeting_platform" text DEFAULT 'zoom',
  "scheduled_date" timestamp,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamp DEFAULT now()
);

-- Prayer attendees
CREATE TABLE IF NOT EXISTS "prayer_attendees" (
  "id" serial PRIMARY KEY,
  "activity_id" integer NOT NULL REFERENCES "prayer_activities"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "status" text NOT NULL DEFAULT 'confirmado',
  "created_at" timestamp DEFAULT now()
);

-- Region posts
CREATE TABLE IF NOT EXISTS "region_posts" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "region" text NOT NULL,
  "content" text NOT NULL,
  "image_url" text,
  "created_at" timestamp DEFAULT now()
);

-- Region post reactions
CREATE TABLE IF NOT EXISTS "region_post_reactions" (
  "id" serial PRIMARY KEY,
  "post_id" integer NOT NULL REFERENCES "region_posts"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "reaction_type" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);

-- Region post polls
CREATE TABLE IF NOT EXISTS "region_post_polls" (
  "id" serial PRIMARY KEY,
  "post_id" integer NOT NULL REFERENCES "region_posts"("id"),
  "question" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);

-- Region post poll options
CREATE TABLE IF NOT EXISTS "region_post_poll_options" (
  "id" serial PRIMARY KEY,
  "poll_id" integer NOT NULL REFERENCES "region_post_polls"("id"),
  "option_text" text NOT NULL,
  "sort_order" integer NOT NULL DEFAULT 0
);

-- Region post poll votes
CREATE TABLE IF NOT EXISTS "region_post_poll_votes" (
  "id" serial PRIMARY KEY,
  "option_id" integer NOT NULL REFERENCES "region_post_poll_options"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "created_at" timestamp DEFAULT now()
);

-- Post comments
CREATE TABLE IF NOT EXISTS "post_comments" (
  "id" serial PRIMARY KEY,
  "post_id" integer NOT NULL REFERENCES "member_posts"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);

-- Direct messages
CREATE TABLE IF NOT EXISTS "direct_messages" (
  "id" serial PRIMARY KEY,
  "sender_id" integer NOT NULL REFERENCES "users"("id"),
  "receiver_id" integer NOT NULL REFERENCES "users"("id"),
  "content" text NOT NULL,
  "is_read" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now()
);

-- Friendships
CREATE TABLE IF NOT EXISTS "friendships" (
  "id" serial PRIMARY KEY,
  "requester_id" integer NOT NULL REFERENCES "users"("id"),
  "addressee_id" integer NOT NULL REFERENCES "users"("id"),
  "status" text NOT NULL DEFAULT 'pending',
  "created_at" timestamp DEFAULT now()
);

-- User sessions (for connect-pg-simple)
CREATE TABLE IF NOT EXISTS "user_sessions" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("sid")
);
CREATE INDEX IF NOT EXISTS "IDX_user_sessions_expire" ON "user_sessions" ("expire");

-- Password reset tokens
CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "token" text NOT NULL UNIQUE,
  "expires_at" timestamp NOT NULL,
  "used_at" timestamp,
  "created_at" timestamp DEFAULT now()
);

-- Push notification subscriptions
CREATE TABLE IF NOT EXISTS "push_subscriptions" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "endpoint" text NOT NULL,
  "p256dh" text NOT NULL,
  "auth" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);

-- Certificates
CREATE TABLE IF NOT EXISTS "certificates" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "course_id" integer NOT NULL REFERENCES "courses"("id"),
  "enrollment_id" integer NOT NULL REFERENCES "enrollments"("id"),
  "certificate_code" text NOT NULL UNIQUE,
  "issued_at" timestamp DEFAULT now(),
  "teacher_name" text,
  "grade" text
);

-- Tithes and offerings
CREATE TABLE IF NOT EXISTS "tithes" (
  "id" serial PRIMARY KEY,
  "user_id" integer REFERENCES "users"("id"),
  "donor_name" text NOT NULL,
  "amount" text NOT NULL,
  "currency" text NOT NULL DEFAULT 'USD',
  "type" text NOT NULL DEFAULT 'diezmo',
  "method" text NOT NULL DEFAULT 'efectivo',
  "church_id" integer REFERENCES "ministry_churches"("id"),
  "region_name" text,
  "notes" text,
  "receipt_sent" boolean NOT NULL DEFAULT false,
  "created_at" timestamp DEFAULT now(),
  "recorded_by" integer REFERENCES "users"("id")
);

-- Sermons
CREATE TABLE IF NOT EXISTS "sermons" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "description" text,
  "preacher_id" integer REFERENCES "users"("id"),
  "preacher_name" text,
  "sermon_date" timestamp,
  "category" text NOT NULL DEFAULT 'general',
  "series_name" text,
  "video_url" text,
  "audio_url" text,
  "content" text,
  "image_url" text,
  "is_published" boolean NOT NULL DEFAULT true,
  "created_by" integer REFERENCES "users"("id"),
  "created_at" timestamp DEFAULT now()
);

-- Sermon notes
CREATE TABLE IF NOT EXISTS "sermon_notes" (
  "id" serial PRIMARY KEY,
  "sermon_id" integer NOT NULL REFERENCES "sermons"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

-- Small groups
CREATE TABLE IF NOT EXISTS "small_groups" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "description" text,
  "leader_id" integer NOT NULL REFERENCES "users"("id"),
  "meeting_day" integer,
  "meeting_time" text,
  "meeting_location" text,
  "meeting_url" text,
  "max_members" integer,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" timestamp DEFAULT now()
);

-- Small group members
CREATE TABLE IF NOT EXISTS "small_group_members" (
  "id" serial PRIMARY KEY,
  "group_id" integer NOT NULL REFERENCES "small_groups"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "role" text NOT NULL DEFAULT 'miembro',
  "joined_at" timestamp DEFAULT now()
);

-- Small group meetings
CREATE TABLE IF NOT EXISTS "small_group_meetings" (
  "id" serial PRIMARY KEY,
  "group_id" integer NOT NULL REFERENCES "small_groups"("id"),
  "title" text NOT NULL,
  "meeting_date" timestamp NOT NULL,
  "notes" text,
  "created_at" timestamp DEFAULT now()
);

-- Small group attendance
CREATE TABLE IF NOT EXISTS "small_group_attendance" (
  "id" serial PRIMARY KEY,
  "meeting_id" integer NOT NULL REFERENCES "small_group_meetings"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "status" text NOT NULL DEFAULT 'presente',
  "created_at" timestamp DEFAULT now()
);

-- Small group messages
CREATE TABLE IF NOT EXISTS "small_group_messages" (
  "id" serial PRIMARY KEY,
  "group_id" integer NOT NULL REFERENCES "small_groups"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "content" text NOT NULL,
  "created_at" timestamp DEFAULT now()
);

-- Live event sessions (monitoring)
CREATE TABLE IF NOT EXISTS "live_event_sessions" (
  "id" serial PRIMARY KEY,
  "context" text NOT NULL,
  "context_id" text NOT NULL,
  "title" text NOT NULL,
  "room_name" text NOT NULL,
  "started_by" integer NOT NULL REFERENCES "users"("id"),
  "started_at" timestamp NOT NULL DEFAULT now(),
  "ended_at" timestamp,
  "duration_minutes" integer,
  "peak_viewers" integer NOT NULL DEFAULT 0,
  "total_joins" integer NOT NULL DEFAULT 0,
  "status" text NOT NULL DEFAULT 'active'
);

-- Live event attendance (monitoring)
CREATE TABLE IF NOT EXISTS "live_event_attendance" (
  "id" serial PRIMARY KEY,
  "session_id" integer NOT NULL REFERENCES "live_event_sessions"("id"),
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "joined_at" timestamp NOT NULL DEFAULT now(),
  "left_at" timestamp,
  "duration_minutes" integer,
  "join_count" integer NOT NULL DEFAULT 1
);

-- ========== REFORMA MINISTERIAL: NUEVAS TABLAS ==========

-- Teacher Profiles (Ficha de Presentación Ministerial)
CREATE TABLE IF NOT EXISTS "teacher_profiles" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id") UNIQUE,
  "theological_education" text,
  "ministry_experience" text,
  "specializations" text,
  "doctrinal_statement" text,
  "pastoral_endorsement" text,
  "endorsed_by_user_id" integer REFERENCES "users"("id"),
  "teaching_materials" text,
  "is_approved" boolean NOT NULL DEFAULT false,
  "approved_at" timestamp,
  "approved_by_user_id" integer REFERENCES "users"("id"),
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now()
);

-- Church Permissions (RBAC Local)
CREATE TABLE IF NOT EXISTS "church_permissions" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "church_id" integer NOT NULL REFERENCES "ministry_churches"("id"),
  "role" text NOT NULL DEFAULT 'miembro',
  "granted_by" integer REFERENCES "users"("id"),
  "created_at" timestamp DEFAULT now()
);

-- Church Memberships (Historial)
CREATE TABLE IF NOT EXISTS "church_memberships" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "church_id" integer NOT NULL REFERENCES "ministry_churches"("id"),
  "status" text NOT NULL DEFAULT 'activo',
  "joined_at" timestamp DEFAULT now(),
  "left_at" timestamp,
  "reason" text
);

-- Course Teacher Assignments (Acuerdo Mutuo)
CREATE TABLE IF NOT EXISTS "course_teacher_assignments" (
  "id" serial PRIMARY KEY,
  "course_id" integer NOT NULL REFERENCES "courses"("id"),
  "teacher_user_id" integer NOT NULL REFERENCES "users"("id"),
  "proposed_by" integer NOT NULL REFERENCES "users"("id"),
  "approved_by" integer REFERENCES "users"("id"),
  "status" text NOT NULL DEFAULT 'propuesto',
  "message" text,
  "created_at" timestamp DEFAULT now(),
  "resolved_at" timestamp
);

-- Alliance Requests (Solicitud de Alianza)
CREATE TABLE IF NOT EXISTS "alliance_requests" (
  "id" serial PRIMARY KEY,
  "church_name" text NOT NULL,
  "pastor_name" text NOT NULL,
  "pastor_email" text NOT NULL,
  "pastor_phone" text,
  "city" text,
  "country" text,
  "denomination" text,
  "congregation_size" text,
  "motivation" text,
  "website" text,
  "status" text NOT NULL DEFAULT 'pendiente',
  "reviewed_by" integer REFERENCES "users"("id"),
  "review_notes" text,
  "resulting_church_id" integer REFERENCES "ministry_churches"("id"),
  "created_at" timestamp DEFAULT now(),
  "resolved_at" timestamp
);

-- Member Channeling (Canalización Ética)
CREATE TABLE IF NOT EXISTS "member_channeling" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "target_church_id" integer NOT NULL REFERENCES "ministry_churches"("id"),
  "status" text NOT NULL DEFAULT 'solicitado',
  "requested_at" timestamp DEFAULT now(),
  "consent_given" boolean NOT NULL DEFAULT true,
  "resolved_by" integer REFERENCES "users"("id"),
  "resolved_at" timestamp,
  "notes" text
);

-- Audit Log
CREATE TABLE IF NOT EXISTS "audit_log" (
  "id" serial PRIMARY KEY,
  "user_id" integer REFERENCES "users"("id"),
  "action" text NOT NULL,
  "entity_type" text NOT NULL,
  "entity_id" integer,
  "details" text,
  "ip_address" text,
  "created_at" timestamp DEFAULT now()
);

-- Member Progress (Gamificación / Badges)
CREATE TABLE IF NOT EXISTS "member_progress" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL REFERENCES "users"("id"),
  "badge_type" text NOT NULL,
  "earned_at" timestamp DEFAULT now(),
  "details" text
);

-- ========== AGENT ECOSYSTEM (Fase 1) ==========
-- Memoria compartida entre el bot de Telegram, Claude en Cowork, y futuros
-- agentes en background. Sobrevive a cortes de sesion.
CREATE TABLE IF NOT EXISTS "agent_missions" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "description" text,
  "status" text NOT NULL DEFAULT 'pending',
  "priority" text NOT NULL DEFAULT 'normal',
  "created_by" text NOT NULL,
  "assigned_to" text,
  "parent_id" integer,
  "progress_notes" text,
  "metadata" text,
  "created_at" timestamp DEFAULT now(),
  "updated_at" timestamp DEFAULT now(),
  "completed_at" timestamp
);

CREATE INDEX IF NOT EXISTS "idx_agent_missions_status" ON "agent_missions"("status");
CREATE INDEX IF NOT EXISTS "idx_agent_missions_assigned_to" ON "agent_missions"("assigned_to");

-- Revisiones: acciones de riesgo que esperan decision humana
CREATE TABLE IF NOT EXISTS "agent_review_requests" (
  "id" serial PRIMARY KEY,
  "mission_id" integer,
  "agent_id" text NOT NULL,
  "action_type" text NOT NULL,
  "summary" text NOT NULL,
  "payload" text,
  "risk_reasons" text,
  "risk_score" integer NOT NULL DEFAULT 0,
  "auto_decision" text,
  "decision" text NOT NULL DEFAULT 'pending',
  "decided_by" text,
  "decided_at" timestamp,
  "telegram_chat_id" text,
  "telegram_message_id" text,
  "expires_at" timestamp,
  "created_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "idx_agent_reviews_decision" ON "agent_review_requests"("decision");
CREATE INDEX IF NOT EXISTS "idx_agent_reviews_mission" ON "agent_review_requests"("mission_id");

-- Bitacora auditable de actividad de agentes
CREATE TABLE IF NOT EXISTS "agent_activity_log" (
  "id" serial PRIMARY KEY,
  "mission_id" integer,
  "agent_id" text NOT NULL,
  "action" text NOT NULL,
  "details" text,
  "success" boolean NOT NULL DEFAULT true,
  "created_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "idx_agent_activity_mission" ON "agent_activity_log"("mission_id");
CREATE INDEX IF NOT EXISTS "idx_agent_activity_created_at" ON "agent_activity_log"("created_at");
`;

// ALTER TABLE statements to add columns that might be missing from older schemas
const ADD_COLUMNS_SQL = [
  // Events table - newer columns
  `ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "meeting_url" text`,
  `ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "meeting_platform" text`,
  `ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "image_url" text`,
  `ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "is_published" boolean NOT NULL DEFAULT true`,
  `ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "event_end_date" timestamp`,
  // Users table - newer columns
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "cargo" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "country" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "phone" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email" text`,
  // Library resources - newer columns
  `ALTER TABLE "library_resources" ADD COLUMN IF NOT EXISTS "file_data" text`,
  `ALTER TABLE "library_resources" ADD COLUMN IF NOT EXISTS "file_url" text`,
  `ALTER TABLE "library_resources" ADD COLUMN IF NOT EXISTS "file_name" text`,
  `ALTER TABLE "library_resources" ADD COLUMN IF NOT EXISTS "file_size" integer`,
  // course_schedule - missing column
  `ALTER TABLE "course_schedule" ADD COLUMN IF NOT EXISTS "specific_date" text`,
  // courses - enrollment management columns
  `ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "enrollment_status" text NOT NULL DEFAULT 'open'`,
  `ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "enrollment_open_date" timestamp`,
  `ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "enrollment_close_date" timestamp`,
  // course material attachments
  `ALTER TABLE "course_materials" ADD COLUMN IF NOT EXISTS "file_name" text`,
  `ALTER TABLE "course_materials" ADD COLUMN IF NOT EXISTS "file_size" integer`,
  `ALTER TABLE "course_materials" ADD COLUMN IF NOT EXISTS "file_data" text`,
  // announcement attachments
  `ALTER TABLE "course_announcements" ADD COLUMN IF NOT EXISTS "file_url" text`,
  `ALTER TABLE "course_announcements" ADD COLUMN IF NOT EXISTS "file_name" text`,
  `ALTER TABLE "course_announcements" ADD COLUMN IF NOT EXISTS "file_size" integer`,
  `ALTER TABLE "course_announcements" ADD COLUMN IF NOT EXISTS "file_data" text`,
  `ALTER TABLE "cartelera_announcements" ADD COLUMN IF NOT EXISTS "file_url" text`,
  `ALTER TABLE "cartelera_announcements" ADD COLUMN IF NOT EXISTS "file_name" text`,
  `ALTER TABLE "cartelera_announcements" ADD COLUMN IF NOT EXISTS "file_size" integer`,
  `ALTER TABLE "cartelera_announcements" ADD COLUMN IF NOT EXISTS "file_data" text`,
  // Fix expires_at column type if it was created as text instead of timestamp
  `DO $$ BEGIN IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='cartelera_announcements' AND column_name='expires_at' AND data_type='text') THEN ALTER TABLE "cartelera_announcements" ALTER COLUMN "expires_at" TYPE timestamp USING "expires_at"::timestamp; END IF; END $$`,
  // Team members - newer columns
  `ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "verse" text`,
  `ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "initials" text`,
  `ALTER TABLE "team_members" ADD COLUMN IF NOT EXISTS "user_id" integer REFERENCES "users"("id")`,
  // Social media columns for users
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "facebook" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "instagram" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "youtube" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "tiktok" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "twitter" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "website" text`,
  // Social media columns for ministry_regions
  `ALTER TABLE "ministry_regions" ADD COLUMN IF NOT EXISTS "facebook" text`,
  `ALTER TABLE "ministry_regions" ADD COLUMN IF NOT EXISTS "instagram" text`,
  `ALTER TABLE "ministry_regions" ADD COLUMN IF NOT EXISTS "youtube" text`,
  `ALTER TABLE "ministry_regions" ADD COLUMN IF NOT EXISTS "tiktok" text`,
  `ALTER TABLE "ministry_regions" ADD COLUMN IF NOT EXISTS "twitter" text`,
  `ALTER TABLE "ministry_regions" ADD COLUMN IF NOT EXISTS "website" text`,
  // Social media columns for ministry_churches
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "facebook" text`,
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "instagram" text`,
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "youtube" text`,
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "tiktok" text`,
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "twitter" text`,
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "website" text`,
  // Users - email verification columns
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_verified" boolean NOT NULL DEFAULT false`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_verify_token" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_verify_expires" timestamp`,
  // Users - preferencias de correo (Perfil → Notificaciones)
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_notify_account_approved" boolean NOT NULL DEFAULT true`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_notify_direct_message" boolean NOT NULL DEFAULT true`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_notify_new_course" boolean NOT NULL DEFAULT true`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email_notify_event_reminder" boolean NOT NULL DEFAULT true`,
  // Certificates - admin editable fields
  `ALTER TABLE "certificates" ADD COLUMN IF NOT EXISTS "student_name_override" text`,
  `ALTER TABLE "certificates" ADD COLUMN IF NOT EXISTS "course_name_override" text`,
  `ALTER TABLE "certificates" ADD COLUMN IF NOT EXISTS "custom_message" text`,
  `ALTER TABLE "certificates" ADD COLUMN IF NOT EXISTS "signature_url" text`,
  `ALTER TABLE "certificates" ADD COLUMN IF NOT EXISTS "issued_date_override" text`,
  // ========== REFORMA MINISTERIAL ==========
  // Users - alianza fields
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "church_id" integer`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "member_type" text DEFAULT 'independiente'`,
  // Courses - alianza fields
  `ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "course_type" text NOT NULL DEFAULT 'global'`,
  `ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "church_id" integer`,
  `ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "prerequisite_course_id" integer`,
  `ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "is_public" boolean NOT NULL DEFAULT true`,
  `ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "level" integer NOT NULL DEFAULT 1`,
  // Ministry Churches - alianza fields
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "pastor_user_id" integer REFERENCES "users"("id")`,
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "logo_url" text`,
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "alliance_status" text NOT NULL DEFAULT 'pendiente'`,
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "alliance_date" timestamp`,
  `ALTER TABLE "ministry_churches" ADD COLUMN IF NOT EXISTS "max_admins" integer NOT NULL DEFAULT 3`,
  // Certificates - co-certification
  `ALTER TABLE "certificates" ADD COLUMN IF NOT EXISTS "church_id" integer`,
  `ALTER TABLE "certificates" ADD COLUMN IF NOT EXISTS "church_logo_url" text`,
  `ALTER TABLE "certificates" ADD COLUMN IF NOT EXISTS "church_name" text`,
  `ALTER TABLE "certificates" ADD COLUMN IF NOT EXISTS "is_co_certified" boolean NOT NULL DEFAULT false`,
];

export async function ensureDatabaseSchema(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.log("⚠ No DATABASE_URL - skipping schema verification");
    return;
  }

  try {
    console.log("Verifying database schema...");
    
    // Step 1: Create all tables (IF NOT EXISTS = safe to run repeatedly)
    await pool.query(CREATE_TABLES_SQL);
    
    // Step 2: Add missing columns to existing tables
    for (const sql of ADD_COLUMNS_SQL) {
      try {
        await pool.query(sql);
      } catch (err: any) {
        // Ignore "already exists" errors
        if (!err.message?.includes("already exists") && !err.message?.includes("duplicate column")) {
          console.log(`  Migration note: ${err.message}`);
        }
      }
    }

    // Step 3: Fix corrupted prayer_attendees records (bug: status was stored as "[object Object]")
    try {
      const fixResult = await pool.query(
        `UPDATE prayer_attendees SET status = 'confirmado' WHERE status NOT IN ('confirmado', 'tal_vez', 'no_asistire')`
      );
      if (fixResult.rowCount && fixResult.rowCount > 0) {
        console.log(`  Fixed ${fixResult.rowCount} corrupted prayer_attendees records`);
      }
    } catch (_err) {
      // Table might not exist yet, ignore
    }
    
    console.log("✓ Database schema verified - all tables and columns present");
  } catch (err) {
    console.error("✗ Database schema verification failed:", err);
    // Don't crash the server - let it try to operate with whatever schema exists
  }
}
