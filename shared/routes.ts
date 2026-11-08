import { z } from "zod";
import {
  insertUserSchema, updateUserSchema, users, changePasswordSchema,
  insertMessageSchema, insertMemberPostSchema,
  insertEventSchema, updateEventSchema, insertEventRsvpSchema, updateSiteContentSchema,
  insertCourseSchema, updateCourseSchema,
  insertCourseMaterialSchema, updateCourseMaterialSchema,
  insertCourseSessionSchema, updateCourseSessionSchema,
  insertEnrollmentSchema, updateEnrollmentSchema,
  insertTeacherRequestSchema, updateTeacherRequestSchema,
  insertCourseAnnouncementSchema, updateCourseAnnouncementSchema,
  insertCourseScheduleSchema, updateCourseScheduleSchema,
  insertSessionAttendanceSchema, bulkAttendanceSchema, saveCourseGradesSchema,
  insertBibleHighlightSchema, insertBibleNoteSchema,
  insertReadingPlanSchema, insertReadingPlanItemSchema,
  insertReadingClubPostSchema, insertReadingClubCommentSchema,
  insertLibraryResourceSchema,
  insertPrayerActivitySchema, updatePrayerActivitySchema, insertRegionPostSchema,
  insertNotificationSchema, insertPrayerAttendeeSchema,
  insertMinistryRegionSchema, updateMinistryRegionSchema,
  insertMinistryChurchSchema, updateMinistryChurchSchema,
  insertChurchPostSchema,
  insertTeamMemberSchema, updateTeamMemberSchema,
  insertPostCommentSchema, insertDirectMessageSchema,
  insertCarteleraAnnouncementSchema, updateCarteleraAnnouncementSchema,
  insertTitheSchema,
  insertSermonSchema, updateSermonSchema, insertSermonNoteSchema,
  insertSmallGroupSchema, updateSmallGroupSchema, insertSmallGroupMeetingSchema, insertSmallGroupMessageSchema,
} from "./schema";

export { insertUserSchema, updateUserSchema, users };

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: "POST" as const,
      path: "/api/login" as const,
      input: z.object({ username: z.string(), password: z.string() }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    register: {
      method: "POST" as const,
      path: "/api/register" as const,
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    logout: {
      method: "POST" as const,
      path: "/api/logout" as const,
      responses: {
        200: z.void(),
      },
    },
    me: {
      method: "GET" as const,
      path: "/api/user" as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  users: {
    get: {
      method: "GET" as const,
      path: "/api/users/:id" as const,
    },
    update: {
      method: "PATCH" as const,
      path: "/api/users/:id" as const,
      input: updateUserSchema,
    },
    changePassword: {
      method: "POST" as const,
      path: "/api/users/change-password" as const,
      input: changePasswordSchema,
    },
  },
  contact: {
    send: {
      method: "POST" as const,
      path: "/api/contact" as const,
      input: insertMessageSchema.omit({ id: true, createdAt: true, isRead: true }),
    },
  },
  posts: {
    list: { method: "GET" as const, path: "/api/posts" as const },
    create: { method: "POST" as const, path: "/api/posts" as const, input: insertMemberPostSchema },
    delete: { method: "DELETE" as const, path: "/api/posts/:id" as const },
  },
  events: {
    list: { method: "GET" as const, path: "/api/events" as const },
    get: { method: "GET" as const, path: "/api/events/:id" as const },
    create: { method: "POST" as const, path: "/api/events" as const, input: insertEventSchema },
    update: { method: "PATCH" as const, path: "/api/events/:id" as const, input: updateEventSchema },
    delete: { method: "DELETE" as const, path: "/api/events/:id" as const },
  },
  eventRsvps: {
    list: { method: "GET" as const, path: "/api/events/:eventId/rsvps" as const },
    myRsvp: { method: "GET" as const, path: "/api/events/:eventId/my-rsvp" as const },
    upsert: { method: "POST" as const, path: "/api/events/:eventId/rsvp" as const, input: insertEventRsvpSchema },
    cancel: { method: "DELETE" as const, path: "/api/events/:eventId/rsvp" as const },
  },
  siteContent: {
    get: { method: "GET" as const, path: "/api/content/:key" as const },
    list: { method: "GET" as const, path: "/api/content" as const },
    update: { method: "PATCH" as const, path: "/api/content/:key" as const, input: updateSiteContentSchema },
  },
  courses: {
    list: { method: "GET" as const, path: "/api/courses" as const },
    get: { method: "GET" as const, path: "/api/courses/:id" as const },
    create: { method: "POST" as const, path: "/api/courses" as const, input: insertCourseSchema },
    update: { method: "PATCH" as const, path: "/api/courses/:id" as const, input: updateCourseSchema },
    delete: { method: "DELETE" as const, path: "/api/courses/:id" as const },
  },
  courseMaterials: {
    list: { method: "GET" as const, path: "/api/courses/:courseId/materials" as const },
    create: { method: "POST" as const, path: "/api/courses/:courseId/materials" as const, input: insertCourseMaterialSchema },
    update: { method: "PATCH" as const, path: "/api/materials/:id" as const, input: updateCourseMaterialSchema },
    delete: { method: "DELETE" as const, path: "/api/materials/:id" as const },
  },
  courseSessions: {
    list: { method: "GET" as const, path: "/api/courses/:courseId/sessions" as const },
    create: { method: "POST" as const, path: "/api/courses/:courseId/sessions" as const, input: insertCourseSessionSchema },
    update: { method: "PATCH" as const, path: "/api/sessions/:id" as const, input: updateCourseSessionSchema },
    delete: { method: "DELETE" as const, path: "/api/sessions/:id" as const },
  },
  enrollments: {
    list: { method: "GET" as const, path: "/api/enrollments" as const },
    listByCourse: { method: "GET" as const, path: "/api/courses/:courseId/enrollments" as const },
    create: { method: "POST" as const, path: "/api/enrollments" as const, input: insertEnrollmentSchema },
    update: { method: "PATCH" as const, path: "/api/enrollments/:id" as const, input: updateEnrollmentSchema },
    delete: { method: "DELETE" as const, path: "/api/enrollments/:id" as const },
  },
  teacherRequests: {
    list: { method: "GET" as const, path: "/api/teacher-requests" as const },
    myRequests: { method: "GET" as const, path: "/api/my-teacher-requests" as const },
    create: { method: "POST" as const, path: "/api/teacher-requests" as const, input: insertTeacherRequestSchema },
    update: { method: "PATCH" as const, path: "/api/teacher-requests/:id" as const, input: updateTeacherRequestSchema },
    delete: { method: "DELETE" as const, path: "/api/teacher-requests/:id" as const },
  },
  courseAnnouncements: {
    list: { method: "GET" as const, path: "/api/courses/:courseId/announcements" as const },
    create: { method: "POST" as const, path: "/api/courses/:courseId/announcements" as const, input: insertCourseAnnouncementSchema },
    update: { method: "PATCH" as const, path: "/api/announcements/:id" as const, input: updateCourseAnnouncementSchema },
    delete: { method: "DELETE" as const, path: "/api/announcements/:id" as const },
  },
  courseScheduleEntries: {
    list: { method: "GET" as const, path: "/api/courses/:courseId/schedule" as const },
    create: { method: "POST" as const, path: "/api/courses/:courseId/schedule" as const, input: insertCourseScheduleSchema },
    update: { method: "PATCH" as const, path: "/api/schedule/:id" as const, input: updateCourseScheduleSchema },
    delete: { method: "DELETE" as const, path: "/api/schedule/:id" as const },
  },
  sessionAttendance: {
    list: { method: "GET" as const, path: "/api/sessions/:sessionId/attendance" as const },
    upsert: { method: "POST" as const, path: "/api/sessions/:sessionId/attendance" as const, input: insertSessionAttendanceSchema },
    bulk: { method: "POST" as const, path: "/api/sessions/:sessionId/attendance/bulk" as const, input: bulkAttendanceSchema },
  },
  // Planillas del curso (inscritos, asistencia, notas, seguimiento, firmas)
  coursePlanillas: {
    get: { method: "GET" as const, path: "/api/courses/:courseId/planillas" as const },
    saveGrades: { method: "PUT" as const, path: "/api/courses/:courseId/grades" as const, input: saveCourseGradesSchema },
  },
  // ========== BIBLIOTECA ==========
  bibleHighlights: {
    list: { method: "GET" as const, path: "/api/bible/highlights" as const },
    create: { method: "POST" as const, path: "/api/bible/highlights" as const, input: insertBibleHighlightSchema },
    delete: { method: "DELETE" as const, path: "/api/bible/highlights/:id" as const },
  },
  bibleNotes: {
    list: { method: "GET" as const, path: "/api/bible/notes" as const },
    create: { method: "POST" as const, path: "/api/bible/notes" as const, input: insertBibleNoteSchema },
    update: { method: "PATCH" as const, path: "/api/bible/notes/:id" as const, input: z.object({ content: z.string().min(1) }) },
    delete: { method: "DELETE" as const, path: "/api/bible/notes/:id" as const },
  },
  readingPlans: {
    list: { method: "GET" as const, path: "/api/reading-plans" as const },
    get: { method: "GET" as const, path: "/api/reading-plans/:id" as const },
    create: { method: "POST" as const, path: "/api/reading-plans" as const, input: insertReadingPlanSchema },
    delete: { method: "DELETE" as const, path: "/api/reading-plans/:id" as const },
    addItem: { method: "POST" as const, path: "/api/reading-plans/:id/items" as const, input: insertReadingPlanItemSchema },
    bulkAddItems: { method: "POST" as const, path: "/api/reading-plans/:id/items/bulk" as const },
    toggleItem: { method: "PATCH" as const, path: "/api/reading-plan-items/:id/toggle" as const },
    deleteItem: { method: "DELETE" as const, path: "/api/reading-plan-items/:id" as const },
  },
  readingClub: {
    list: { method: "GET" as const, path: "/api/reading-club" as const },
    create: { method: "POST" as const, path: "/api/reading-club" as const, input: insertReadingClubPostSchema },
    delete: { method: "DELETE" as const, path: "/api/reading-club/:id" as const },
    listComments: { method: "GET" as const, path: "/api/reading-club/:id/comments" as const },
    createComment: { method: "POST" as const, path: "/api/reading-club/:id/comments" as const, input: insertReadingClubCommentSchema },
    deleteComment: { method: "DELETE" as const, path: "/api/reading-club-comments/:id" as const },
  },
  libraryResources: {
    list: { method: "GET" as const, path: "/api/library-resources" as const },
    create: { method: "POST" as const, path: "/api/library-resources" as const, input: insertLibraryResourceSchema },
    delete: { method: "DELETE" as const, path: "/api/library-resources/:id" as const },
    toggleLike: { method: "POST" as const, path: "/api/library-resources/:id/like" as const },
  },
  radio: {
    station: { method: "GET" as const, path: "/api/radio/station" as const },
  },
  readingClubLikes: {
    toggle: { method: "POST" as const, path: "/api/reading-club/:id/like" as const },
  },
  admin: {
    listUsers: { method: "GET" as const, path: "/api/admin/users" as const },
    toggleActive: { method: "PATCH" as const, path: "/api/admin/users/:id/toggle-active" as const },
    updateRole: { method: "PATCH" as const, path: "/api/admin/users/:id/role" as const },
    updateUserInfo: { method: "PATCH" as const, path: "/api/admin/users/:id/info" as const },
    deleteUser: { method: "DELETE" as const, path: "/api/admin/users/:id" as const },
    listMessages: { method: "GET" as const, path: "/api/admin/messages" as const },
    toggleMessageRead: { method: "PATCH" as const, path: "/api/admin/messages/:id/toggle-read" as const },
    deleteMessage: { method: "DELETE" as const, path: "/api/admin/messages/:id" as const },
    getWhatsappLink: { method: "GET" as const, path: "/api/admin/whatsapp-link" as const },
    updateWhatsappLink: { method: "PATCH" as const, path: "/api/admin/whatsapp-link" as const },
    getLiveStream: { method: "GET" as const, path: "/api/live-stream" as const },
    updateLiveStream: { method: "PATCH" as const, path: "/api/admin/live-stream" as const },
    listRadioLibrary: { method: "GET" as const, path: "/api/admin/radio-library" as const },
    uploadRadioTrack: { method: "POST" as const, path: "/api/admin/radio-library/:category/upload" as const },
    deleteRadioTrack: { method: "DELETE" as const, path: "/api/admin/radio-library/:category/:fileName" as const },
    getUserDetail: { method: "GET" as const, path: "/api/admin/users/:id/detail" as const },
  },
  notifications: {
    list: { method: "GET" as const, path: "/api/notifications" as const },
    markRead: { method: "PATCH" as const, path: "/api/notifications/:id/read" as const },
    markAllRead: { method: "PATCH" as const, path: "/api/notifications/read-all" as const },
    unreadCount: { method: "GET" as const, path: "/api/notifications/unread-count" as const },
  },
  prayerActivities: {
    list: { method: "GET" as const, path: "/api/prayer-activities" as const },
    create: { method: "POST" as const, path: "/api/prayer-activities" as const, input: insertPrayerActivitySchema },
    update: { method: "PATCH" as const, path: "/api/prayer-activities/:id" as const, input: updatePrayerActivitySchema },
    delete: { method: "DELETE" as const, path: "/api/prayer-activities/:id" as const },
  },
  prayerAttendees: {
    list: { method: "GET" as const, path: "/api/prayer-activities/:activityId/attendees" as const },
    myAttendance: { method: "GET" as const, path: "/api/prayer-activities/:activityId/my-attendance" as const },
    upsert: { method: "POST" as const, path: "/api/prayer-activities/:activityId/attend" as const, input: insertPrayerAttendeeSchema },
    cancel: { method: "DELETE" as const, path: "/api/prayer-activities/:activityId/attend" as const },
  },
  regionPosts: {
    list: { method: "GET" as const, path: "/api/region-posts" as const },
    create: { method: "POST" as const, path: "/api/region-posts" as const, input: insertRegionPostSchema },
    delete: { method: "DELETE" as const, path: "/api/region-posts/:id" as const },
  },
  ministryRegions: {
    list: { method: "GET" as const, path: "/api/ministry-regions" as const },
    create: { method: "POST" as const, path: "/api/ministry-regions" as const, input: insertMinistryRegionSchema },
    update: { method: "PATCH" as const, path: "/api/ministry-regions/:id" as const, input: updateMinistryRegionSchema },
    delete: { method: "DELETE" as const, path: "/api/ministry-regions/:id" as const },
  },
  ministryChurches: {
    list: { method: "GET" as const, path: "/api/ministry-churches" as const },
    get: { method: "GET" as const, path: "/api/ministry-churches/:id" as const },
    create: { method: "POST" as const, path: "/api/ministry-churches" as const, input: insertMinistryChurchSchema },
    update: { method: "PATCH" as const, path: "/api/ministry-churches/:id" as const, input: updateMinistryChurchSchema },
    delete: { method: "DELETE" as const, path: "/api/ministry-churches/:id" as const },
  },
  churchPosts: {
    list: { method: "GET" as const, path: "/api/church-posts" as const },
    create: { method: "POST" as const, path: "/api/church-posts" as const, input: insertChurchPostSchema },
    delete: { method: "DELETE" as const, path: "/api/church-posts/:id" as const },
  },
  teamMembers: {
    list: { method: "GET" as const, path: "/api/team-members" as const },
    create: { method: "POST" as const, path: "/api/team-members" as const, input: insertTeamMemberSchema },
    update: { method: "PATCH" as const, path: "/api/team-members/:id" as const, input: updateTeamMemberSchema },
    delete: { method: "DELETE" as const, path: "/api/team-members/:id" as const },
  },
  cartelera: {
    list: { method: "GET" as const, path: "/api/cartelera/announcements" as const },
    create: { method: "POST" as const, path: "/api/cartelera/announcements" as const, input: insertCarteleraAnnouncementSchema },
    update: { method: "PATCH" as const, path: "/api/cartelera/announcements/:id" as const, input: updateCarteleraAnnouncementSchema },
    delete: { method: "DELETE" as const, path: "/api/cartelera/announcements/:id" as const },
    allAnnouncements: { method: "GET" as const, path: "/api/cartelera/all-announcements" as const },
    allSessions: { method: "GET" as const, path: "/api/cartelera/all-sessions" as const },
    allSchedules: { method: "GET" as const, path: "/api/cartelera/all-schedules" as const },
    stats: { method: "GET" as const, path: "/api/cartelera/stats" as const },
  },
  friends: {
    list: { method: "GET" as const, path: "/api/friends" as const },
    requests: { method: "GET" as const, path: "/api/friends/requests" as const },
    send: { method: "POST" as const, path: "/api/friends/request" as const },
    accept: { method: "PATCH" as const, path: "/api/friends/:id/accept" as const },
    reject: { method: "PATCH" as const, path: "/api/friends/:id/reject" as const },
    remove: { method: "DELETE" as const, path: "/api/friends/:id" as const },
    search: { method: "GET" as const, path: "/api/friends/search" as const },
  },
  postComments: {
    list: { method: "GET" as const, path: "/api/posts/:postId/comments" as const },
    create: { method: "POST" as const, path: "/api/posts/:postId/comments" as const, input: insertPostCommentSchema },
    delete: { method: "DELETE" as const, path: "/api/post-comments/:id" as const },
  },
  directMessages: {
    conversations: { method: "GET" as const, path: "/api/messages/conversations" as const },
    list: { method: "GET" as const, path: "/api/messages/:userId" as const },
    send: { method: "POST" as const, path: "/api/messages" as const, input: insertDirectMessageSchema },
    markRead: { method: "PATCH" as const, path: "/api/messages/:userId/read" as const },
    unreadCount: { method: "GET" as const, path: "/api/messages/unread-count" as const },
  },
  // ========== CERTIFICADOS ==========
  certificates: {
    get: { method: "GET" as const, path: "/api/certificates/:id" as const },
    listByUser: { method: "GET" as const, path: "/api/certificates/user/:userId" as const },
    myList: { method: "GET" as const, path: "/api/certificates/mine" as const },
    generate: { method: "POST" as const, path: "/api/certificates/generate" as const, input: z.object({ enrollmentId: z.number() }) },
    verify: { method: "GET" as const, path: "/api/certificates/verify/:code" as const },
  },
  // ========== FINANZAS (antes Diezmos y Ofrendas) ==========
  tithes: {
    list: { method: "GET" as const, path: "/api/tithes" as const },
    create: { method: "POST" as const, path: "/api/tithes" as const, input: insertTitheSchema },
    delete: { method: "DELETE" as const, path: "/api/tithes/:id" as const },
    report: { method: "GET" as const, path: "/api/tithes/report" as const },
    publicDonate: { method: "POST" as const, path: "/api/donations/public" as const, input: z.object({
      donorName: z.string().min(1),
      amount: z.string().min(1),
      currency: z.string().optional(),
      method: z.enum(["transferencia", "paypal", "otro"]).optional(),
      notes: z.string().optional().nullable(),
      email: z.string().email().optional().nullable(),
    })},
    budgetSummary: { method: "GET" as const, path: "/api/finance/budget-summary" as const },
    stripeCheckout: { method: "POST" as const, path: "/api/donations/stripe-checkout" as const, input: z.object({
      donorName: z.string().min(1),
      email: z.string().email(),
      amount: z.number().min(1),
      currency: z.string().optional(),
    })},
    stripeWebhook: { method: "POST" as const, path: "/api/stripe/webhook" as const },
    stripeConfig: { method: "GET" as const, path: "/api/stripe/config" as const },
  },
  // ========== REPORTES ==========
  reports: {
    dashboard: { method: "GET" as const, path: "/api/reports/dashboard" as const },
    memberGrowth: { method: "GET" as const, path: "/api/reports/member-growth" as const },
    courseStats: { method: "GET" as const, path: "/api/reports/course-stats" as const },
    attendanceStats: { method: "GET" as const, path: "/api/reports/attendance" as const },
    prayerStats: { method: "GET" as const, path: "/api/reports/prayer" as const },
    libraryStats: { method: "GET" as const, path: "/api/reports/library" as const },
    enrollmentExport: { method: "GET" as const, path: "/api/reports/enrollments/export" as const },
    liveEvents: { method: "GET" as const, path: "/api/reports/live-events" as const },
    liveEventDetail: { method: "GET" as const, path: "/api/reports/live-events/:sessionId" as const },
    liveEventExport: { method: "GET" as const, path: "/api/reports/live-events/export" as const },
  },
  // ========== SERMONES ==========
  sermons: {
    list: { method: "GET" as const, path: "/api/sermons" as const },
    get: { method: "GET" as const, path: "/api/sermons/:id" as const },
    create: { method: "POST" as const, path: "/api/sermons" as const, input: insertSermonSchema },
    update: { method: "PATCH" as const, path: "/api/sermons/:id" as const, input: updateSermonSchema },
    delete: { method: "DELETE" as const, path: "/api/sermons/:id" as const },
    notes: { method: "GET" as const, path: "/api/sermons/:id/notes" as const },
    saveNote: { method: "POST" as const, path: "/api/sermons/:id/notes" as const, input: insertSermonNoteSchema },
    deleteNote: { method: "DELETE" as const, path: "/api/sermon-notes/:id" as const },
  },
  // ========== GRUPOS PEQUEÑOS ==========
  smallGroups: {
    list: { method: "GET" as const, path: "/api/small-groups" as const },
    get: { method: "GET" as const, path: "/api/small-groups/:id" as const },
    create: { method: "POST" as const, path: "/api/small-groups" as const, input: insertSmallGroupSchema },
    update: { method: "PATCH" as const, path: "/api/small-groups/:id" as const, input: updateSmallGroupSchema },
    delete: { method: "DELETE" as const, path: "/api/small-groups/:id" as const },
    join: { method: "POST" as const, path: "/api/small-groups/:id/join" as const },
    leave: { method: "DELETE" as const, path: "/api/small-groups/:id/leave" as const },
    members: { method: "GET" as const, path: "/api/small-groups/:id/members" as const },
    meetings: { method: "GET" as const, path: "/api/small-groups/:id/meetings" as const },
    createMeeting: { method: "POST" as const, path: "/api/small-groups/:id/meetings" as const, input: insertSmallGroupMeetingSchema },
    messages: { method: "GET" as const, path: "/api/small-groups/:id/messages" as const },
    sendMessage: { method: "POST" as const, path: "/api/small-groups/:id/messages" as const, input: insertSmallGroupMessageSchema },
  },
  // ========== SALA EN VIVO (AULA) ==========
  liveClassroom: {
    get: { method: "GET" as const, path: "/api/courses/:courseId/live-classroom" as const },
    start: { method: "POST" as const, path: "/api/courses/:courseId/live-classroom/start" as const },
    stop: { method: "POST" as const, path: "/api/courses/:courseId/live-classroom/stop" as const },
  },
  // ========== SALAS EN VIVO GENERICAS (Oracion, Eventos, En Vivo) ==========
  liveRoom: {
    get: { method: "GET" as const, path: "/api/live-room/:context/:contextId" as const },
    start: { method: "POST" as const, path: "/api/live-room/:context/:contextId/start" as const },
    stop: { method: "POST" as const, path: "/api/live-room/:context/:contextId/stop" as const },
    join: { method: "POST" as const, path: "/api/live-room/:context/:contextId/join" as const },
    leave: { method: "POST" as const, path: "/api/live-room/:context/:contextId/leave" as const },
  },
  // ========== CALENDARIO UNIFICADO ==========
  calendar: {
    events: { method: "GET" as const, path: "/api/calendar/events" as const },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}
