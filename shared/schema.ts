import { pgTable, text, serial, boolean, timestamp, integer, jsonb, customType, primaryKey, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("miembro"),
  displayName: text("display_name"),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").notNull().default(false),
  emailVerified: boolean("email_verified").notNull().default(false),
  emailVerifyToken: text("email_verify_token"),
  emailVerifyExpires: timestamp("email_verify_expires"),
  // Preferencias de correo (Perfil → Notificaciones)
  emailNotifyAccountApproved: boolean("email_notify_account_approved").notNull().default(true),
  emailNotifyDirectMessage: boolean("email_notify_direct_message").notNull().default(true),
  emailNotifyNewCourse: boolean("email_notify_new_course").notNull().default(true),
  emailNotifyEventReminder: boolean("email_notify_event_reminder").notNull().default(true),
  cargo: text("cargo"),
  country: text("country"),
  phone: text("phone"),
  email: text("email"),
  facebook: text("facebook"),
  instagram: text("instagram"),
  youtube: text("youtube"),
  tiktok: text("tiktok"),
  twitter: text("twitter"),
  website: text("website"),
  // Alianza: vinculación a iglesia aliada
  churchId: integer("church_id"),
  memberType: text("member_type").default("independiente"), // visitante, independiente, iglesia
  createdAt: timestamp("created_at").defaultNow(),
});

export const MINISTRY_POSITIONS = [
  "Pastor", "Evangelista", "Coordinador", "Lider de Alabanza",
  "Maestro", "Diacono", "Misionero", "Intercesor", "Ujier",
  "Lider de Jovenes", "Lider de Ninos", "Tesorero", "Secretario",
] as const;

export const MINISTRY_COUNTRIES = [
  "Estados Unidos", "Venezuela", "Peru", "Colombia", "Mexico",
  "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Costa Rica", "Panama",
  "Ecuador", "Chile", "Argentina", "Brasil", "Bolivia", "Paraguay", "Uruguay",
  "Republica Dominicana", "Cuba", "Puerto Rico", "Espana",
  "Otro",
] as const;

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const memberPosts = pgTable("member_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  // Documento adjunto (estudio, PDF, Word, audio...): dirección, nombre, tamaño y tipo.
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  fileMime: text("file_mime"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date").notNull(),
  eventEndDate: timestamp("event_end_date"),
  location: text("location").notNull(),
  meetingUrl: text("meeting_url"),
  meetingPlatform: text("meeting_platform"),
  imageUrl: text("image_url"),
  isPublished: boolean("is_published").notNull().default(true),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const eventRsvps = pgTable("event_rsvps", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull().references(() => events.id),
  userId: integer("user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("confirmado"),
  reminder: boolean("reminder").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  sectionKey: text("section_key").notNull().unique(),
  title: text("title"),
  content: text("content"),
  updatedAt: timestamp("updated_at").defaultNow(),
  updatedBy: integer("updated_by").references(() => users.id),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull().default("general"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  maxStudents: integer("max_students"),
  teacherId: integer("teacher_id").references(() => users.id),
  createdBy: integer("created_by").references(() => users.id),
  enrollmentStatus: text("enrollment_status").notNull().default("open"),
  enrollmentOpenDate: timestamp("enrollment_open_date"),
  enrollmentCloseDate: timestamp("enrollment_close_date"),
  // Alianza: tipo de curso y alcance
  courseType: text("course_type").notNull().default("global"), // core, iglesia, global
  churchId: integer("church_id"),  // null = global/core, id = exclusivo de iglesia
  prerequisiteCourseId: integer("prerequisite_course_id"), // para ruta Evangelismo 1->2->3
  isPublic: boolean("is_public").notNull().default(true), // visible para todos o solo miembros
  level: integer("level").notNull().default(1), // nivel del curso (1, 2, 3...)
  // Planilla de notas: las evaluaciones del curso (nombre y peso en %, opcional).
  gradeItems: jsonb("grade_items").$type<CourseGradeItem[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courseMaterials = pgTable("course_materials", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url"),
  materialType: text("material_type").notNull().default("documento"),
  // file attachment attributes
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  fileData: text("file_data"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courseSessions = pgTable("course_sessions", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  description: text("description"),
  sessionDate: timestamp("session_date").notNull(),
  duration: integer("duration"),
  meetingUrl: text("meeting_url"),
  meetingPlatform: text("meeting_platform").default("zoom"),
  isCompleted: boolean("is_completed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  status: text("status").notNull().default("solicitado"),
  grade: text("grade"),
  observations: text("observations"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  // Notas parciales de la planilla: { [clave de la evaluación]: "18" }.
  scores: jsonb("scores").$type<Record<string, string>>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  displayName: true,
  bio: true,
  avatarUrl: true,
  isActive: true,
  emailVerified: true,
  emailVerifyToken: true,
  emailVerifyExpires: true,
  country: true,
  phone: true,
  email: true,
  facebook: true,
  instagram: true,
  youtube: true,
  tiktok: true,
  twitter: true,
  website: true,
  churchId: true,
  memberType: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  displayName: true,
  bio: true,
  avatarUrl: true,
  country: true,
  phone: true,
  email: true,
  username: true,
  facebook: true,
  instagram: true,
  youtube: true,
  tiktok: true,
  twitter: true,
  website: true,
  emailVerified: true,
  emailVerifyToken: true,
  emailVerifyExpires: true,
  password: true,
  churchId: true,
  memberType: true,
}).partial();

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "La contraseña actual es requerida"),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
});

export const insertMessageSchema = createInsertSchema(messages);

export const insertMemberPostSchema = createInsertSchema(memberPosts).pick({
  content: true,
  imageUrl: true,
  fileUrl: true,
  fileName: true,
  fileSize: true,
  fileMime: true,
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  location: true,
  meetingUrl: true,
  meetingPlatform: true,
  imageUrl: true,
  isPublished: true,
}).extend({
  eventDate: z.string(),
  eventEndDate: z.string().optional().nullable(),
  meetingUrl: z.string().optional().nullable(),
  meetingPlatform: z.string().optional().nullable(),
});

export const updateEventSchema = insertEventSchema.partial();

export const insertEventRsvpSchema = z.object({
  eventId: z.number(),
  status: z.enum(["confirmado", "tal_vez", "no_asistire"]).optional(),
  reminder: z.boolean().optional(),
});

export const updateSiteContentSchema = z.object({
  title: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  category: true,
  imageUrl: true,
  isActive: true,
  maxStudents: true,
  teacherId: true,
  enrollmentStatus: true,
  courseType: true,
  churchId: true,
  prerequisiteCourseId: true,
  isPublic: true,
  level: true,
}).extend({
  enrollmentOpenDate: z.string().optional().nullable(),
  enrollmentCloseDate: z.string().optional().nullable(),
});

export const updateCourseSchema = insertCourseSchema.partial();

export const insertCourseMaterialSchema = createInsertSchema(courseMaterials).pick({
  courseId: true,
  title: true,
  description: true,
  fileUrl: true,
  materialType: true,
  fileName: true,
  fileSize: true,
  fileData: true,
  sortOrder: true,
});

export const updateCourseMaterialSchema = insertCourseMaterialSchema.omit({ courseId: true }).partial();

export const insertCourseSessionSchema = createInsertSchema(courseSessions).pick({
  courseId: true,
  title: true,
  description: true,
  duration: true,
  meetingUrl: true,
  meetingPlatform: true,
}).extend({
  sessionDate: z.string(),
});

export const updateCourseSessionSchema = insertCourseSessionSchema.omit({ courseId: true }).partial().extend({
  isCompleted: z.boolean().optional(),
});

export const insertEnrollmentSchema = z.object({
  courseId: z.number(),
});

export const updateEnrollmentSchema = z.object({
  status: z.enum(["solicitado", "aprobado", "rechazado", "completado"]).optional(),
  grade: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
});

// ========== PLANILLAS DEL CURSO ==========
/** Una evaluación de la planilla de notas (p. ej. "Examen final", peso 40 %). */
export type CourseGradeItem = { key: string; label: string; weight?: number | null };

export const courseGradeItemSchema = z.object({
  key: z.string().regex(/^[a-z0-9_-]{1,24}$/, "Clave de evaluación no válida"),
  label: z.string().trim().min(1, "Ponle nombre a la evaluación").max(40),
  weight: z.number().min(0).max(100).nullable().optional(),
});

export const saveCourseGradesSchema = z.object({
  items: z.array(courseGradeItemSchema).max(12, "Máximo 12 evaluaciones").optional(),
  rows: z.array(z.object({
    enrollmentId: z.number().int(),
    scores: z.record(z.string(), z.string().max(12)).optional(),
    grade: z.string().max(20).nullable().optional(),
    observations: z.string().max(500).nullable().optional(),
  })).max(500).optional(),
});

/** Pasar asistencia de toda la lista de una vez; status null borra la marca. */
export const bulkAttendanceSchema = z.object({
  records: z.array(z.object({
    userId: z.number().int(),
    status: z.enum(["presente", "ausente", "tardanza", "excusado"]).nullable(),
  })).max(500),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type MemberPost = typeof memberPosts.$inferSelect;
export type InsertMemberPost = z.infer<typeof insertMemberPostSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type EventRsvp = typeof eventRsvps.$inferSelect;
export type InsertEventRsvp = z.infer<typeof insertEventRsvpSchema>;
export type SiteContent = typeof siteContent.$inferSelect;
export type UpdateSiteContent = z.infer<typeof updateSiteContentSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type UpdateCourse = z.infer<typeof updateCourseSchema>;
export type CourseMaterial = typeof courseMaterials.$inferSelect;
export type InsertCourseMaterial = z.infer<typeof insertCourseMaterialSchema>;
export type UpdateCourseMaterial = z.infer<typeof updateCourseMaterialSchema>;
export type CourseSession = typeof courseSessions.$inferSelect;
export type InsertCourseSession = z.infer<typeof insertCourseSessionSchema>;
export type UpdateCourseSession = z.infer<typeof updateCourseSessionSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type UpdateEnrollment = z.infer<typeof updateEnrollmentSchema>;

export const teacherRequests = pgTable("teacher_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  status: text("status").notNull().default("solicitado"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTeacherRequestSchema = z.object({
  courseId: z.number(),
  message: z.string().optional().nullable(),
});

export const updateTeacherRequestSchema = z.object({
  status: z.enum(["solicitado", "aprobado", "rechazado"]),
});

export type TeacherRequest = typeof teacherRequests.$inferSelect;
export type InsertTeacherRequest = z.infer<typeof insertTeacherRequestSchema>;
export type UpdateTeacherRequest = z.infer<typeof updateTeacherRequestSchema>;

export const courseAnnouncements = pgTable("course_announcements", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  authorId: integer("author_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isPinned: boolean("is_pinned").notNull().default(false),
  // file attachment optional fields
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  fileData: text("file_data"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courseSchedule = pgTable("course_schedule", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  dayOfWeek: integer("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  specificDate: text("specific_date"),
  meetingUrl: text("meeting_url"),
  meetingPlatform: text("meeting_platform").default("zoom"),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
});

// ========== CARTELERA CENTRAL ==========
export const carteleraAnnouncements = pgTable("cartelera_announcements", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull().default("general"),
  isPinned: boolean("is_pinned").notNull().default(false),
  expiresAt: timestamp("expires_at"),
  // file attachment support
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  fileData: text("file_data"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sessionAttendance = pgTable("session_attendance", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull().references(() => courseSessions.id),
  userId: integer("user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("presente"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCourseAnnouncementSchema = z.object({
  courseId: z.number(),
  title: z.string().min(1),
  content: z.string().min(1),
  isPinned: z.boolean().optional(),
  fileUrl: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
  fileSize: z.number().optional().nullable(),
  fileData: z.string().optional().nullable(),
});

export const updateCourseAnnouncementSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  isPinned: z.boolean().optional(),
  fileUrl: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
  fileSize: z.number().optional().nullable(),
  fileData: z.string().optional().nullable(),
});

export const insertCourseScheduleSchema = z.object({
  courseId: z.number(),
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string(),
  endTime: z.string(),
  specificDate: z.string().optional().nullable(),
  meetingUrl: z.string().optional().nullable(),
  meetingPlatform: z.string().optional(),
  description: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const insertCarteleraAnnouncementSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string().optional(),
  isPinned: z.boolean().optional(),
  expiresAt: z.string().optional().nullable(),
  fileUrl: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
  fileSize: z.number().optional().nullable(),
  fileData: z.string().optional().nullable(),
});
export const updateCarteleraAnnouncementSchema = insertCarteleraAnnouncementSchema.partial();
export type CarteleraAnnouncement = typeof carteleraAnnouncements.$inferSelect;
export type InsertCarteleraAnnouncement = z.infer<typeof insertCarteleraAnnouncementSchema>;
export type UpdateCarteleraAnnouncement = z.infer<typeof updateCarteleraAnnouncementSchema>;

export const updateCourseScheduleSchema = insertCourseScheduleSchema.omit({ courseId: true }).partial();

export const insertSessionAttendanceSchema = z.object({
  sessionId: z.number(),
  userId: z.number(),
  status: z.enum(["presente", "ausente", "tardanza", "excusado"]).optional(),
});

export type CourseAnnouncement = typeof courseAnnouncements.$inferSelect;
export type InsertCourseAnnouncement = z.infer<typeof insertCourseAnnouncementSchema>;
export type UpdateCourseAnnouncement = z.infer<typeof updateCourseAnnouncementSchema>;
export type CourseScheduleEntry = typeof courseSchedule.$inferSelect;
export type InsertCourseSchedule = z.infer<typeof insertCourseScheduleSchema>;
export type UpdateCourseSchedule = z.infer<typeof updateCourseScheduleSchema>;
export type SessionAttendance = typeof sessionAttendance.$inferSelect;
export type InsertSessionAttendance = z.infer<typeof insertSessionAttendanceSchema>;

export const DAYS_OF_WEEK = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miercoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sabado",
} as const;

export const MEETING_PLATFORMS = {
  jitsi: "Jitsi Meet (Sala en Vivo)",
  zoom: "Zoom",
  google_meet: "Google Meet",
  teams: "Microsoft Teams",
  otro: "Otro",
} as const;

export const CARTELERA_CATEGORIES = {
  general: "General",
  urgente: "Urgente",
  academico: "Academico",
  evento: "Evento",
  devocional: "Devocional",
} as const;

export const ATTENDANCE_STATUSES = {
  presente: "Presente",
  ausente: "Ausente",
  tardanza: "Tardanza",
  excusado: "Excusado",
} as const;

export const TEACHER_REQUEST_STATUSES = {
  solicitado: "Solicitado",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
} as const;

// Los roles viven en shared/roles.ts (liviano): el menú de la web los usa en todas las páginas y no debe cargar el esquema.
export { ROLES } from "./roles";

export const MEMBER_TYPES = {
  visitante: "Visitante / Buscador",
  independiente: "Miembro Independiente",
  iglesia: "Miembro de Iglesia Aliada",
} as const;

export const ALLIANCE_STATUSES = {
  pendiente: "Pendiente de Aprobación",
  activa: "Alianza Activa",
  suspendida: "Suspendida",
  inactiva: "Inactiva",
} as const;

export const MINISTRY_REGIONS = [
  "Venezuela", "Peru", "Estados Unidos",
] as const;

export const ministryRegions = pgTable("ministry_regions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  facebook: text("facebook"),
  instagram: text("instagram"),
  youtube: text("youtube"),
  tiktok: text("tiktok"),
  twitter: text("twitter"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMinistryRegionSchema = createInsertSchema(ministryRegions).pick({
  name: true,
  isActive: true,
  sortOrder: true,
  facebook: true,
  instagram: true,
  youtube: true,
  tiktok: true,
  twitter: true,
  website: true,
});
export const updateMinistryRegionSchema = insertMinistryRegionSchema.partial();
export type MinistryRegion = typeof ministryRegions.$inferSelect;
export type InsertMinistryRegion = z.infer<typeof insertMinistryRegionSchema>;
export type UpdateMinistryRegion = z.infer<typeof updateMinistryRegionSchema>;

// ========== IGLESIAS (COBERTURA Y RESPALDO) ==========

export const CHURCH_TYPES = {
  cobertura: "Iglesia Cobertura",
  respaldo: "Iglesia en Respaldo",
  aliada: "Iglesia Aliada",
} as const;

export const ministryChurches = pgTable("ministry_churches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  churchType: text("church_type").notNull().default("aliada"),
  pastor: text("pastor"),
  pastorUserId: integer("pastor_user_id").references(() => users.id),
  city: text("city"),
  country: text("country"),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  description: text("description"),
  imageUrl: text("image_url"),
  logoUrl: text("logo_url"),
  // Alianza
  allianceStatus: text("alliance_status").notNull().default("pendiente"),
  allianceDate: timestamp("alliance_date"),
  maxAdmins: integer("max_admins").notNull().default(3),
  // Redes sociales
  facebook: text("facebook"),
  instagram: text("instagram"),
  youtube: text("youtube"),
  tiktok: text("tiktok"),
  twitter: text("twitter"),
  website: text("website"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMinistryChurchSchema = createInsertSchema(ministryChurches).pick({
  name: true,
  churchType: true,
  pastor: true,
  pastorUserId: true,
  city: true,
  country: true,
  address: true,
  phone: true,
  email: true,
  description: true,
  imageUrl: true,
  logoUrl: true,
  allianceStatus: true,
  maxAdmins: true,
  facebook: true,
  instagram: true,
  youtube: true,
  tiktok: true,
  twitter: true,
  website: true,
  isActive: true,
  sortOrder: true,
}).extend({
  allianceDate: z.string().optional().nullable(),
});
export const updateMinistryChurchSchema = insertMinistryChurchSchema.partial();
export type MinistryChurch = typeof ministryChurches.$inferSelect;
export type InsertMinistryChurch = z.infer<typeof insertMinistryChurchSchema>;
export type UpdateMinistryChurch = z.infer<typeof updateMinistryChurchSchema>;

export const churchPosts = pgTable("church_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  churchId: integer("church_id").notNull().references(() => ministryChurches.id),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChurchPostSchema = z.object({
  churchId: z.number(),
  content: z.string().min(1),
  imageUrl: z.string().optional().nullable(),
});

export type ChurchPost = typeof churchPosts.$inferSelect;
export type InsertChurchPost = z.infer<typeof insertChurchPostSchema>;

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description"),
  verse: text("verse"),
  initials: text("initials"),
  avatarUrl: text("avatar_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).pick({
  userId: true,
  name: true,
  role: true,
  description: true,
  verse: true,
  initials: true,
  avatarUrl: true,
  sortOrder: true,
  isActive: true,
});
export const updateTeamMemberSchema = insertTeamMemberSchema.partial();
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type UpdateTeamMember = z.infer<typeof updateTeamMemberSchema>;

export const ENROLLMENT_STATUSES = {
  solicitado: "Solicitado",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
  completado: "Completado",
} as const;

export const ENROLLMENT_MODES = {
  open: "Inscripciones Abiertas",
  closed: "Inscripciones Cerradas",
  scheduled: "Programadas",
} as const;

export const MATERIAL_TYPES = {
  documento: "Documento",
  video: "Video",
  enlace: "Enlace",
  audio: "Audio",
  presentacion: "Presentacion",
} as const;

export const COURSE_CATEGORIES = {
  general: "General",
  doctrina: "Doctrina",
  liderazgo: "Liderazgo",
  evangelismo: "Evangelismo",
  adoracion: "Adoración",
  consejeria: "Consejería",
  ninos: "Ministerio Infantil",
  jovenes: "Jóvenes",
  biblico: "Estudio Bíblico",
} as const;

// ========== BIBLIOTECA ==========

export const bibleHighlights = pgTable("bible_highlights", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  verseStart: integer("verse_start").notNull(),
  verseEnd: integer("verse_end").notNull(),
  color: text("color").notNull().default("#FFA500"),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bibleNotes = pgTable("bible_notes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const readingPlans = pgTable("reading_plans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  isPublic: boolean("is_public").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const readingPlanItems = pgTable("reading_plan_items", {
  id: serial("id").primaryKey(),
  planId: integer("plan_id").notNull().references(() => readingPlans.id),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  isCompleted: boolean("is_completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const readingClubPosts = pgTable("reading_club_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  verseStart: integer("verse_start"),
  verseEnd: integer("verse_end"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const readingClubComments = pgTable("reading_club_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => readingClubPosts.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const readingClubPostLikes = pgTable("reading_club_post_likes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => readingClubPosts.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const libraryResources = pgTable("library_resources", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  resourceType: text("resource_type").notNull().default("documento"),
  fileData: text("file_data"),
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  fileSize: integer("file_size"),
  category: text("category").notNull().default("general"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const libraryResourceLikes = pgTable("library_resource_likes", {
  id: serial("id").primaryKey(),
  resourceId: integer("resource_id").notNull().references(() => libraryResources.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBibleHighlightSchema = z.object({
  book: z.string().min(1),
  chapter: z.number().min(1),
  verseStart: z.number().min(1),
  verseEnd: z.number().min(1),
  color: z.string().optional(),
  note: z.string().optional().nullable(),
});

export const insertBibleNoteSchema = z.object({
  book: z.string().min(1),
  chapter: z.number().min(1),
  verse: z.number().min(1),
  content: z.string().min(1),
});

export const insertReadingPlanSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
});

export const insertReadingPlanItemSchema = z.object({
  planId: z.number(),
  book: z.string().min(1),
  chapter: z.number().min(1),
  sortOrder: z.number().optional(),
});

export const insertReadingClubPostSchema = z.object({
  book: z.string().min(1),
  chapter: z.number().min(1),
  verseStart: z.number().optional().nullable(),
  verseEnd: z.number().optional().nullable(),
  content: z.string().min(1),
});

export const insertReadingClubCommentSchema = z.object({
  postId: z.number(),
  content: z.string().min(1),
});

export const insertLibraryResourceSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  resourceType: z.string().optional(),
  fileData: z.string().optional().nullable(),
  fileUrl: z.string().optional().nullable(),
  fileName: z.string().optional().nullable(),
  fileSize: z.number().optional().nullable(),
  category: z.string().optional(),
});

export type BibleHighlight = typeof bibleHighlights.$inferSelect;
export type InsertBibleHighlight = z.infer<typeof insertBibleHighlightSchema>;
export type BibleNote = typeof bibleNotes.$inferSelect;
export type InsertBibleNote = z.infer<typeof insertBibleNoteSchema>;
export type ReadingPlan = typeof readingPlans.$inferSelect;
export type InsertReadingPlan = z.infer<typeof insertReadingPlanSchema>;
export type ReadingPlanItem = typeof readingPlanItems.$inferSelect;
export type InsertReadingPlanItem = z.infer<typeof insertReadingPlanItemSchema>;
export type ReadingClubPost = typeof readingClubPosts.$inferSelect;
export type InsertReadingClubPost = z.infer<typeof insertReadingClubPostSchema>;
export type ReadingClubComment = typeof readingClubComments.$inferSelect;
export type InsertReadingClubComment = z.infer<typeof insertReadingClubCommentSchema>;
export type LibraryResource = typeof libraryResources.$inferSelect;
export type InsertLibraryResource = z.infer<typeof insertLibraryResourceSchema>;
export type LibraryResourceLike = typeof libraryResourceLikes.$inferSelect;

// ========== NOTIFICACIONES ==========

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull().default("general"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  link: text("link"),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNotificationSchema = z.object({
  userId: z.number(),
  type: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  link: z.string().optional().nullable(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

// ========== ACTIVIDADES DE ORACION ==========

export const prayerActivities = pgTable("prayer_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  meetingUrl: text("meeting_url"),
  meetingPlatform: text("meeting_platform").default("zoom"),
  scheduledDate: timestamp("scheduled_date"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPrayerActivitySchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  meetingUrl: z.string().optional().nullable(),
  meetingPlatform: z.string().optional(),
  scheduledDate: z.string().optional().nullable(),
});

export const updatePrayerActivitySchema = insertPrayerActivitySchema.partial();
export type PrayerActivity = typeof prayerActivities.$inferSelect;
export type InsertPrayerActivity = z.infer<typeof insertPrayerActivitySchema>;
export type UpdatePrayerActivity = z.infer<typeof updatePrayerActivitySchema>;

// ========== ASISTENCIA A ORACION ==========

export const prayerAttendees = pgTable("prayer_attendees", {
  id: serial("id").primaryKey(),
  activityId: integer("activity_id").notNull().references(() => prayerActivities.id),
  userId: integer("user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("confirmado"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPrayerAttendeeSchema = z.object({
  activityId: z.number(),
  status: z.enum(["confirmado", "tal_vez", "no_asistire"]).optional(),
});

export type PrayerAttendee = typeof prayerAttendees.$inferSelect;
export type InsertPrayerAttendee = z.infer<typeof insertPrayerAttendeeSchema>;

// ========== PUBLICACIONES REGIONALES ==========

export const regionPosts = pgTable("region_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  region: text("region").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRegionPostSchema = z.object({
  region: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().optional().nullable(),
});

export type RegionPost = typeof regionPosts.$inferSelect;
export type InsertRegionPost = z.infer<typeof insertRegionPostSchema>;

// ========== REACCIONES REGIONALES ==========

export const REACTION_TYPES = {
  fuego: "Fuego",
  oracion: "Oracion",
  amen: "Amen",
  corazon: "Corazon",
  alabanza: "Alabanza",
} as const;

export const regionPostReactions = pgTable("region_post_reactions", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => regionPosts.id),
  userId: integer("user_id").notNull().references(() => users.id),
  reactionType: text("reaction_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type RegionPostReaction = typeof regionPostReactions.$inferSelect;

// ========== ENCUESTAS REGIONALES ==========

export const regionPostPolls = pgTable("region_post_polls", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => regionPosts.id),
  question: text("question").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const regionPostPollOptions = pgTable("region_post_poll_options", {
  id: serial("id").primaryKey(),
  pollId: integer("poll_id").notNull().references(() => regionPostPolls.id),
  optionText: text("option_text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const regionPostPollVotes = pgTable("region_post_poll_votes", {
  id: serial("id").primaryKey(),
  optionId: integer("option_id").notNull().references(() => regionPostPollOptions.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRegionPostPollSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string().min(1)).min(2).max(6),
});

export type RegionPostPoll = typeof regionPostPolls.$inferSelect;
export type RegionPostPollOption = typeof regionPostPollOptions.$inferSelect;
export type RegionPostPollVote = typeof regionPostPollVotes.$inferSelect;

export const HIGHLIGHT_COLORS = {
  "#FFA500": "Naranja",
  "#FFD700": "Amarillo",
  "#90EE90": "Verde",
  "#87CEEB": "Azul",
  "#DDA0DD": "Morado",
  "#FFB6C1": "Rosa",
} as const;

export const RESOURCE_CATEGORIES = {
  general: "General",
  estudio: "Estudio Biblico",
  devocional: "Devocional",
  teologia: "Teologia",
  sermones: "Sermones",
  musica: "Musica",
  jovenes: "Jovenes",
  ninos: "Ninos",
} as const;

// Los libros de la Biblia viven en shared/libros-biblia.ts (liviano): la portada los usa sin cargar el esquema.
export { BIBLE_BOOKS } from "./libros-biblia";

export const BIBLE_CHAPTERS: Record<string, number> = {
  "Genesis": 50, "Exodo": 40, "Levitico": 27, "Numeros": 36, "Deuteronomio": 34,
  "Josue": 24, "Jueces": 21, "Rut": 4, "1 Samuel": 31, "2 Samuel": 24,
  "1 Reyes": 22, "2 Reyes": 25, "1 Cronicas": 29, "2 Cronicas": 36,
  "Esdras": 10, "Nehemias": 13, "Ester": 10, "Job": 42, "Salmos": 150,
  "Proverbios": 31, "Eclesiastes": 12, "Cantares": 8, "Isaias": 66, "Jeremias": 52,
  "Lamentaciones": 5, "Ezequiel": 48, "Daniel": 12, "Oseas": 14, "Joel": 3,
  "Amos": 9, "Abdias": 1, "Jonas": 4, "Miqueas": 7, "Nahum": 3,
  "Habacuc": 3, "Sofonias": 3, "Hageo": 2, "Zacarias": 14, "Malaquias": 4,
  "Mateo": 28, "Marcos": 16, "Lucas": 24, "Juan": 21, "Hechos": 28,
  "Romanos": 16, "1 Corintios": 16, "2 Corintios": 13, "Galatas": 6, "Efesios": 6,
  "Filipenses": 4, "Colosenses": 4, "1 Tesalonicenses": 5, "2 Tesalonicenses": 3,
  "1 Timoteo": 6, "2 Timoteo": 4, "Tito": 3, "Filemon": 1, "Hebreos": 13,
  "Santiago": 5, "1 Pedro": 5, "2 Pedro": 3, "1 Juan": 5, "2 Juan": 1,
  "3 Juan": 1, "Judas": 1, "Apocalipsis": 22,
};

// ========== COMENTARIOS EN PUBLICACIONES ==========

export const postComments = pgTable("post_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => memberPosts.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPostCommentSchema = z.object({
  postId: z.number(),
  content: z.string().min(1),
});

export type PostComment = typeof postComments.$inferSelect;
export type InsertPostComment = z.infer<typeof insertPostCommentSchema>;

// ========== MENSAJES DIRECTOS ==========

export const directMessages = pgTable("direct_messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull().references(() => users.id),
  receiverId: integer("receiver_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  // ===== Mensajería tipo WhatsApp =====
  kind: text("kind").notNull().default("text"), // text | image | audio | video | file
  attachmentUrl: text("attachment_url"),
  attachmentName: text("attachment_name"),
  attachmentSize: integer("attachment_size"),
  attachmentMime: text("attachment_mime"),
  attachmentMeta: jsonb("attachment_meta").$type<{ width?: number; height?: number; duration?: number }>(),
  replyToId: integer("reply_to_id"),
  reactions: jsonb("reactions").$type<Record<string, number[]>>(),
  clientId: text("client_id"),
  deliveredAt: timestamp("delivered_at"),
  readAt: timestamp("read_at"),
  editedAt: timestamp("edited_at"),
  deletedAt: timestamp("deleted_at"),
  hiddenBySender: boolean("hidden_by_sender").notNull().default(false),
  hiddenByReceiver: boolean("hidden_by_receiver").notNull().default(false),
});

/** Reacciones permitidas en los mensajes (una por persona, como en WhatsApp). */
export const DM_REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🙏", "🔥"] as const;

export const dmAttachmentSchema = z.object({
  url: z.string().min(1).max(500),
  name: z.string().max(150).optional(),
  size: z.number().int().min(0).optional(),
  mime: z.string().max(120).optional(),
  kind: z.enum(["image", "audio", "video", "file"]),
  width: z.number().int().min(1).max(20000).optional(),
  height: z.number().int().min(1).max(20000).optional(),
  duration: z.number().min(0).max(3600).optional(),
});

export const insertDirectMessageSchema = z
  .object({
    receiverId: z.number(),
    content: z.string().max(4000, "El mensaje es muy largo (máximo 4000 letras)").default(""),
    /** Lo pone el navegador para no duplicar el mensaje si se reintenta el envío. */
    clientId: z.string().max(64).regex(/^[A-Za-z0-9_-]+$/).optional(),
    replyToId: z.number().int().optional().nullable(),
    attachment: dmAttachmentSchema.optional().nullable(),
  })
  .refine((d) => d.content.trim().length > 0 || !!d.attachment, { message: "Escribe un mensaje o adjunta un archivo" });

export type DirectMessage = typeof directMessages.$inferSelect;
export type InsertDirectMessage = z.infer<typeof insertDirectMessageSchema>;

// ========== AMISTADES ==========

export const friendships = pgTable("friendships", {
  id: serial("id").primaryKey(),
  requesterId: integer("requester_id").notNull().references(() => users.id),
  addresseeId: integer("addressee_id").notNull().references(() => users.id),
  status: text("status").notNull().default("pending"), // pending, accepted, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const FRIENDSHIP_STATUSES = {
  pending: "Pendiente",
  accepted: "Aceptado",
  rejected: "Rechazado",
} as const;

export type Friendship = typeof friendships.$inferSelect;

// ========== PASSWORD RESET TOKENS ==========

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;

// ========== PUSH SUBSCRIPTIONS ==========

export const pushSubscriptions = pgTable("push_subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  endpoint: text("endpoint").notNull(),
  p256dh: text("p256dh").notNull(),
  auth: text("auth").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type PushSubscription = typeof pushSubscriptions.$inferSelect;

// ========== CERTIFICADOS DE CURSOS ==========

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  enrollmentId: integer("enrollment_id").notNull().references(() => enrollments.id),
  certificateCode: text("certificate_code").notNull().unique(),
  issuedAt: timestamp("issued_at").defaultNow(),
  teacherName: text("teacher_name"),
  grade: text("grade"),
  studentNameOverride: text("student_name_override"),
  courseNameOverride: text("course_name_override"),
  customMessage: text("custom_message"),
  signatureUrl: text("signature_url"),
  issuedDateOverride: text("issued_date_override"),
  // Co-certificación: logos del ministerio + iglesia aliada
  churchId: integer("church_id").references(() => ministryChurches.id),
  churchLogoUrl: text("church_logo_url"),
  churchName: text("church_name"),
  isCoCertified: boolean("is_co_certified").notNull().default(false),
});

export type Certificate = typeof certificates.$inferSelect;

// ========== ACADEMIA AVIVANDO EL FUEGO (docs/academia.md) ==========
// Las crea server/ensure-schema.ts con ACADEMIA_SQL (server/academia-comun.ts); aquí van para que coincidan.

export const academiaAlumnos = pgTable("academia_alumnos", {
  userId: integer("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  matricula: text("matricula").unique(),
  promocion: integer("promocion"),
  estatus: text("estatus").notNull().default("activo"),
  nivel: integer("nivel").notNull().default(1),
  mentorUserId: integer("mentor_user_id"),
  reglamentoAt: timestamp("reglamento_at"),
  racha: integer("racha").notNull().default(0),
  rachaFecha: text("racha_fecha"),
  inscritoAt: timestamp("inscrito_at").notNull().defaultNow(),
  ultimaAt: timestamp("ultima_at").notNull().defaultNow(),
  honorAt: timestamp("honor_at"),
  reglamentoVersion: text("reglamento_version"),
  carneCodigo: text("carne_codigo"),
});

/** La ficha de inscripción en la academia: los datos del alumno, sus documentos llevan este nombre (server/academia-inscripcion.ts). */
export const academiaInscripciones = pgTable("academia_inscripciones", {
  userId: integer("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  nombres: text("nombres").notNull(),
  apellidos: text("apellidos").notNull(),
  pais: text("pais").notNull(),
  ciudad: text("ciudad"),
  telefono: text("telefono"),
  nacimiento: text("nacimiento"),
  iglesiaId: integer("iglesia_id"),
  iglesiaOtra: text("iglesia_otra"),
  pastor: text("pastor"),
  tiempoFe: text("tiempo_fe"),
  bautismo: text("bautismo"),
  ministerio: text("ministerio"),
  comoConocio: text("como_conocio"),
  espera: text("espera"),
  /** La foto del carné (un archivo subido a la web, carpeta «academia»). */
  fotoUrl: text("foto_url"),
  privacidadAt: timestamp("privacidad_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const academiaLecciones = pgTable(
  "academia_lecciones",
  {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    leccionId: text("leccion_id").notNull(),
    vistaAt: timestamp("vista_at").notNull().defaultNow(),
    completadaAt: timestamp("completada_at"),
    repaso: jsonb("repaso").notNull().default({}),
    reflexion: text("reflexion"),
  },
  (t) => [primaryKey({ columns: [t.userId, t.leccionId] })],
);

export const academiaPruebas = pgTable(
  "academia_pruebas",
  {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    clave: text("clave").notNull(),
    intentos: integer("intentos").notNull().default(0),
    fallos: integer("fallos").notNull().default(0),
    mejor: integer("mejor"),
    ultima: integer("ultima"),
    vistas: jsonb("vistas").notNull().default([]),
    curso: jsonb("curso"),
    cursoAt: timestamp("curso_at"),
    falloAt: timestamp("fallo_at"),
    aprobadaAt: timestamp("aprobada_at"),
    resultado: jsonb("resultado"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.clave] })],
);

export const academiaRespuestas = pgTable("academia_respuestas", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  clave: text("clave").notNull(),
  intento: integer("intento").notNull(),
  preguntaId: text("pregunta_id").notNull(),
  texto: text("texto").notNull(),
  notaAuto: integer("nota_auto").notNull(),
  detalle: jsonb("detalle").notNull().default({}),
  revisar: boolean("revisar").notNull().default(false),
  notaFinal: integer("nota_final"),
  revisadaPor: integer("revisada_por"),
  revisadaAt: timestamp("revisada_at"),
  motivo: text("motivo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const academiaMaterias = pgTable(
  "academia_materias",
  {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    materiaId: text("materia_id").notNull(),
    estado: text("estado").notNull().default("en-curso"),
    nota: integer("nota"),
    componentes: jsonb("componentes").notNull().default({}),
    via: text("via").notNull().default("cursada"),
    inicioAt: timestamp("inicio_at").notNull().defaultNow(),
    aprobadaAt: timestamp("aprobada_at"),
  },
  (t) => [primaryKey({ columns: [t.userId, t.materiaId] })],
);

export const academiaVersiculos = pgTable(
  "academia_versiculos",
  {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    materiaId: text("materia_id").notNull(),
    ref: text("ref").notNull(),
    intentos: integer("intentos").notNull().default(0),
    fallos: integer("fallos").notNull().default(0),
    puntaje: integer("puntaje"),
    aprendidoAt: timestamp("aprendido_at"),
    caja: integer("caja").notNull().default(0),
    proximoAt: timestamp("proximo_at"),
  },
  (t) => [primaryKey({ columns: [t.userId, t.materiaId] })],
);

/** El cierre de cada nivel: el pacto aceptado y el nivel completo, con su promedio (server/academia-nivel.ts). */
export const academiaNiveles = pgTable(
  "academia_niveles",
  {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    nivel: integer("nivel").notNull(),
    pactoAt: timestamp("pacto_at"),
    completadoAt: timestamp("completado_at"),
    promedio: integer("promedio"),
  },
  (t) => [primaryKey({ columns: [t.userId, t.nivel] })],
);

/** Los documentos de la academia: certificados de materia y de nivel, con su código verificable (server/academia-documentos.ts). */
export const academiaCertificados = pgTable(
  "academia_certificados",
  {
    id: serial("id").primaryKey(),
    codigo: text("codigo").notNull().unique(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    tipo: text("tipo").notNull(),
    ref: text("ref").notNull(),
    titulo: text("titulo").notNull(),
    nombre: text("nombre").notNull(),
    nota: integer("nota"),
    honores: boolean("honores").notNull().default(false),
    via: text("via").notNull().default("cursada"),
    emitidoAt: timestamp("emitido_at").notNull().defaultNow(),
    revocadoAt: timestamp("revocado_at"),
    motivo: text("motivo"),
  },
  (t) => [unique().on(t.userId, t.tipo, t.ref)],
);

/** Cada intento cerrado de un examen: sus partes y su nota (la revisión de una escrita la recalcula). */
export const academiaIntentos = pgTable(
  "academia_intentos",
  {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    clave: text("clave").notNull(),
    intento: integer("intento").notNull(),
    objetiva: integer("objetiva").notNull(),
    escrita: integer("escrita").notNull(),
    nota: integer("nota").notNull(),
    notaAuto: integer("nota_auto").notNull(),
    aciertos: integer("aciertos").notNull(),
    de: integer("de").notNull(),
    respuestas: jsonb("respuestas").notNull().default([]),
    cerradoAt: timestamp("cerrado_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.clave, t.intento] })],
);

/** Las preguntas retiradas del banco por el análisis de preguntas: ya no salen en los intentos nuevos. */
export const academiaPreguntasRetiradas = pgTable("academia_preguntas_retiradas", {
  preguntaId: text("pregunta_id").primaryKey(),
  motivo: text("motivo").notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Las observaciones de la revisión del contenido de cada materia (y de sus lecciones). */
export const academiaContenidoNotas = pgTable("academia_contenido_notas", {
  id: serial("id").primaryKey(),
  materiaId: text("materia_id").notNull(),
  leccionId: text("leccion_id"),
  texto: text("texto").notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  resueltaPor: integer("resuelta_por").references(() => users.id, { onDelete: "set null" }),
  resueltaAt: timestamp("resuelta_at"),
  respuesta: text("respuesta"),
});

/** Las materias de la Academia asignadas a un curso de la Escuela (obligatorias u opcionales, con fecha límite). */
export const academiaAsignaciones = pgTable("academia_asignaciones", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  materiaId: text("materia_id").notNull(),
  obligatoria: boolean("obligatoria").notNull().default(true),
  venceAt: timestamp("vence_at"),
  indicaciones: text("indicaciones"),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => [unique("academia_asignaciones_course_id_materia_id_key").on(t.courseId, t.materiaId)]);

/** La aprobación doctrinal de cada materia (la da la Dirección académica antes de abrir la academia). */
export const academiaContenidoAprobaciones = pgTable("academia_contenido_aprobaciones", {
  materiaId: text("materia_id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  aprobadaAt: timestamp("aprobada_at").notNull().defaultNow(),
  notas: text("notas"),
  /** La huella del contenido que se aprobó: si el contenido cambia después, la aprobación deja de estar vigente. */
  huella: text("huella"),
});

/** Los pedidos de revisión de un examen (uno por examen, dentro de los días que dice el reglamento). */
export const academiaApelaciones = pgTable(
  "academia_apelaciones",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    clave: text("clave").notNull(),
    intento: integer("intento").notNull(),
    mensaje: text("mensaje").notNull(),
    estado: text("estado").notNull().default("pendiente"),
    respuesta: text("respuesta"),
    resueltaPor: integer("resuelta_por"),
    resueltaAt: timestamp("resuelta_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [unique().on(t.userId, t.clave)],
);

// ========== DIEZMOS Y OFRENDAS ==========

export const tithes = pgTable("tithes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  donorName: text("donor_name").notNull(),
  amount: text("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  type: text("type").notNull().default("diezmo"),
  method: text("method").notNull().default("efectivo"),
  churchId: integer("church_id").references(() => ministryChurches.id),
  regionName: text("region_name"),
  notes: text("notes"),
  receiptSent: boolean("receipt_sent").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
  recordedBy: integer("recorded_by").references(() => users.id),
});

export const insertTitheSchema = z.object({
  donorName: z.string().min(1),
  amount: z.string().min(1),
  currency: z.string().optional(),
  type: z.enum(["diezmo", "ofrenda", "donacion", "mision"]).optional(),
  method: z.enum(["efectivo", "transferencia", "tarjeta", "paypal", "otro"]).optional(),
  churchId: z.number().optional().nullable(),
  regionName: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  userId: z.number().optional().nullable(),
});

export type Tithe = typeof tithes.$inferSelect;
export type InsertTithe = z.infer<typeof insertTitheSchema>;

export const TITHE_TYPES = {
  diezmo: "Diezmo",
  ofrenda: "Ofrenda",
  donacion: "Donación",
  mision: "Misiones",
} as const;

export const PAYMENT_METHODS = {
  efectivo: "Efectivo",
  transferencia: "Transferencia",
  tarjeta: "Tarjeta",
  paypal: "PayPal",
  otro: "Otro",
} as const;

// ========== ARCHIVO DE SERMONES / PRÉDICAS ==========

export const sermons = pgTable("sermons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  preacherId: integer("preacher_id").references(() => users.id),
  preacherName: text("preacher_name"),
  // De dónde es quien predica: iglesia, ciudad o país.
  preacherPlace: text("preacher_place"),
  sermonDate: timestamp("sermon_date"),
  category: text("category").notNull().default("general"),
  seriesName: text("series_name"),
  videoUrl: text("video_url"),
  audioUrl: text("audio_url"),
  content: text("content"),
  imageUrl: text("image_url"),
  // Apuntes o estudio de la prédica (PDF, Word...).
  documentUrl: text("document_url"),
  documentName: text("document_name"),
  documentSize: integer("document_size"),
  isPublished: boolean("is_published").notNull().default(true),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sermonNotes = pgTable("sermon_notes", {
  id: serial("id").primaryKey(),
  sermonId: integer("sermon_id").notNull().references(() => sermons.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSermonSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  preacherId: z.number().optional().nullable(),
  preacherName: z.string().optional().nullable(),
  preacherPlace: z.string().max(160).optional().nullable(),
  sermonDate: z.string().optional().nullable(),
  category: z.string().optional(),
  seriesName: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  documentUrl: z.string().optional().nullable(),
  documentName: z.string().max(200).optional().nullable(),
  documentSize: z.number().int().nonnegative().optional().nullable(),
  isPublished: z.boolean().optional(),
});
export const updateSermonSchema = insertSermonSchema.partial();

export const insertSermonNoteSchema = z.object({
  sermonId: z.number(),
  content: z.string().min(1),
});

export type Sermon = typeof sermons.$inferSelect;
export type InsertSermon = z.infer<typeof insertSermonSchema>;
export type UpdateSermon = z.infer<typeof updateSermonSchema>;
export type SermonNote = typeof sermonNotes.$inferSelect;
export type InsertSermonNote = z.infer<typeof insertSermonNoteSchema>;

export const SERMON_CATEGORIES = {
  general: "General",
  evangelismo: "Evangelismo",
  adoracion: "Adoración",
  doctrina: "Doctrina",
  familia: "Familia",
  liderazgo: "Liderazgo",
  profetico: "Profético",
  avivamiento: "Avivamiento",
} as const;

// ========== GRUPOS PEQUEÑOS / CÉLULAS ==========

export const smallGroups = pgTable("small_groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  leaderId: integer("leader_id").notNull().references(() => users.id),
  meetingDay: integer("meeting_day"),
  meetingTime: text("meeting_time"),
  meetingLocation: text("meeting_location"),
  meetingUrl: text("meeting_url"),
  maxMembers: integer("max_members"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const smallGroupMembers = pgTable("small_group_members", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").notNull().references(() => smallGroups.id),
  userId: integer("user_id").notNull().references(() => users.id),
  role: text("role").notNull().default("miembro"),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const smallGroupMeetings = pgTable("small_group_meetings", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").notNull().references(() => smallGroups.id),
  title: text("title").notNull(),
  meetingDate: timestamp("meeting_date").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const smallGroupAttendance = pgTable("small_group_attendance", {
  id: serial("id").primaryKey(),
  meetingId: integer("meeting_id").notNull().references(() => smallGroupMeetings.id),
  userId: integer("user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("presente"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const smallGroupMessages = pgTable("small_group_messages", {
  id: serial("id").primaryKey(),
  groupId: integer("group_id").notNull().references(() => smallGroups.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSmallGroupSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  leaderId: z.number(),
  meetingDay: z.number().min(0).max(6).optional().nullable(),
  meetingTime: z.string().optional().nullable(),
  meetingLocation: z.string().optional().nullable(),
  meetingUrl: z.string().optional().nullable(),
  maxMembers: z.number().optional().nullable(),
  isActive: z.boolean().optional(),
});
export const updateSmallGroupSchema = insertSmallGroupSchema.partial();

export const insertSmallGroupMeetingSchema = z.object({
  groupId: z.number(),
  title: z.string().min(1),
  meetingDate: z.string(),
  notes: z.string().optional().nullable(),
});

export const insertSmallGroupMessageSchema = z.object({
  groupId: z.number(),
  content: z.string().min(1),
});

export type SmallGroup = typeof smallGroups.$inferSelect;
export type InsertSmallGroup = z.infer<typeof insertSmallGroupSchema>;
export type UpdateSmallGroup = z.infer<typeof updateSmallGroupSchema>;
export type SmallGroupMember = typeof smallGroupMembers.$inferSelect;
export type SmallGroupMeeting = typeof smallGroupMeetings.$inferSelect;
export type InsertSmallGroupMeeting = z.infer<typeof insertSmallGroupMeetingSchema>;
export type SmallGroupAttendance = typeof smallGroupAttendance.$inferSelect;
export type SmallGroupMessage = typeof smallGroupMessages.$inferSelect;
export type InsertSmallGroupMessage = z.infer<typeof insertSmallGroupMessageSchema>;

// ========== MONITOREO DE EVENTOS EN VIVO ==========

export const liveEventSessions = pgTable("live_event_sessions", {
  id: serial("id").primaryKey(),
  context: text("context").notNull(), // "prayer" | "event" | "live" | "classroom"
  contextId: text("context_id").notNull(),
  title: text("title").notNull(),
  roomName: text("room_name").notNull(),
  startedBy: integer("started_by").notNull().references(() => users.id),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"),
  durationMinutes: integer("duration_minutes"),
  peakViewers: integer("peak_viewers").notNull().default(0),
  totalJoins: integer("total_joins").notNull().default(0),
  status: text("status").notNull().default("active"), // "active" | "ended"
});

export const liveEventAttendance = pgTable("live_event_attendance", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull().references(() => liveEventSessions.id),
  userId: integer("user_id").notNull().references(() => users.id),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  leftAt: timestamp("left_at"),
  durationMinutes: integer("duration_minutes"),
  joinCount: integer("join_count").notNull().default(1),
});

export type LiveEventSession = typeof liveEventSessions.$inferSelect;
export type LiveEventAttendance = typeof liveEventAttendance.$inferSelect;

// ========== REFORMA MINISTERIAL: FICHA DE PRESENTACIÓN DE MAESTROS ==========

export const teacherProfiles = pgTable("teacher_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  theologicalEducation: text("theological_education"),
  ministryExperience: text("ministry_experience"),
  specializations: text("specializations"),
  doctrinalStatement: text("doctrinal_statement"),
  pastoralEndorsement: text("pastoral_endorsement"),
  endorsedByUserId: integer("endorsed_by_user_id").references(() => users.id),
  teachingMaterials: text("teaching_materials"),
  isApproved: boolean("is_approved").notNull().default(false),
  approvedAt: timestamp("approved_at"),
  approvedByUserId: integer("approved_by_user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertTeacherProfileSchema = z.object({
  theologicalEducation: z.string().optional().nullable(),
  ministryExperience: z.string().optional().nullable(),
  specializations: z.string().optional().nullable(),
  doctrinalStatement: z.string().optional().nullable(),
  pastoralEndorsement: z.string().optional().nullable(),
  endorsedByUserId: z.number().optional().nullable(),
  teachingMaterials: z.string().optional().nullable(),
});
export const updateTeacherProfileSchema = insertTeacherProfileSchema.partial().extend({
  isApproved: z.boolean().optional(),
});
export type TeacherProfile = typeof teacherProfiles.$inferSelect;
export type InsertTeacherProfile = z.infer<typeof insertTeacherProfileSchema>;
export type UpdateTeacherProfile = z.infer<typeof updateTeacherProfileSchema>;

// ========== REFORMA: PERMISOS POR IGLESIA (RBAC LOCAL) ==========

export const churchPermissions = pgTable("church_permissions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  churchId: integer("church_id").notNull().references(() => ministryChurches.id),
  role: text("role").notNull().default("miembro"), // pastor, admin_iglesia, maestro_iglesia, lider, miembro
  grantedBy: integer("granted_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const CHURCH_PERMISSION_ROLES = {
  pastor: "Pastor",
  admin_iglesia: "Administrador",
  maestro_iglesia: "Maestro",
  lider: "Líder",
  miembro: "Miembro",
} as const;

export type ChurchPermission = typeof churchPermissions.$inferSelect;

export const insertChurchPermissionSchema = z.object({
  userId: z.number(),
  churchId: z.number(),
  role: z.string(),
});
export type InsertChurchPermission = z.infer<typeof insertChurchPermissionSchema>;

// ========== REFORMA: HISTORIAL DE MEMBRESÍA EN IGLESIAS ==========

export const churchMemberships = pgTable("church_memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  churchId: integer("church_id").notNull().references(() => ministryChurches.id),
  status: text("status").notNull().default("activo"), // activo, inactivo, transferido
  joinedAt: timestamp("joined_at").defaultNow(),
  leftAt: timestamp("left_at"),
  reason: text("reason"),
});

export type ChurchMembership = typeof churchMemberships.$inferSelect;

// ========== REFORMA: ASIGNACIÓN DE MAESTROS POR ACUERDO MUTUO ==========

export const courseTeacherAssignments = pgTable("course_teacher_assignments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  teacherUserId: integer("teacher_user_id").notNull().references(() => users.id),
  proposedBy: integer("proposed_by").notNull().references(() => users.id),
  approvedBy: integer("approved_by").references(() => users.id),
  status: text("status").notNull().default("propuesto"), // propuesto, aprobado, rechazado
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const ASSIGNMENT_STATUSES = {
  propuesto: "Propuesto",
  aprobado: "Aprobado",
  rechazado: "Rechazado",
} as const;

export const insertCourseTeacherAssignmentSchema = z.object({
  courseId: z.number(),
  teacherUserId: z.number(),
  message: z.string().optional().nullable(),
});
export const updateCourseTeacherAssignmentSchema = z.object({
  status: z.enum(["propuesto", "aprobado", "rechazado"]),
});
export type CourseTeacherAssignment = typeof courseTeacherAssignments.$inferSelect;
export type InsertCourseTeacherAssignment = z.infer<typeof insertCourseTeacherAssignmentSchema>;
export type UpdateCourseTeacherAssignment = z.infer<typeof updateCourseTeacherAssignmentSchema>;

// ========== REFORMA: SOLICITUD DE ALIANZA ==========

export const allianceRequests = pgTable("alliance_requests", {
  id: serial("id").primaryKey(),
  churchName: text("church_name").notNull(),
  pastorName: text("pastor_name").notNull(),
  pastorEmail: text("pastor_email").notNull(),
  pastorPhone: text("pastor_phone"),
  city: text("city"),
  country: text("country"),
  denomination: text("denomination"),
  congregationSize: text("congregation_size"),
  motivation: text("motivation"),
  website: text("website"),
  status: text("status").notNull().default("pendiente"), // pendiente, en_revision, aprobada, rechazada
  reviewedBy: integer("reviewed_by").references(() => users.id),
  reviewNotes: text("review_notes"),
  resultingChurchId: integer("resulting_church_id").references(() => ministryChurches.id),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const insertAllianceRequestSchema = z.object({
  churchName: z.string().min(1),
  pastorName: z.string().min(1),
  pastorEmail: z.string().email(),
  pastorPhone: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  denomination: z.string().optional().nullable(),
  congregationSize: z.string().optional().nullable(),
  motivation: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
});
export const updateAllianceRequestSchema = z.object({
  status: z.enum(["pendiente", "en_revision", "aprobada", "rechazada"]),
  reviewNotes: z.string().optional().nullable(),
});
export type AllianceRequest = typeof allianceRequests.$inferSelect;
export type InsertAllianceRequest = z.infer<typeof insertAllianceRequestSchema>;
export type UpdateAllianceRequest = z.infer<typeof updateAllianceRequestSchema>;

// ========== REFORMA: CANALIZACIÓN ÉTICA DE MIEMBROS ==========

export const memberChanneling = pgTable("member_channeling", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  targetChurchId: integer("target_church_id").notNull().references(() => ministryChurches.id),
  status: text("status").notNull().default("solicitado"), // solicitado, aprobado, rechazado, completado
  requestedAt: timestamp("requested_at").defaultNow(),
  consentGiven: boolean("consent_given").notNull().default(true),
  resolvedBy: integer("resolved_by").references(() => users.id),
  resolvedAt: timestamp("resolved_at"),
  notes: text("notes"),
});

export type MemberChanneling = typeof memberChanneling.$inferSelect;

export const insertMemberChannelingSchema = z.object({
  targetChurchId: z.number(),
  notes: z.string().optional().nullable(),
});
export type InsertMemberChanneling = z.infer<typeof insertMemberChannelingSchema>;

// ========== REFORMA: LOG DE AUDITORÍA ==========

export const auditLog = pgTable("audit_log", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(), // user, course, church, enrollment, etc.
  entityId: integer("entity_id"),
  details: text("details"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type AuditLog = typeof auditLog.$inferSelect;

// ========== REFORMA: PROGRESO DEL MIEMBRO (GAMIFICACIÓN) ==========

export const memberProgress = pgTable("member_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  badgeType: text("badge_type").notNull(), // evangelismo_1, evangelismo_2, evangelismo_3, primer_evento, primer_grupo, lider, maestro
  earnedAt: timestamp("earned_at").defaultNow(),
  details: text("details"),
});

export const BADGE_TYPES = {
  evangelismo_1: "Evangelismo Nivel 1",
  evangelismo_2: "Evangelismo Nivel 2",
  evangelismo_3: "Evangelismo Nivel 3",
  primer_evento: "Primer Evento",
  primer_grupo: "Primer Grupo",
  discipulo_activo: "Discípulo Activo",
  lider_emergente: "Líder Emergente",
  maestro_certificado: "Maestro Certificado",
  intercesor: "Intercesor Fiel",
  evangelista_digital: "Evangelista Digital",
  // Club de lectura (shared/club.ts)
  primer_capitulo: "Primer Capítulo Leído",
  racha_7: "Racha de 7 Días",
  racha_30: "Racha de 30 Días",
  racha_100: "Racha de 100 Días",
  desafio_club: "Desafío del Club Completado",
  versiculo_memorizado: "Versículo Memorizado",
} as const;

export type MemberProgressEntry = typeof memberProgress.$inferSelect;

// ========== REFORMA: CURSO TYPES ==========

export const COURSE_TYPES = {
  core: "Curso Core del Ministerio",
  iglesia: "Curso de Iglesia Aliada",
  global: "Curso Global",
} as const;

// ========== AGENT ECOSYSTEM (Fase 1: memoria y revisor) ==========
//
// Estas tablas permiten que multiples agentes (bot de Telegram, Claude en
// Cowork, futuros workers en background) compartan estado. Sobreviven a
// cortes de sesion y sirven de bitacora auditable.
//
// Principio: un agente empieza leyendo su mision y termina actualizandola.

// Misiones: tareas de alto nivel que persisten entre sesiones.
// Estado puede ser: pending, in_progress, blocked, awaiting_review, done, cancelled.
// createdBy y assignedTo son identificadores libres: "bot-telegram", "claude-cowork",
// "luis" (el humano), o cualquier nombre de subagente futuro.
export const agentMissions = pgTable("agent_missions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"),
  priority: text("priority").notNull().default("normal"), // low, normal, high, urgent
  createdBy: text("created_by").notNull(), // quien origino la mision
  assignedTo: text("assigned_to"), // agente actualmente trabajando en ella
  parentId: integer("parent_id"), // para descomponer en subtareas
  progressNotes: text("progress_notes"), // bitacora acumulativa (los agentes appendean aqui)
  metadata: text("metadata"), // JSON stringificado para datos estructurados libres
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const AGENT_MISSION_STATUSES = [
  "pending", "in_progress", "blocked", "awaiting_review", "done", "cancelled",
] as const;

export type AgentMission = typeof agentMissions.$inferSelect;
export type InsertAgentMission = typeof agentMissions.$inferInsert;

// Revisiones: cuando un agente quiere ejecutar una accion de riesgo
// (push a main, borrar archivos, publicar en redes, mover dinero, etc.)
// crea un review_request y espera decision humana.
// decision: pending, approved, denied, expired.
export const agentReviewRequests = pgTable("agent_review_requests", {
  id: serial("id").primaryKey(),
  missionId: integer("mission_id"), // opcional: asociar a una mision
  agentId: text("agent_id").notNull(), // quien pide la revision
  actionType: text("action_type").notNull(), // git_push, file_delete, social_post, db_migration, etc.
  summary: text("summary").notNull(), // resumen humano (ej: "push de 3 commits a main")
  payload: text("payload"), // contenido completo revisado (diff, mensaje, etc.)
  riskReasons: text("risk_reasons"), // JSON array de razones por las que se escalo a humano
  riskScore: integer("risk_score").notNull().default(0), // 0-100
  autoDecision: text("auto_decision"), // lo que el revisor automatico recomendaba: approve, block, needs_human
  decision: text("decision").notNull().default("pending"),
  decidedBy: text("decided_by"), // humano o agente que decidio
  decidedAt: timestamp("decided_at"),
  telegramChatId: text("telegram_chat_id"), // a quien se le notifico
  telegramMessageId: text("telegram_message_id"), // para editar mensaje al decidir
  expiresAt: timestamp("expires_at"), // si no hay decision en X tiempo, auto-denied
  createdAt: timestamp("created_at").defaultNow(),
});

export const AGENT_REVIEW_DECISIONS = [
  "pending", "approved", "denied", "expired",
] as const;

export const AGENT_ACTION_TYPES = [
  "git_push",
  "git_force_push",
  "file_delete",
  "file_overwrite_critical",
  "db_migration",
  "db_destructive",
  "social_post",
  "email_send_bulk",
  "env_change",
  "deploy",
  "custom",
] as const;

export type AgentReviewRequest = typeof agentReviewRequests.$inferSelect;
export type InsertAgentReviewRequest = typeof agentReviewRequests.$inferInsert;

// Bitacora de actividad: registro auditable de todo lo que los agentes hacen.
// Util para debugging ("que hizo el bot anoche?") y para entrenar futuros revisores.
export const agentActivityLog = pgTable("agent_activity_log", {
  id: serial("id").primaryKey(),
  missionId: integer("mission_id"),
  agentId: text("agent_id").notNull(),
  action: text("action").notNull(), // mission_created, review_requested, push_executed, error, etc.
  details: text("details"), // JSON stringificado
  success: boolean("success").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export type AgentActivityEntry = typeof agentActivityLog.$inferSelect;
export type InsertAgentActivityEntry = typeof agentActivityLog.$inferInsert;

// ========== BIBLIOTECA: CLUB DE LECTURA VIVO ==========
// Una lectura cuenta cuando se hace en la Biblia de la web: un registro por
// usuario, capítulo y día local del lector (ver shared/club.ts).
export const bibleReadingLog = pgTable("bible_reading_log", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  book: text("book").notNull(),
  chapter: integer("chapter").notNull(),
  version: text("version"),
  readOn: text("read_on").notNull(), // YYYY-MM-DD en la zona horaria del lector
  seconds: integer("seconds").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const clubChallenges = pgTable("club_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  chapters: jsonb("chapters").$type<{ book: string; chapter: number }[]>().notNull(),
  chaptersPerDay: integer("chapters_per_day").notNull().default(1),
  startDate: text("start_date").notNull(), // YYYY-MM-DD
  createdBy: integer("created_by").references(() => users.id, { onDelete: "set null" }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const clubChallengeMembers = pgTable("club_challenge_members", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").notNull().references(() => clubChallenges.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const clubMemoryVerses = pgTable("club_memory_verses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  week: text("week").notNull(), // semana ISO, p. ej. 2026-W45
  completedAt: timestamp("completed_at").defaultNow(),
});

export type BibleReadingEntry = typeof bibleReadingLog.$inferSelect;
export type ClubChallenge = typeof clubChallenges.$inferSelect;

// ========== ORACIÓN: MURO DE PETICIONES ==========
// Peticiones que la comunidad (o solo los líderes) ve y por las que ora con un
// toque. "Oré" cuenta una vez por persona y día local (ver server/prayer-wall.ts).
export const prayerRequests = pgTable("prayer_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  category: text("category").notNull().default("otro"),
  visibility: text("visibility").notNull().default("comunidad"), // comunidad | lideres
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  status: text("status").notNull().default("abierta"), // abierta | respondida
  answeredNote: text("answered_note"),
  answeredAt: timestamp("answered_at"),
  isHidden: boolean("is_hidden").notNull().default(false),
  lastNotifiedOn: text("last_notified_on"), // último día en que se avisó al autor
  createdAt: timestamp("created_at").defaultNow(),
});

export const prayerRequestPrayers = pgTable("prayer_request_prayers", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").notNull().references(() => prayerRequests.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  prayedOn: text("prayed_on").notNull(), // YYYY-MM-DD local
  createdAt: timestamp("created_at").defaultNow(),
});

// Denuncias de contenido (server/reports.ts, shared/reports.ts): moderación de lo que publican
// los miembros. Una por persona y contenido (índice único en ensure-schema).
export const contentReports = pgTable("content_reports", {
  id: serial("id").primaryKey(),
  reporterId: integer("reporter_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  contentType: text("content_type").notNull(), // publicacion | comentario | oracion
  contentId: integer("content_id").notNull(),
  reason: text("reason").notNull(),
  details: text("details"),
  status: text("status").notNull().default("pendiente"), // pendiente | revisada | descartada
  reviewedBy: integer("reviewed_by").references(() => users.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Puntajes de los juegos (server/games.ts): el mejor de cada persona por juego. Los índices
// (único usuario+juego y el de la tabla de los mejores) se crean en GAME_SCORES_SQL al arrancar.
// Va aquí también porque el despliegue corre `drizzle-kit push` con este archivo.
export const gameScores = pgTable("game_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  game: text("game").notNull(),
  bestScore: integer("best_score").notNull().default(0),
  lastScore: integer("last_score"),
  plays: integer("plays").notNull().default(0),
  // rango, jornada y copas del jugador (para mostrarlos en la tabla)
  meta: jsonb("meta"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tabla de la semana de cada juego (en los juegos largos cuenta lo ganado en la semana).
export const gameScoresWeek = pgTable(
  "game_scores_week",
  {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    game: text("game").notNull(),
    week: text("week").notNull(),
    startScore: integer("start_score").notNull().default(0),
    bestScore: integer("best_score").notNull().default(0),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.game, t.week] })],
);

// Actividad de la comunidad de juegos ("Ana llegó a sumo sacerdote") y sus aplausos.
// El índice único (persona, juego, logro) se crea en GAME_SCORES_SQL al arrancar.
export const gameEvents = pgTable("game_events", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  game: text("game").notNull(),
  key: text("key").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const gameEventCheers = pgTable(
  "game_event_cheers",
  {
    eventId: integer("event_id").notNull().references(() => gameEvents.id, { onDelete: "cascade" }),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.eventId, t.userId] })],
);

// Partidas guardadas de los juegos largos (El aprendiz del templo): una por persona y juego,
// para seguir jugando en otro equipo. El índice único se crea en GAME_SAVES_SQL al arrancar.
export const gameSaves = pgTable("game_saves", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  game: text("game").notNull(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  // la partida más avanzada que fue reemplazada por una menos avanzada (se puede recuperar)
  backup: jsonb("backup"),
  backupAt: timestamp("backup_at"),
});

// ========== JERUSALÉN EN LÍNEA (modo en línea del templo, server/jerusalen.ts) ==========
// Los índices y las tablas se crean también en JERUSALEN_SQL al arrancar (ensureDatabaseSchema).
// Personajes en línea: uno por cuenta en la etapa 1 (la tabla admite varios por "slot").
export const gameCharacters = pgTable("game_characters", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  game: text("game").notNull(),
  slot: integer("slot").notNull().default(1),
  // nombre de sacerdote elegido de la lista; vacío = el nombre de la cuenta
  name: text("name"),
  path: text("path").notNull().default("sacerdocio"),
  createdAt: timestamp("created_at").defaultNow(),
  lastDutyAt: timestamp("last_duty_at"),
  // la administración lo sacó de la ciudad por una denuncia (sigue pudiendo servir en el templo)
  cityBannedAt: timestamp("city_banned_at"),
  // instrucción del sacerdote: partes terminadas (0 a 3) y cuándo la completó
  instructionParts: integer("instruction_parts").notNull().default(0),
  instructedAt: timestamp("instructed_at"),
});

// Estudios de Jerusalén en línea (server/estudios.ts): secciones terminadas y examen. Aprobado = para siempre.
export const gameStudies = pgTable(
  "game_studies",
  {
    characterId: integer("character_id").notNull().references(() => gameCharacters.id, { onDelete: "cascade" }),
    studyId: text("study_id").notNull(),
    sections: jsonb("sections").notNull().default([]),
    best: integer("best").notNull().default(0),
    attempts: integer("attempts").notNull().default(0),
    examIds: jsonb("exam_ids"),
    lastExamAt: timestamp("last_exam_at"),
    approvedAt: timestamp("approved_at"),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.characterId, t.studyId] })],
);

// Mérito de cada personaje por temporada, con la cuenta del día (tope diario y preguntas).
export const gameSeasonMerit = pgTable(
  "game_season_merit",
  {
    characterId: integer("character_id").notNull().references(() => gameCharacters.id, { onDelete: "cascade" }),
    season: integer("season").notNull(),
    merit: integer("merit").notNull().default(0),
    duties: integer("duties").notNull().default(0),
    answered: integer("answered").notNull().default(0),
    hits: integer("hits").notNull().default(0),
    dayKey: text("day_key"),
    daySeconds: integer("day_seconds").notNull().default(0),
    dayQuestions: integer("day_questions").notNull().default(0),
    daysServed: integer("days_served").notNull().default(0),
    lastBatchAt: timestamp("last_batch_at"),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.characterId, t.season] })],
);

// Preguntas difíciles que ya vio cada personaje en la temporada (no se repiten).
export const gameQuestionLog = pgTable(
  "game_question_log",
  {
    characterId: integer("character_id").notNull().references(() => gameCharacters.id, { onDelete: "cascade" }),
    season: integer("season").notNull(),
    question: text("question").notNull(),
    askedAt: timestamp("asked_at").notNull().defaultNow(),
    answeredAt: timestamp("answered_at"),
    correct: boolean("correct"),
  },
  (t) => [primaryKey({ columns: [t.characterId, t.season, t.question] })],
);

// Cargos de cada temporada: la lista del cierre en orden de mérito y el cargo de cada uno.
export const gameOffices = pgTable(
  "game_offices",
  {
    season: integer("season").notNull(),
    characterId: integer("character_id").notNull().references(() => gameCharacters.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    merit: integer("merit").notNull().default(0),
    canHigh: boolean("can_high").notNull().default(false),
    office: text("office"), // sumo | principal | jefe
    lostAt: timestamp("lost_at"),
    lostReason: text("lost_reason"), // inactividad | admin
  },
  (t) => [primaryKey({ columns: [t.season, t.characterId] })],
);

// Temporadas ya cerradas (para no repartir dos veces).
export const gameSeasons = pgTable(
  "game_seasons",
  {
    game: text("game").notNull(),
    season: integer("season").notNull(),
    closedAt: timestamp("closed_at").defaultNow(),
    candidates: integer("candidates").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.game, t.season] })],
);

// La ciudad (etapa 2, server/ciudad.ts): la casa de cada personaje, en una parcela fija de su
// barrio. El nivel (0 tienda … 3 aposento alto) sube con el mérito de todas las temporadas y
// nunca baja. El índice único (juego, barrio, parcela) se crea en JERUSALEN_SQL.
// Bloqueos entre personas (la ciudad de Jerusalén en línea los usa: quien bloquea y quien es
// bloqueado dejan de verse y de oírse). Se crean también en JERUSALEN_SQL.
export const userBlocks = pgTable(
  "user_blocks",
  {
    blockerId: integer("blocker_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    blockedId: integer("blocked_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.blockerId, t.blockedId] })],
);

export const gameHouses = pgTable("game_houses", {
  characterId: integer("character_id").primaryKey().references(() => gameCharacters.id, { onDelete: "cascade" }),
  game: text("game").notNull(),
  barrio: integer("barrio").notNull(),
  plot: integer("plot").notNull(),
  level: integer("level").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  // siervos (tareas: harina, aceite, corderos), alfolí y el tope de trabajo del día
  servants: jsonb("servants").notNull().default([]),
  goods: jsonb("goods").notNull().default({}),
  collectedAt: timestamp("collected_at"),
  prodDay: text("prod_day"),
  prodSeconds: integer("prod_seconds").notNull().default(0),
  // honra que dio lo que la casa ofreció en el templo
  offered: integer("offered").notNull().default(0),
  blessingsSeenAt: timestamp("blessings_seen_at"),
});

// Bendiciones que deja quien visita una casa: una por día y casa (como los aplausos).
export const gameHouseBlessings = pgTable(
  "game_house_blessings",
  {
    houseCharacterId: integer("house_character_id").notNull().references(() => gameCharacters.id, { onDelete: "cascade" }),
    visitorUserId: integer("visitor_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    dayKey: text("day_key").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.houseCharacterId, t.visitorUserId, t.dayKey] })],
);

export const PRAYER_CATEGORIES = {
  salud: "Salud",
  familia: "Familia",
  trabajo: "Trabajo y finanzas",
  espiritual: "Vida espiritual",
  salvacion: "Salvación de un ser querido",
  otro: "Otro motivo",
} as const;

export type PrayerRequest = typeof prayerRequests.$inferSelect;

// ========== ARCHIVOS GUARDADOS EN LA BASE ==========
// Cuando no hay S3/R2, cada archivo subido se guarda aquí por partes de 512 KB y se sirve
// en /files/<id>/<nombre> (ver server/file-store.ts).
const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType() {
    return "bytea";
  },
});

export const storedFiles = pgTable("stored_files", {
  id: text("id").primaryKey(),
  ownerId: integer("owner_id"),
  name: text("name").notNull(),
  mime: text("mime").notNull(),
  size: integer("size").notNull(),
  sha256: text("sha256"),
  folder: text("folder"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const storedFileChunks = pgTable(
  "stored_file_chunks",
  {
    fileId: text("file_id").notNull().references(() => storedFiles.id, { onDelete: "cascade" }),
    idx: integer("idx").notNull(),
    data: bytea("data").notNull(),
  },
  (t) => [primaryKey({ columns: [t.fileId, t.idx] })],
);
