import { db } from "./db";
import {
  users, messages, memberPosts, events, siteContent,
  courses, courseMaterials, courseSessions, enrollments, teacherRequests,
  courseAnnouncements, courseSchedule, sessionAttendance,
  bibleHighlights, bibleNotes, readingPlans, readingPlanItems,
  readingClubPosts, readingClubComments, readingClubPostLikes, libraryResources, libraryResourceLikes,
  notifications, prayerActivities, regionPosts,
  regionPostReactions, regionPostPolls, regionPostPollOptions, regionPostPollVotes,
  eventRsvps, prayerAttendees,
  type User, type InsertUser, type UpdateUser,
  type Message, type InsertMessage,
  type MemberPost,
  type Event, type InsertEvent, type UpdateEvent,
  type EventRsvp, type InsertEventRsvp,
  type SiteContent, type UpdateSiteContent,
  type Course, type InsertCourse, type UpdateCourse,
  type CourseMaterial, type InsertCourseMaterial, type UpdateCourseMaterial,
  type CourseSession, type InsertCourseSession, type UpdateCourseSession,
  type Enrollment, type UpdateEnrollment,
  type TeacherRequest, type UpdateTeacherRequest,
  type CourseAnnouncement, type InsertCourseAnnouncement, type UpdateCourseAnnouncement,
  type CourseScheduleEntry, type InsertCourseSchedule, type UpdateCourseSchedule,
  type SessionAttendance, type InsertSessionAttendance,
  type BibleHighlight, type InsertBibleHighlight,
  type BibleNote, type InsertBibleNote,
  type ReadingPlan, type InsertReadingPlan,
  type ReadingPlanItem, type InsertReadingPlanItem,
  type ReadingClubPost, type InsertReadingClubPost,
  type ReadingClubComment, type InsertReadingClubComment,
  type LibraryResource, type InsertLibraryResource,
  type LibraryResourceLike,
  type Notification, type InsertNotification,
  type PrayerActivity, type InsertPrayerActivity, type UpdatePrayerActivity,
  type RegionPost, type InsertRegionPost,
  type RegionPostPoll, type RegionPostPollOption, type RegionPostPollVote, type RegionPostReaction,
  ministryRegions, teamMembers,
  type MinistryRegion, type InsertMinistryRegion, type UpdateMinistryRegion,
  ministryChurches, churchPosts,
  type MinistryChurch, type InsertMinistryChurch, type UpdateMinistryChurch,
  type ChurchPost, type InsertChurchPost,
  type TeamMember, type InsertTeamMember, type UpdateTeamMember,
  friendships, type Friendship,
  postComments, type PostComment, type InsertPostComment,
  directMessages, type DirectMessage, type InsertDirectMessage,
  carteleraAnnouncements, type CarteleraAnnouncement, type InsertCarteleraAnnouncement, type UpdateCarteleraAnnouncement,
  passwordResetTokens, type PasswordResetToken,
  pushSubscriptions,
  // New modules
  certificates, type Certificate,
  tithes, type Tithe, type InsertTithe,
  sermons, sermonNotes, type Sermon, type InsertSermon, type UpdateSermon, type SermonNote, type InsertSermonNote,
  smallGroups, smallGroupMembers, smallGroupMeetings, smallGroupAttendance, smallGroupMessages,
  type SmallGroup, type InsertSmallGroup, type UpdateSmallGroup,
  type SmallGroupMember, type SmallGroupMeeting, type InsertSmallGroupMeeting,
  type SmallGroupAttendance, type SmallGroupMessage, type InsertSmallGroupMessage,
  liveEventSessions, liveEventAttendance,
  type LiveEventSession, type LiveEventAttendance,
  // Reforma ministerial
  teacherProfiles, type TeacherProfile, type InsertTeacherProfile, type UpdateTeacherProfile,
  churchPermissions, type ChurchPermission, type InsertChurchPermission,
  churchMemberships, type ChurchMembership,
  courseTeacherAssignments, type CourseTeacherAssignment, type InsertCourseTeacherAssignment, type UpdateCourseTeacherAssignment,
  allianceRequests, type AllianceRequest, type InsertAllianceRequest, type UpdateAllianceRequest,
  memberChanneling, type MemberChanneling, type InsertMemberChanneling,
  auditLog, type AuditLog,
  memberProgress, type MemberProgressEntry,
} from "@shared/schema";
import { eq, desc, asc, and, ilike, or, sql, inArray, ne, lt } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: UpdateUser): Promise<User>;
  updateUserRole(id: number, role: string): Promise<User | undefined>;
  listUsers(): Promise<User[]>;
  listPendingUsers(): Promise<User[]>;
  toggleUserActive(id: number): Promise<User | undefined>;
  deleteUser(id: number): Promise<void>;

  createMessage(message: InsertMessage): Promise<Message>;
  listMessages(): Promise<Message[]>;
  toggleMessageRead(id: number): Promise<Message | undefined>;
  deleteMessage(id: number): Promise<void>;

  createMemberPost(userId: number, content: string, imageUrl?: string | null, attachment?: { fileUrl?: string | null; fileName?: string | null; fileSize?: number | null; fileMime?: string | null }): Promise<MemberPost>;
  listMemberPosts(): Promise<(MemberPost & { user: { username: string; displayName: string | null; avatarUrl: string | null; cargo: string | null; country: string | null }; commentCount: number })[]>;
  deleteMemberPost(id: number): Promise<void>;

  createEvent(event: InsertEvent & { createdBy: number }): Promise<Event>;
  getEvent(id: number): Promise<Event | undefined>;
  listEvents(): Promise<Event[]>;
  listPublishedEvents(): Promise<Event[]>;
  updateEvent(id: number, updates: UpdateEvent): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<void>;

  // Event RSVPs
  upsertEventRsvp(eventId: number, userId: number, data: InsertEventRsvp): Promise<EventRsvp>;
  getEventRsvp(eventId: number, userId: number): Promise<EventRsvp | undefined>;
  listEventRsvps(eventId: number): Promise<(EventRsvp & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]>;
  cancelEventRsvp(eventId: number, userId: number): Promise<void>;
  getEventRsvpCount(eventId: number): Promise<number>;

  getSiteContent(key: string): Promise<SiteContent | undefined>;
  listSiteContent(): Promise<SiteContent[]>;
  upsertSiteContent(key: string, data: UpdateSiteContent, updatedBy: number): Promise<SiteContent>;

  createCourse(course: InsertCourse & { createdBy: number }): Promise<Course>;
  getCourse(id: number): Promise<Course | undefined>;
  listCourses(): Promise<Course[]>;
  listActiveCourses(): Promise<Course[]>;
  listCoursesByTeacher(teacherId: number): Promise<Course[]>;
  searchCourses(query: string, category?: string): Promise<Course[]>;
  updateCourse(id: number, updates: UpdateCourse): Promise<Course | undefined>;
  deleteCourse(id: number): Promise<void>;

  createCourseMaterial(material: InsertCourseMaterial): Promise<CourseMaterial>;
  listCourseMaterials(courseId: number): Promise<CourseMaterial[]>;
  updateCourseMaterial(id: number, updates: UpdateCourseMaterial): Promise<CourseMaterial | undefined>;
  deleteCourseMaterial(id: number): Promise<void>;

  createCourseSession(session: InsertCourseSession): Promise<CourseSession>;
  listCourseSessions(courseId: number): Promise<CourseSession[]>;
  updateCourseSession(id: number, updates: UpdateCourseSession): Promise<CourseSession | undefined>;
  deleteCourseSession(id: number): Promise<void>;

  createEnrollment(userId: number, courseId: number): Promise<Enrollment>;
  getEnrollment(id: number): Promise<Enrollment | undefined>;
  getEnrollmentByUserAndCourse(userId: number, courseId: number): Promise<Enrollment | undefined>;
  listEnrollmentsByUser(userId: number): Promise<(Enrollment & { course: Course })[]>;
  listEnrollmentsByCourse(courseId: number): Promise<(Enrollment & { user: { id: number; username: string; displayName: string | null; role: string } })[]>;
  updateEnrollment(id: number, updates: UpdateEnrollment): Promise<Enrollment | undefined>;
  deleteEnrollment(id: number): Promise<void>;

  createTeacherRequest(userId: number, courseId: number, message?: string | null): Promise<TeacherRequest>;
  getTeacherRequestByUserAndCourse(userId: number, courseId: number): Promise<TeacherRequest | undefined>;
  listTeacherRequests(): Promise<(TeacherRequest & { user: { id: number; username: string; displayName: string | null; role: string }; course: { id: number; title: string } })[]>;
  listTeacherRequestsByUser(userId: number): Promise<(TeacherRequest & { course: Course })[]>;
  updateTeacherRequest(id: number, updates: UpdateTeacherRequest): Promise<TeacherRequest | undefined>;
  deleteTeacherRequest(id: number): Promise<void>;

  createCourseAnnouncement(data: InsertCourseAnnouncement & { authorId: number }): Promise<CourseAnnouncement>;
  listCourseAnnouncements(courseId: number): Promise<(CourseAnnouncement & { author: { username: string; displayName: string | null } })[]>;
  updateCourseAnnouncement(id: number, updates: UpdateCourseAnnouncement): Promise<CourseAnnouncement | undefined>;
  deleteCourseAnnouncement(id: number): Promise<void>;

  createCourseScheduleEntry(data: InsertCourseSchedule): Promise<CourseScheduleEntry>;
  listCourseSchedule(courseId: number): Promise<CourseScheduleEntry[]>;
  updateCourseScheduleEntry(id: number, updates: UpdateCourseSchedule): Promise<CourseScheduleEntry | undefined>;
  deleteCourseScheduleEntry(id: number): Promise<void>;

  upsertSessionAttendance(data: InsertSessionAttendance): Promise<SessionAttendance>;
  listSessionAttendance(sessionId: number): Promise<(SessionAttendance & { user: { id: number; username: string; displayName: string | null } })[]>;
  listPostsByUser(userId: number): Promise<MemberPost[]>;
  listAttendanceByUser(userId: number): Promise<SessionAttendance[]>;

  // Biblioteca
  createBibleHighlight(userId: number, data: InsertBibleHighlight): Promise<BibleHighlight>;
  listBibleHighlights(userId: number, book?: string, chapter?: number): Promise<BibleHighlight[]>;
  deleteBibleHighlight(id: number, userId: number): Promise<void>;

  createBibleNote(userId: number, data: InsertBibleNote): Promise<BibleNote>;
  listBibleNotes(userId: number, book?: string, chapter?: number): Promise<BibleNote[]>;
  updateBibleNote(id: number, userId: number, content: string): Promise<BibleNote | undefined>;
  deleteBibleNote(id: number, userId: number): Promise<void>;

  createReadingPlan(userId: number, data: InsertReadingPlan): Promise<ReadingPlan>;
  getReadingPlan(id: number): Promise<ReadingPlan | undefined>;
  listReadingPlans(userId: number): Promise<ReadingPlan[]>;
  listPublicReadingPlans(): Promise<(ReadingPlan & { user: { username: string; displayName: string | null } })[]>;
  deleteReadingPlan(id: number): Promise<void>;
  addReadingPlanItem(data: InsertReadingPlanItem): Promise<ReadingPlanItem>;
  bulkAddReadingPlanItems(items: InsertReadingPlanItem[]): Promise<ReadingPlanItem[]>;
  listReadingPlanItems(planId: number): Promise<ReadingPlanItem[]>;
  getReadingPlanItem(id: number): Promise<ReadingPlanItem | undefined>;
  toggleReadingPlanItem(id: number): Promise<ReadingPlanItem | undefined>;
  deleteReadingPlanItem(id: number): Promise<void>;

  createReadingClubPost(userId: number, data: InsertReadingClubPost): Promise<ReadingClubPost>;
  listReadingClubPosts(): Promise<(ReadingClubPost & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null }; commentCount: number; likeCount: number })[]>;
  deleteReadingClubPost(id: number): Promise<void>;
  toggleReadingClubPostLike(postId: number, userId: number): Promise<{ liked: boolean }>;
  getUserLikedPosts(userId: number): Promise<number[]>;
  createReadingClubComment(userId: number, data: InsertReadingClubComment): Promise<ReadingClubComment>;
  listReadingClubComments(postId: number): Promise<(ReadingClubComment & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]>;
  deleteReadingClubComment(id: number): Promise<void>;

  updateUserInfo(id: number, cargo: string | null, country: string | null): Promise<User | undefined>;

  createNotification(data: InsertNotification): Promise<Notification>;
  createNotificationForAll(data: Omit<InsertNotification, "userId">): Promise<void>;
  listNotifications(userId: number): Promise<Notification[]>;
  markNotificationRead(id: number, userId: number): Promise<void>;
  markAllNotificationsRead(userId: number): Promise<void>;
  getUnreadNotificationCount(userId: number): Promise<number>;

  createPrayerActivity(userId: number, data: InsertPrayerActivity): Promise<PrayerActivity>;
  getPrayerActivity(id: number): Promise<PrayerActivity | undefined>;
  updatePrayerActivity(id: number, data: UpdatePrayerActivity): Promise<PrayerActivity | undefined>;
  listPrayerActivities(): Promise<(PrayerActivity & { user: { username: string; displayName: string | null } })[]>;
  deletePrayerActivity(id: number): Promise<void>;

  // Prayer Attendees
  upsertPrayerAttendee(activityId: number, userId: number, data: { status?: string }): Promise<any>;
  getPrayerAttendee(activityId: number, userId: number): Promise<any>;
  listPrayerAttendees(activityId: number): Promise<any[]>;
  cancelPrayerAttendance(activityId: number, userId: number): Promise<void>;
  getPrayerAttendeeCount(activityId: number): Promise<number>;

  createRegionPost(userId: number, data: InsertRegionPost): Promise<RegionPost>;
  listRegionPosts(region?: string): Promise<(RegionPost & { user: { username: string; displayName: string | null; avatarUrl: string | null; country: string | null } })[]>;
  getRegionPost(id: number): Promise<RegionPost | undefined>;
  deleteRegionPost(id: number): Promise<void>;

  listMinistryRegions(): Promise<MinistryRegion[]>;
  createMinistryRegion(data: InsertMinistryRegion): Promise<MinistryRegion>;
  updateMinistryRegion(id: number, data: UpdateMinistryRegion): Promise<MinistryRegion | undefined>;
  deleteMinistryRegion(id: number): Promise<void>;

  // Ministry Churches
  listMinistryChurches(churchType?: string): Promise<MinistryChurch[]>;
  getMinistryChurch(id: number): Promise<MinistryChurch | undefined>;
  createMinistryChurch(data: InsertMinistryChurch): Promise<MinistryChurch>;
  updateMinistryChurch(id: number, data: UpdateMinistryChurch): Promise<MinistryChurch | undefined>;
  deleteMinistryChurch(id: number): Promise<void>;

  // Church Posts
  createChurchPost(userId: number, data: InsertChurchPost): Promise<ChurchPost>;
  listChurchPosts(churchId?: number): Promise<(ChurchPost & { user: { username: string; displayName: string | null; avatarUrl: string | null }; church: { name: string; churchType: string } })[]>;
  getChurchPost(id: number): Promise<ChurchPost | undefined>;
  deleteChurchPost(id: number): Promise<void>;

  listTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(data: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, data: UpdateTeamMember): Promise<TeamMember | undefined>;
  deleteTeamMember(id: number): Promise<void>;

  createLibraryResource(userId: number, data: InsertLibraryResource): Promise<LibraryResource>;
  listLibraryResources(category?: string, search?: string): Promise<(LibraryResource & { user: { username: string; displayName: string | null }; likeCount: number })[]>;
  deleteLibraryResource(id: number): Promise<void>;
  toggleLibraryResourceLike(resourceId: number, userId: number): Promise<{ liked: boolean }>;
  getUserLikedResources(userId: number): Promise<number[]>;

  toggleRegionPostReaction(postId: number, userId: number, reactionType: string): Promise<{ added: boolean }>;
  getRegionPostReactions(postId: number): Promise<{ reactionType: string; count: number; users: number[] }[]>;

  createRegionPostPoll(postId: number, question: string, options: string[]): Promise<RegionPostPoll>;
  getRegionPostPoll(postId: number): Promise<{ poll: RegionPostPoll; options: (RegionPostPollOption & { voteCount: number })[] } | null>;
  voteRegionPostPoll(optionId: number, userId: number): Promise<{ success: boolean }>;
  getUserPollVote(postId: number, userId: number): Promise<number | null>;

  // Friends
  listFriends(userId: number): Promise<any[]>;
  listFriendRequests(userId: number): Promise<any[]>;
  searchUsersForFriends(userId: number, query: string): Promise<any[]>;
  sendFriendRequest(requesterId: number, addresseeId: number): Promise<any>;
  acceptFriendRequest(friendshipId: number, userId: number): Promise<any>;
  rejectFriendRequest(friendshipId: number, userId: number): Promise<any>;
  removeFriend(friendshipId: number, userId: number): Promise<void>;

  // Post comments
  getMemberPost(id: number): Promise<MemberPost | undefined>;
  createPostComment(userId: number, data: InsertPostComment): Promise<PostComment>;
  listPostComments(postId: number): Promise<(PostComment & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]>;
  deletePostComment(id: number): Promise<void>;
  getPostComment(id: number): Promise<PostComment | undefined>;

  // Direct messages
  sendDirectMessage(senderId: number, data: InsertDirectMessage): Promise<DirectMessage>;
  listConversations(userId: number): Promise<any[]>;
  listDirectMessages(userId: number, otherUserId: number): Promise<(DirectMessage & { sender: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]>;
  markDirectMessagesRead(userId: number, senderId: number): Promise<void>;
  getUnreadDirectMessageCount(userId: number): Promise<number>;

  // Cartelera Central
  createCarteleraAnnouncement(authorId: number, data: InsertCarteleraAnnouncement): Promise<CarteleraAnnouncement>;
  listCarteleraAnnouncements(): Promise<(CarteleraAnnouncement & { author: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]>;
  getCarteleraAnnouncement(id: number): Promise<CarteleraAnnouncement | undefined>;
  updateCarteleraAnnouncement(id: number, data: UpdateCarteleraAnnouncement): Promise<CarteleraAnnouncement>;
  deleteCarteleraAnnouncement(id: number): Promise<void>;
  // Aggregation
  listAllCourseAnnouncements(): Promise<any[]>;
  listAllUpcomingSessions(): Promise<any[]>;
  listAllSchedules(): Promise<any[]>;
  getCarteleraStats(): Promise<{ totalCourses: number; totalStudents: number; totalSessions: number; activeCourses: number }>;

  // Enrollment counts
  getEnrollmentCounts(): Promise<Record<number, { total: number; approved: number; pending: number }>>;

  // Game (legacy stubs)
  getOrCreateGameProfile(userId: number): Promise<any>;
  updateGameProfile(userId: number, updates: any): Promise<any>;
  getRandomQuestion(difficulty: string, excludeIds?: number[]): Promise<any>;
  submitGameAnswer(userId: number, questionId: number, selectedAnswer: string): Promise<any>;
  getLeaderboard(limit?: number): Promise<any[]>;
  getGameMissions(userId: number): Promise<any[]>;
  progressMission(userId: number, actionType: string): Promise<void>;
  claimMissionReward(userId: number, missionId: number): Promise<any>;
  refillEnergy(userId: number): Promise<any>;

  // Story (legacy stubs)
  getStoryChapters(): Promise<any[]>;
  getStoryChapter(id: number): Promise<any>;
  getStoryActivities(chapterId: number): Promise<any[]>;
  getStoryActivity(id: number): Promise<any>;
  getUserStoryProgress(userId: number): Promise<any[]>;
  getChapterProgress(userId: number, chapterId: number): Promise<any[]>;
  saveStoryActivityProgress(userId: number, chapterId: number, activityId: number, userAnswer: string | null, isCorrect: boolean | null): Promise<any>;

  // Password reset
  createPasswordResetToken(userId: number, token: string, expiresAt: Date): Promise<void>;
  getPasswordResetToken(token: string): Promise<{ userId: number; expiresAt: Date; usedAt: Date | null } | undefined>;
  markPasswordResetTokenUsed(token: string): Promise<void>;

  // Email verification
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByVerifyToken(token: string): Promise<User | undefined>;

  // Push subscriptions
  createPushSubscription(userId: number, endpoint: string, p256dh: string, auth: string): Promise<void>;
  deletePushSubscription(endpoint: string): Promise<void>;
  getPushSubscriptionsByUser(userId: number): Promise<Array<{ id: number; endpoint: string; p256dh: string; auth: string }>>;
  getAllPushSubscriptions(): Promise<Array<{ id: number; userId: number; endpoint: string; p256dh: string; auth: string }>>;
  deletePushSubscriptionsByIds(ids: number[]): Promise<void>;

  // Certificates
  createCertificate(userId: number, courseId: number, enrollmentId: number, code: string, teacherName?: string, grade?: string): Promise<Certificate>;
  updateCertificate(id: number, updates: Partial<Pick<Certificate, 'teacherName' | 'grade' | 'studentNameOverride' | 'courseNameOverride' | 'customMessage' | 'signatureUrl' | 'issuedDateOverride'>>): Promise<Certificate | undefined>;
  getCertificate(id: number): Promise<Certificate | undefined>;
  getCertificateByCode(code: string): Promise<Certificate | undefined>;
  getCertificateByEnrollment(enrollmentId: number): Promise<Certificate | undefined>;
  listCertificatesByUser(userId: number): Promise<(Certificate & { course: { title: string } })[]>;

  // Tithes
  createTithe(data: InsertTithe & { recordedBy: number }): Promise<Tithe>;
  listTithes(filters?: { churchId?: number; regionName?: string; month?: string }): Promise<Tithe[]>;
  deleteTithe(id: number): Promise<void>;
  getTitheReport(month?: string, year?: string): Promise<any>;

  // Sermons
  createSermon(data: InsertSermon & { createdBy: number }): Promise<Sermon>;
  getSermon(id: number): Promise<Sermon | undefined>;
  listSermons(filters?: { category?: string; preacherId?: number; series?: string; search?: string }): Promise<Sermon[]>;
  updateSermon(id: number, data: UpdateSermon): Promise<Sermon | undefined>;
  deleteSermon(id: number): Promise<void>;
  createSermonNote(userId: number, data: InsertSermonNote): Promise<SermonNote>;
  listSermonNotes(sermonId: number, userId: number): Promise<SermonNote[]>;
  deleteSermonNote(id: number, userId: number): Promise<void>;

  // Small Groups
  createSmallGroup(data: InsertSmallGroup): Promise<SmallGroup>;
  getSmallGroup(id: number): Promise<SmallGroup | undefined>;
  listSmallGroups(): Promise<(SmallGroup & { leader: { username: string; displayName: string | null }; memberCount: number })[]>;
  updateSmallGroup(id: number, data: UpdateSmallGroup): Promise<SmallGroup | undefined>;
  deleteSmallGroup(id: number): Promise<void>;
  joinSmallGroup(groupId: number, userId: number): Promise<SmallGroupMember>;
  leaveSmallGroup(groupId: number, userId: number): Promise<void>;
  listSmallGroupMembers(groupId: number): Promise<(SmallGroupMember & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]>;
  createSmallGroupMeeting(data: InsertSmallGroupMeeting): Promise<SmallGroupMeeting>;
  listSmallGroupMeetings(groupId: number): Promise<SmallGroupMeeting[]>;
  sendSmallGroupMessage(userId: number, data: InsertSmallGroupMessage): Promise<SmallGroupMessage>;
  listSmallGroupMessages(groupId: number): Promise<(SmallGroupMessage & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]>;
  getUserSmallGroups(userId: number): Promise<number[]>;

  // Reports
  getReportDashboard(): Promise<any>;
  getMemberGrowthReport(): Promise<any>;
  getCourseStatsReport(): Promise<any>;
  getAttendanceReport(): Promise<any>;
  getPrayerStatsReport(): Promise<any>;
  getLibraryStatsReport(): Promise<any>;

  // Live Event Monitoring
  createLiveEventSession(data: { context: string; contextId: string; title: string; roomName: string; startedBy: number }): Promise<LiveEventSession>;
  endLiveEventSession(sessionId: number): Promise<LiveEventSession | undefined>;
  getActiveLiveSession(context: string, contextId: string): Promise<LiveEventSession | undefined>;
  trackLiveEventJoin(sessionId: number, userId: number): Promise<LiveEventAttendance>;
  trackLiveEventLeave(sessionId: number, userId: number): Promise<void>;
  getLiveEventReport(): Promise<any>;
  getLiveEventSessionDetail(sessionId: number): Promise<any>;

  // Calendar
  getCalendarEvents(start?: string, end?: string): Promise<any[]>;

  // ========== REFORMA MINISTERIAL ==========
  // Teacher Profiles
  getTeacherProfile(userId: number): Promise<TeacherProfile | undefined>;
  createTeacherProfile(userId: number, data: InsertTeacherProfile): Promise<TeacherProfile>;
  updateTeacherProfile(userId: number, data: UpdateTeacherProfile): Promise<TeacherProfile | undefined>;
  listTeacherProfiles(): Promise<(TeacherProfile & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]>;
  approveTeacherProfile(userId: number, approvedBy: number): Promise<TeacherProfile | undefined>;

  // Church Permissions
  getChurchPermissions(churchId: number): Promise<(ChurchPermission & { user: { id: number; username: string; displayName: string | null } })[]>;
  setChurchPermission(data: InsertChurchPermission, grantedBy: number): Promise<ChurchPermission>;
  removeChurchPermission(userId: number, churchId: number): Promise<void>;
  getUserChurchRole(userId: number, churchId: number): Promise<string | null>;

  // Alliance Requests
  createAllianceRequest(data: InsertAllianceRequest): Promise<AllianceRequest>;
  listAllianceRequests(): Promise<AllianceRequest[]>;
  updateAllianceRequest(id: number, data: UpdateAllianceRequest, reviewedBy: number): Promise<AllianceRequest | undefined>;

  // Member Channeling
  createMemberChanneling(userId: number, data: InsertMemberChanneling): Promise<MemberChanneling>;
  listMemberChannelings(churchId?: number): Promise<(MemberChanneling & { user: { id: number; username: string; displayName: string | null } })[]>;
  resolveMemberChanneling(id: number, status: string, resolvedBy: number): Promise<MemberChanneling | undefined>;

  // Course Teacher Assignments
  createCourseTeacherAssignment(data: InsertCourseTeacherAssignment, proposedBy: number): Promise<CourseTeacherAssignment>;
  listCourseTeacherAssignments(courseId: number): Promise<(CourseTeacherAssignment & { teacher: { id: number; username: string; displayName: string | null } })[]>;
  updateCourseTeacherAssignment(id: number, data: UpdateCourseTeacherAssignment, approvedBy: number): Promise<CourseTeacherAssignment | undefined>;

  // Audit Log
  createAuditLog(data: { userId?: number; action: string; entityType: string; entityId?: number; details?: string; ipAddress?: string }): Promise<AuditLog>;
  listAuditLogs(limit?: number): Promise<(AuditLog & { user?: { username: string; displayName: string | null } })[]>;

  // Member Progress / Badges
  awardBadge(userId: number, badgeType: string, details?: string): Promise<MemberProgressEntry>;
  getUserBadges(userId: number): Promise<MemberProgressEntry[]>;

  // Church Dashboard
  getChurchDashboard(churchId: number): Promise<{ memberCount: number; courseCount: number; eventCount: number }>;
  getChurchMembers(churchId: number): Promise<{ id: number; username: string; displayName: string | null; avatarUrl: string | null; memberType: string | null; role: string }[]>;
}
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(ilike(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: UpdateUser): Promise<User> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateUserRole(id: number, role: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async listUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async listPendingUsers(): Promise<User[]> {
    return await db.select().from(users).where(eq(users.isActive, false)).orderBy(desc(users.createdAt));
  }

  async toggleUserActive(id: number): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    const [updatedUser] = await db
      .update(users)
      .set({ isActive: !user.isActive })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    await db.delete(postComments).where(eq(postComments.userId, id));
    await db.delete(directMessages).where(or(eq(directMessages.senderId, id), eq(directMessages.receiverId, id)));
    await db.delete(enrollments).where(eq(enrollments.userId, id));
    // Delete comments on user's posts first
    const userPosts = await db.select({ id: memberPosts.id }).from(memberPosts).where(eq(memberPosts.userId, id));
    if (userPosts.length > 0) {
      const postIds = userPosts.map(p => p.id);
      await db.delete(postComments).where(inArray(postComments.postId, postIds));
    }
    await db.delete(memberPosts).where(eq(memberPosts.userId, id));
    await db.delete(users).where(eq(users.id, id));
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async listMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  }

  async toggleMessageRead(id: number): Promise<Message | undefined> {
    const [msg] = await db.select().from(messages).where(eq(messages.id, id));
    if (!msg) return undefined;
    const [updated] = await db
      .update(messages)
      .set({ isRead: !msg.isRead })
      .where(eq(messages.id, id))
      .returning();
    return updated;
  }

  async deleteMessage(id: number): Promise<void> {
    await db.delete(messages).where(eq(messages.id, id));
  }

  async createMemberPost(userId: number, content: string, imageUrl?: string | null, attachment?: { fileUrl?: string | null; fileName?: string | null; fileSize?: number | null; fileMime?: string | null }): Promise<MemberPost> {
    const [post] = await db.insert(memberPosts).values({
      userId,
      content,
      imageUrl: imageUrl || null,
      fileUrl: attachment?.fileUrl || null,
      fileName: attachment?.fileName || null,
      fileSize: attachment?.fileSize ?? null,
      fileMime: attachment?.fileMime || null,
    }).returning();
    return post;
  }

  async getMemberPost(id: number): Promise<MemberPost | undefined> {
    const [post] = await db.select().from(memberPosts).where(eq(memberPosts.id, id));
    return post;
  }

  async listMemberPosts(): Promise<(MemberPost & { user: { username: string; displayName: string | null; avatarUrl: string | null; cargo: string | null; country: string | null }; commentCount: number })[]> {
    const posts = await db
      .select({
        id: memberPosts.id,
        userId: memberPosts.userId,
        content: memberPosts.content,
        imageUrl: memberPosts.imageUrl,
        fileUrl: memberPosts.fileUrl,
        fileName: memberPosts.fileName,
        fileSize: memberPosts.fileSize,
        fileMime: memberPosts.fileMime,
        createdAt: memberPosts.createdAt,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
        cargo: users.cargo,
        country: users.country,
        commentCount: sql<number>`(SELECT count(*)::int FROM post_comments WHERE post_id = ${memberPosts.id})`,
      })
      .from(memberPosts)
      .innerJoin(users, eq(memberPosts.userId, users.id))
      .orderBy(desc(memberPosts.createdAt))
      .limit(100); // la comunidad muestra las más recientes; sin límite crecía sin fin
    return posts.map((p) => ({
      id: p.id,
      userId: p.userId,
      content: p.content,
      imageUrl: p.imageUrl,
      fileUrl: p.fileUrl,
      fileName: p.fileName,
      fileSize: p.fileSize,
      fileMime: p.fileMime,
      createdAt: p.createdAt,
      user: { username: p.username, displayName: p.displayName, avatarUrl: p.avatarUrl, cargo: p.cargo, country: p.country },
      commentCount: p.commentCount,
    }));
  }

  async deleteMemberPost(id: number): Promise<void> {
    // Delete comments first
    await db.delete(postComments).where(eq(postComments.postId, id));
    await db.delete(memberPosts).where(eq(memberPosts.id, id));
  }

  // ========== COMENTARIOS EN PUBLICACIONES ==========

  async createPostComment(userId: number, data: InsertPostComment): Promise<PostComment> {
    const [created] = await db.insert(postComments).values({
      postId: data.postId,
      userId,
      content: data.content,
    }).returning();
    return created;
  }

  async listPostComments(postId: number): Promise<(PostComment & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]> {
    const rows = await db
      .select({
        id: postComments.id,
        postId: postComments.postId,
        userId: postComments.userId,
        content: postComments.content,
        createdAt: postComments.createdAt,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      })
      .from(postComments)
      .innerJoin(users, eq(postComments.userId, users.id))
      .where(eq(postComments.postId, postId))
      .orderBy(postComments.createdAt);
    return rows.map((c) => ({
      id: c.id,
      postId: c.postId,
      userId: c.userId,
      content: c.content,
      createdAt: c.createdAt,
      user: { id: c.userId, username: c.username, displayName: c.displayName, avatarUrl: c.avatarUrl },
    }));
  }

  async getPostComment(id: number): Promise<PostComment | undefined> {
    const [comment] = await db.select().from(postComments).where(eq(postComments.id, id));
    return comment;
  }

  async deletePostComment(id: number): Promise<void> {
    await db.delete(postComments).where(eq(postComments.id, id));
  }

  async createEvent(event: InsertEvent & { createdBy: number }): Promise<Event> {
    const [created] = await db.insert(events).values({
      title: event.title,
      description: event.description,
      eventDate: new Date(event.eventDate),
      eventEndDate: event.eventEndDate ? new Date(event.eventEndDate) : null,
      location: event.location,
      meetingUrl: event.meetingUrl || null,
      meetingPlatform: event.meetingPlatform || null,
      imageUrl: event.imageUrl || null,
      isPublished: event.isPublished ?? true,
      createdBy: event.createdBy,
    }).returning();
    return created;
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async listEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(desc(events.eventDate));
  }

  async listPublishedEvents(): Promise<Event[]> {
    return await db.select().from(events).where(eq(events.isPublished, true)).orderBy(desc(events.eventDate));
  }

  async updateEvent(id: number, updates: UpdateEvent): Promise<Event | undefined> {
    const updateData: any = { ...updates };
    if (updates.eventDate) updateData.eventDate = new Date(updates.eventDate);
    if (updates.eventEndDate) updateData.eventEndDate = new Date(updates.eventEndDate);
    if (updates.eventEndDate === null) updateData.eventEndDate = null;
    const [updated] = await db
      .update(events)
      .set(updateData)
      .where(eq(events.id, id))
      .returning();
    return updated;
  }

  async deleteEvent(id: number): Promise<void> {
    // Delete RSVPs first
    await db.delete(eventRsvps).where(eq(eventRsvps.eventId, id));
    await db.delete(events).where(eq(events.id, id));
  }

  async upsertEventRsvp(eventId: number, userId: number, data: InsertEventRsvp): Promise<EventRsvp> {
    // Check if RSVP already exists
    const [existing] = await db.select().from(eventRsvps)
      .where(and(eq(eventRsvps.eventId, eventId), eq(eventRsvps.userId, userId)));
    
    if (existing) {
      const [updated] = await db.update(eventRsvps)
        .set({ status: data.status || "confirmado", reminder: data.reminder ?? true })
        .where(eq(eventRsvps.id, existing.id))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(eventRsvps).values({
      eventId,
      userId,
      status: data.status || "confirmado",
      reminder: data.reminder ?? true,
    }).returning();
    return created;
  }

  async getEventRsvp(eventId: number, userId: number): Promise<EventRsvp | undefined> {
    const [rsvp] = await db.select().from(eventRsvps)
      .where(and(eq(eventRsvps.eventId, eventId), eq(eventRsvps.userId, userId)));
    return rsvp;
  }

  async listEventRsvps(eventId: number): Promise<(EventRsvp & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]> {
    const rows = await db
      .select({
        id: eventRsvps.id,
        eventId: eventRsvps.eventId,
        userId: eventRsvps.userId,
        status: eventRsvps.status,
        reminder: eventRsvps.reminder,
        createdAt: eventRsvps.createdAt,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      })
      .from(eventRsvps)
      .innerJoin(users, eq(eventRsvps.userId, users.id))
      .where(eq(eventRsvps.eventId, eventId))
      .orderBy(desc(eventRsvps.createdAt));
    
    return rows.map(r => ({
      id: r.id,
      eventId: r.eventId,
      userId: r.userId,
      status: r.status,
      reminder: r.reminder,
      createdAt: r.createdAt,
      user: { id: r.userId, username: r.username, displayName: r.displayName, avatarUrl: r.avatarUrl },
    }));
  }

  async cancelEventRsvp(eventId: number, userId: number): Promise<void> {
    await db.delete(eventRsvps)
      .where(and(eq(eventRsvps.eventId, eventId), eq(eventRsvps.userId, userId)));
  }

  async getEventRsvpCount(eventId: number): Promise<number> {
    const [result] = await db.select({ count: sql<number>`count(*)::int` })
      .from(eventRsvps)
      .where(and(eq(eventRsvps.eventId, eventId), eq(eventRsvps.status, "confirmado")));
    return result?.count || 0;
  }

  async getSiteContent(key: string): Promise<SiteContent | undefined> {
    const [content] = await db.select().from(siteContent).where(eq(siteContent.sectionKey, key));
    return content;
  }

  async listSiteContent(): Promise<SiteContent[]> {
    return await db.select().from(siteContent).orderBy(siteContent.sectionKey);
  }

  async upsertSiteContent(key: string, data: UpdateSiteContent, updatedBy: number): Promise<SiteContent> {
    const existing = await this.getSiteContent(key);
    if (existing) {
      const [updated] = await db
        .update(siteContent)
        .set({ ...data, updatedAt: new Date(), updatedBy })
        .where(eq(siteContent.sectionKey, key))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(siteContent).values({
        sectionKey: key,
        ...data,
        updatedBy,
      }).returning();
      return created;
    }
  }

  async createCourse(course: InsertCourse & { createdBy: number }): Promise<Course> {
    const [created] = await db.insert(courses).values({
      title: course.title,
      description: course.description,
      category: course.category || "general",
      imageUrl: course.imageUrl || null,
      isActive: course.isActive ?? true,
      maxStudents: course.maxStudents || null,
      teacherId: course.teacherId || null,
      createdBy: course.createdBy,
      enrollmentStatus: course.enrollmentStatus || "open",
      enrollmentOpenDate: course.enrollmentOpenDate ? new Date(course.enrollmentOpenDate) : null,
      enrollmentCloseDate: course.enrollmentCloseDate ? new Date(course.enrollmentCloseDate) : null,
    }).returning();
    return created;
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async listCourses(): Promise<Course[]> {
    return await db.select().from(courses).orderBy(desc(courses.createdAt));
  }

  async listActiveCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isActive, true)).orderBy(desc(courses.createdAt));
  }

  async listCoursesByTeacher(teacherId: number): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.teacherId, teacherId)).orderBy(desc(courses.createdAt));
  }

  async searchCourses(query: string, category?: string): Promise<Course[]> {
    const conditions = [eq(courses.isActive, true)];
    if (category && category !== "all") {
      conditions.push(eq(courses.category, category));
    }
    if (query) {
      conditions.push(
        or(
          ilike(courses.title, `%${query}%`),
          ilike(courses.description, `%${query}%`),
        )!
      );
    }
    return await db.select().from(courses).where(and(...conditions)).orderBy(desc(courses.createdAt));
  }

  async updateCourse(id: number, updates: UpdateCourse): Promise<Course | undefined> {
    const updateData: any = { ...updates };
    if (updates.enrollmentOpenDate !== undefined) {
      updateData.enrollmentOpenDate = updates.enrollmentOpenDate ? new Date(updates.enrollmentOpenDate as string) : null;
    }
    if (updates.enrollmentCloseDate !== undefined) {
      updateData.enrollmentCloseDate = updates.enrollmentCloseDate ? new Date(updates.enrollmentCloseDate as string) : null;
    }
    const [updated] = await db
      .update(courses)
      .set(updateData)
      .where(eq(courses.id, id))
      .returning();
    return updated;
  }

  async deleteCourse(id: number): Promise<void> {
    // Soft-delete: deactivate and close enrollment instead of destroying data
    // This preserves enrollments, certificates, and student achievements
    const hasCertificates = await db.select({ id: certificates.id }).from(certificates).where(eq(certificates.courseId, id)).limit(1);
    const hasCompletedEnrollments = await db.select({ id: enrollments.id }).from(enrollments).where(and(eq(enrollments.courseId, id), or(eq(enrollments.status, "completado"), eq(enrollments.status, "aprobado")))).limit(1);

    if (hasCertificates.length > 0 || hasCompletedEnrollments.length > 0) {
      // Soft delete: keep data, just deactivate
      await db.update(courses).set({ isActive: false, enrollmentStatus: "closed" }).where(eq(courses.id, id));
    } else {
      // No completions or certificates — safe to hard delete
      await db.delete(enrollments).where(eq(enrollments.courseId, id));
      await db.delete(courseMaterials).where(eq(courseMaterials.courseId, id));
      await db.delete(courseSessions).where(eq(courseSessions.courseId, id));
      // Also clean announcements and schedule
      await db.delete(courseAnnouncements).where(eq(courseAnnouncements.courseId, id));
      await db.delete(courseSchedule).where(eq(courseSchedule.courseId, id));
      await db.delete(courses).where(eq(courses.id, id));
    }
  }

  async createCourseMaterial(material: InsertCourseMaterial): Promise<CourseMaterial> {
    const [created] = await db.insert(courseMaterials).values(material).returning();
    return created;
  }

  async listCourseMaterials(courseId: number): Promise<CourseMaterial[]> {
    return await db.select().from(courseMaterials)
      .where(eq(courseMaterials.courseId, courseId))
      .orderBy(courseMaterials.sortOrder);
  }

  async updateCourseMaterial(id: number, updates: UpdateCourseMaterial): Promise<CourseMaterial | undefined> {
    const [updated] = await db
      .update(courseMaterials)
      .set(updates)
      .where(eq(courseMaterials.id, id))
      .returning();
    return updated;
  }

  async deleteCourseMaterial(id: number): Promise<void> {
    await db.delete(courseMaterials).where(eq(courseMaterials.id, id));
  }

  async createCourseSession(session: InsertCourseSession): Promise<CourseSession> {
    const [created] = await db.insert(courseSessions).values({
      courseId: session.courseId,
      title: session.title,
      description: session.description || null,
      sessionDate: new Date(session.sessionDate),
      duration: session.duration || null,
      meetingUrl: session.meetingUrl || null,
      meetingPlatform: session.meetingPlatform || "zoom",
    }).returning();
    return created;
  }

  async listCourseSessions(courseId: number): Promise<CourseSession[]> {
    return await db.select().from(courseSessions)
      .where(eq(courseSessions.courseId, courseId))
      .orderBy(courseSessions.sessionDate);
  }

  async updateCourseSession(id: number, updates: UpdateCourseSession): Promise<CourseSession | undefined> {
    const updateData: any = { ...updates };
    if (updates.sessionDate) updateData.sessionDate = new Date(updates.sessionDate);
    const [updated] = await db
      .update(courseSessions)
      .set(updateData)
      .where(eq(courseSessions.id, id))
      .returning();
    return updated;
  }

  async deleteCourseSession(id: number): Promise<void> {
    await db.delete(courseSessions).where(eq(courseSessions.id, id));
  }

  async createEnrollment(userId: number, courseId: number): Promise<Enrollment> {
    const [created] = await db.insert(enrollments).values({
      userId,
      courseId,
      status: "solicitado",
    }).returning();
    return created;
  }

  async getEnrollment(id: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db.select().from(enrollments).where(eq(enrollments.id, id));
    return enrollment;
  }

  async getEnrollmentByUserAndCourse(userId: number, courseId: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db.select().from(enrollments)
      .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
    return enrollment;
  }

  async listEnrollmentsByUser(userId: number): Promise<(Enrollment & { course: Course })[]> {
    const rows = await db
      .select({
        id: enrollments.id,
        userId: enrollments.userId,
        courseId: enrollments.courseId,
        status: enrollments.status,
        grade: enrollments.grade,
        observations: enrollments.observations,
        enrolledAt: enrollments.enrolledAt,
        completedAt: enrollments.completedAt,
        courseTitle: courses.title,
        courseDescription: courses.description,
        courseCategory: courses.category,
        courseImageUrl: courses.imageUrl,
        courseIsActive: courses.isActive,
        courseMaxStudents: courses.maxStudents,
        courseTeacherId: courses.teacherId,
        courseCreatedBy: courses.createdBy,
        courseCreatedAt: courses.createdAt,
        enrollmentStatus: courses.enrollmentStatus,
        enrollmentOpenDate: courses.enrollmentOpenDate,
        enrollmentCloseDate: courses.enrollmentCloseDate,
        courseChurchId: courses.churchId,
        courseType: courses.courseType,
        coursePrerequisiteCourseId: courses.prerequisiteCourseId,
        courseIsPublic: courses.isPublic,
        courseLevel: courses.level,
      })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.userId, userId))
      .orderBy(desc(enrollments.enrolledAt));

    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      courseId: r.courseId,
      status: r.status,
      grade: r.grade,
      observations: r.observations,
      enrolledAt: r.enrolledAt,
      completedAt: r.completedAt,
      course: {
        id: r.courseId,
        title: r.courseTitle,
        description: r.courseDescription,
        category: r.courseCategory,
        imageUrl: r.courseImageUrl,
        isActive: r.courseIsActive,
        maxStudents: r.courseMaxStudents,
        teacherId: r.courseTeacherId,
        createdBy: r.courseCreatedBy,
        createdAt: r.courseCreatedAt,
        enrollmentStatus: r.enrollmentStatus,
        enrollmentOpenDate: r.enrollmentOpenDate,
        enrollmentCloseDate: r.enrollmentCloseDate,
        churchId: r.courseChurchId,
        courseType: r.courseType,
        prerequisiteCourseId: r.coursePrerequisiteCourseId,
        isPublic: r.courseIsPublic,
        level: r.courseLevel,
      },
    }));
  }

  async listEnrollmentsByCourse(courseId: number): Promise<(Enrollment & { user: { id: number; username: string; displayName: string | null; role: string } })[]> {
    const rows = await db
      .select({
        id: enrollments.id,
        userId: enrollments.userId,
        courseId: enrollments.courseId,
        status: enrollments.status,
        grade: enrollments.grade,
        observations: enrollments.observations,
        enrolledAt: enrollments.enrolledAt,
        completedAt: enrollments.completedAt,
        username: users.username,
        displayName: users.displayName,
        userRole: users.role,
        avatarUrl: users.avatarUrl,
        email: users.email,
        country: users.country,
        cargo: users.cargo,
      })
      .from(enrollments)
      .innerJoin(users, eq(enrollments.userId, users.id))
      .where(eq(enrollments.courseId, courseId))
      .orderBy(desc(enrollments.enrolledAt));

    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      courseId: r.courseId,
      status: r.status,
      grade: r.grade,
      observations: r.observations,
      enrolledAt: r.enrolledAt,
      completedAt: r.completedAt,
      user: { id: r.userId, username: r.username, displayName: r.displayName, role: r.userRole, avatarUrl: r.avatarUrl || null, email: r.email || null, country: r.country || null, cargo: r.cargo || null },
    }));
  }

  async getCertificateByEnrollment(enrollmentId: number): Promise<Certificate | undefined> {
    const [cert] = await db.select().from(certificates).where(eq(certificates.enrollmentId, enrollmentId));
    return cert;
  }

  async updateEnrollment(id: number, updates: UpdateEnrollment): Promise<Enrollment | undefined> {
    const updateData: any = { ...updates };
    if (updates.status === "completado") {
      updateData.completedAt = new Date();
    }
    if (updates.status === "aprobado") {
      updateData.completedAt = null;
    }
    const [updated] = await db
      .update(enrollments)
      .set(updateData)
      .where(eq(enrollments.id, id))
      .returning();
    return updated;
  }

  async deleteEnrollment(id: number): Promise<void> {
    await db.delete(enrollments).where(eq(enrollments.id, id));
  }

  async createTeacherRequest(userId: number, courseId: number, message?: string | null): Promise<TeacherRequest> {
    const [request] = await db.insert(teacherRequests).values({ userId, courseId, message }).returning();
    return request;
  }

  async getTeacherRequestByUserAndCourse(userId: number, courseId: number): Promise<TeacherRequest | undefined> {
    const [request] = await db.select().from(teacherRequests).where(and(eq(teacherRequests.userId, userId), eq(teacherRequests.courseId, courseId)));
    return request;
  }

  async listTeacherRequests(): Promise<(TeacherRequest & { user: { id: number; username: string; displayName: string | null; role: string }; course: { id: number; title: string } })[]> {
    const rows = await db
      .select({
        id: teacherRequests.id,
        userId: teacherRequests.userId,
        courseId: teacherRequests.courseId,
        status: teacherRequests.status,
        message: teacherRequests.message,
        createdAt: teacherRequests.createdAt,
        username: users.username,
        displayName: users.displayName,
        userRole: users.role,
        courseTitle: courses.title,
      })
      .from(teacherRequests)
      .innerJoin(users, eq(teacherRequests.userId, users.id))
      .innerJoin(courses, eq(teacherRequests.courseId, courses.id))
      .orderBy(desc(teacherRequests.createdAt));

    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      courseId: r.courseId,
      status: r.status,
      message: r.message,
      createdAt: r.createdAt,
      user: { id: r.userId, username: r.username, displayName: r.displayName, role: r.userRole },
      course: { id: r.courseId, title: r.courseTitle },
    }));
  }

  async listTeacherRequestsByUser(userId: number): Promise<(TeacherRequest & { course: Course })[]> {
    const rows = await db
      .select()
      .from(teacherRequests)
      .innerJoin(courses, eq(teacherRequests.courseId, courses.id))
      .where(eq(teacherRequests.userId, userId))
      .orderBy(desc(teacherRequests.createdAt));

    return rows.map((r) => ({
      ...r.teacher_requests,
      course: r.courses,
    }));
  }

  async updateTeacherRequest(id: number, updates: UpdateTeacherRequest): Promise<TeacherRequest | undefined> {
    const [updated] = await db.update(teacherRequests).set(updates).where(eq(teacherRequests.id, id)).returning();
    return updated;
  }

  async deleteTeacherRequest(id: number): Promise<void> {
    await db.delete(teacherRequests).where(eq(teacherRequests.id, id));
  }

  async createCourseAnnouncement(data: InsertCourseAnnouncement & { authorId: number }): Promise<CourseAnnouncement> {
    const [created] = await db.insert(courseAnnouncements).values({
      courseId: data.courseId,
      authorId: data.authorId,
      title: data.title,
      content: data.content,
      isPinned: data.isPinned ?? false,
      fileUrl: data.fileUrl || null,
      fileName: data.fileName || null,
      fileSize: data.fileSize || null,
      fileData: data.fileData || null,
    }).returning();
    return created;
  }

  async listCourseAnnouncements(courseId: number): Promise<(CourseAnnouncement & { author: { username: string; displayName: string | null } })[]> {
    const rows = await db
      .select({
        id: courseAnnouncements.id,
        courseId: courseAnnouncements.courseId,
        authorId: courseAnnouncements.authorId,
        title: courseAnnouncements.title,
        content: courseAnnouncements.content,
        isPinned: courseAnnouncements.isPinned,
        fileUrl: courseAnnouncements.fileUrl,
        fileName: courseAnnouncements.fileName,
        fileSize: courseAnnouncements.fileSize,
        fileData: courseAnnouncements.fileData,
        createdAt: courseAnnouncements.createdAt,
        username: users.username,
        displayName: users.displayName,
      })
      .from(courseAnnouncements)
      .innerJoin(users, eq(courseAnnouncements.authorId, users.id))
      .where(eq(courseAnnouncements.courseId, courseId))
      .orderBy(desc(courseAnnouncements.isPinned), desc(courseAnnouncements.createdAt));

    return rows.map((r) => ({
      id: r.id,
      courseId: r.courseId,
      authorId: r.authorId,
      title: r.title,
      content: r.content,
      isPinned: r.isPinned,
      fileUrl: r.fileUrl,
      fileName: r.fileName,
      fileSize: r.fileSize,
      fileData: r.fileData,
      createdAt: r.createdAt,
      author: { username: r.username, displayName: r.displayName },
    }));
  }

  async updateCourseAnnouncement(id: number, updates: UpdateCourseAnnouncement): Promise<CourseAnnouncement | undefined> {
    const [updated] = await db.update(courseAnnouncements).set(updates).where(eq(courseAnnouncements.id, id)).returning();
    return updated;
  }

  async deleteCourseAnnouncement(id: number): Promise<void> {
    await db.delete(courseAnnouncements).where(eq(courseAnnouncements.id, id));
  }

  // Cartelera Central implementations
  async createCarteleraAnnouncement(authorId: number, data: InsertCarteleraAnnouncement): Promise<CarteleraAnnouncement> {
    const [created] = await db.insert(carteleraAnnouncements).values({
      authorId,
      title: data.title,
      content: data.content,
      category: data.category || "general",
      isPinned: data.isPinned ?? false,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      fileUrl: data.fileUrl || null,
      fileName: data.fileName || null,
      fileSize: data.fileSize || null,
      fileData: data.fileData || null,
    }).returning();
    return created;
  }

  async listCarteleraAnnouncements(): Promise<(CarteleraAnnouncement & { author: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]> {
    const rows = await db
      .select({
        id: carteleraAnnouncements.id,
        authorId: carteleraAnnouncements.authorId,
        title: carteleraAnnouncements.title,
        content: carteleraAnnouncements.content,
        category: carteleraAnnouncements.category,
        isPinned: carteleraAnnouncements.isPinned,
        expiresAt: carteleraAnnouncements.expiresAt,
        fileUrl: carteleraAnnouncements.fileUrl,
        fileName: carteleraAnnouncements.fileName,
        fileSize: carteleraAnnouncements.fileSize,
        fileData: carteleraAnnouncements.fileData,
        createdAt: carteleraAnnouncements.createdAt,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      })
      .from(carteleraAnnouncements)
      .innerJoin(users, eq(carteleraAnnouncements.authorId, users.id))
      .orderBy(desc(carteleraAnnouncements.isPinned), desc(carteleraAnnouncements.createdAt));

    return rows.map((r) => ({
      id: r.id,
      authorId: r.authorId,
      title: r.title,
      content: r.content,
      category: r.category,
      isPinned: r.isPinned,
      expiresAt: r.expiresAt,
      fileUrl: r.fileUrl,
      fileName: r.fileName,
      fileSize: r.fileSize,
      fileData: r.fileData,
      createdAt: r.createdAt,
      author: { id: r.authorId, username: r.username, displayName: r.displayName, avatarUrl: r.avatarUrl },
    }));
  }

  async getCarteleraAnnouncement(id: number): Promise<CarteleraAnnouncement | undefined> {
    const [ann] = await db.select().from(carteleraAnnouncements).where(eq(carteleraAnnouncements.id, id));
    return ann;
  }

  async updateCarteleraAnnouncement(id: number, updates: UpdateCarteleraAnnouncement): Promise<CarteleraAnnouncement> {
    const setData: any = { ...updates };
    if (typeof setData.expiresAt === "string") {
      setData.expiresAt = setData.expiresAt ? new Date(setData.expiresAt) : null;
    }
    const [updated] = await db.update(carteleraAnnouncements).set(setData).where(eq(carteleraAnnouncements.id, id)).returning();
    return updated;
  }

  async deleteCarteleraAnnouncement(id: number): Promise<void> {
    await db.delete(carteleraAnnouncements).where(eq(carteleraAnnouncements.id, id));
  }

  // Aggregation helpers used by Cartelera central
  async listAllCourseAnnouncements(): Promise<any[]> {
    const rows = await db
      .select({
        id: courseAnnouncements.id,
        courseId: courseAnnouncements.courseId,
        title: courseAnnouncements.title,
        content: courseAnnouncements.content,
        isPinned: courseAnnouncements.isPinned,
        fileUrl: courseAnnouncements.fileUrl,
        fileName: courseAnnouncements.fileName,
        fileSize: courseAnnouncements.fileSize,
        createdAt: courseAnnouncements.createdAt,
        courseTitle: courses.title,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      })
      .from(courseAnnouncements)
      .innerJoin(courses, eq(courseAnnouncements.courseId, courses.id))
      .innerJoin(users, eq(courseAnnouncements.authorId, users.id))
      .orderBy(desc(courseAnnouncements.isPinned), desc(courseAnnouncements.createdAt));

    return rows.map((r) => ({
      id: r.id,
      courseId: r.courseId,
      title: r.title,
      content: r.content,
      isPinned: r.isPinned,
      fileUrl: r.fileUrl,
      fileName: r.fileName,
      fileSize: r.fileSize,
      createdAt: r.createdAt,
      courseName: r.courseTitle,
      author: { username: r.username, displayName: r.displayName, avatarUrl: r.avatarUrl },
    }));
  }

  async listAllUpcomingSessions(): Promise<any[]> {
    const rows = await db
      .select({
        id: courseSessions.id,
        courseId: courseSessions.courseId,
        title: courseSessions.title,
        description: courseSessions.description,
        sessionDate: courseSessions.sessionDate,
        duration: courseSessions.duration,
        isCompleted: courseSessions.isCompleted,
        meetingUrl: courseSessions.meetingUrl,
        meetingPlatform: courseSessions.meetingPlatform,
        courseTitle: courses.title,
      })
      .from(courseSessions)
      .innerJoin(courses, eq(courseSessions.courseId, courses.id))
      .orderBy(desc(courseSessions.sessionDate));

    return rows.map((r) => ({
      id: r.id,
      courseId: r.courseId,
      title: r.title,
      description: r.description,
      startTime: r.sessionDate,
      endTime: null,
      status: r.isCompleted ? "completada" : "pendiente",
      meetingUrl: r.meetingUrl,
      meetingPlatform: r.meetingPlatform,
      courseName: r.courseTitle,
    }));
  }

  async listAllSchedules(): Promise<any[]> {
    const rows = await db
      .select({
        id: courseSchedule.id,
        courseId: courseSchedule.courseId,
        dayOfWeek: courseSchedule.dayOfWeek,
        startTime: courseSchedule.startTime,
        endTime: courseSchedule.endTime,
        specificDate: courseSchedule.specificDate,
        meetingUrl: courseSchedule.meetingUrl,
        meetingPlatform: courseSchedule.meetingPlatform,
        description: courseSchedule.description,
        courseTitle: courses.title,
      })
      .from(courseSchedule)
      .innerJoin(courses, eq(courseSchedule.courseId, courses.id))
      .orderBy(courseSchedule.dayOfWeek, courseSchedule.startTime);

    return rows.map((r) => ({
      id: r.id,
      courseId: r.courseId,
      dayOfWeek: r.dayOfWeek,
      startTime: r.startTime,
      endTime: r.endTime,
      specificDate: r.specificDate,
      meetingUrl: r.meetingUrl,
      meetingPlatform: r.meetingPlatform,
      description: r.description,
      courseName: r.courseTitle,
    }));
  }

  async getCarteleraStats(): Promise<{ totalCourses: number; totalStudents: number; totalSessions: number; activeCourses: number }> {
    const [[{ totalCourses }], [{ totalStudents }], [{ totalSessions }], [{ activeCourses }]] = await Promise.all([
      db.select({ totalCourses: sql<number>`count(*)::int` }).from(courses),
      db.select({ totalStudents: sql<number>`count(*)::int` }).from(enrollments),
      db.select({ totalSessions: sql<number>`count(*)::int` }).from(courseSessions),
      db.select({ activeCourses: sql<number>`count(*)::int` }).from(courses).where(eq(courses.isActive, true)),
    ]);
    return { totalCourses, totalStudents, totalSessions, activeCourses };
  }

  async createCourseScheduleEntry(data: InsertCourseSchedule): Promise<CourseScheduleEntry> {
    const [created] = await db.insert(courseSchedule).values({
      courseId: data.courseId,
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      specificDate: data.specificDate || null,
      meetingUrl: data.meetingUrl || null,
      meetingPlatform: data.meetingPlatform || "zoom",
      description: data.description || null,
      isActive: data.isActive ?? true,
    }).returning();
    return created;
  }

  async listCourseSchedule(courseId: number): Promise<CourseScheduleEntry[]> {
    return await db.select().from(courseSchedule)
      .where(eq(courseSchedule.courseId, courseId))
      .orderBy(courseSchedule.dayOfWeek);
  }

  async updateCourseScheduleEntry(id: number, updates: UpdateCourseSchedule): Promise<CourseScheduleEntry | undefined> {
    const [updated] = await db.update(courseSchedule).set(updates).where(eq(courseSchedule.id, id)).returning();
    return updated;
  }

  async deleteCourseScheduleEntry(id: number): Promise<void> {
    await db.delete(courseSchedule).where(eq(courseSchedule.id, id));
  }

  async upsertSessionAttendance(data: InsertSessionAttendance): Promise<SessionAttendance> {
    const existing = await db.select().from(sessionAttendance)
      .where(and(eq(sessionAttendance.sessionId, data.sessionId), eq(sessionAttendance.userId, data.userId)));
    if (existing.length > 0) {
      const [updated] = await db.update(sessionAttendance)
        .set({ status: data.status || "presente" })
        .where(eq(sessionAttendance.id, existing[0].id))
        .returning();
      return updated;
    }
    const [created] = await db.insert(sessionAttendance).values({
      sessionId: data.sessionId,
      userId: data.userId,
      status: data.status || "presente",
    }).returning();
    return created;
  }

  async listSessionAttendance(sessionId: number): Promise<(SessionAttendance & { user: { id: number; username: string; displayName: string | null } })[]> {
    const rows = await db
      .select({
        id: sessionAttendance.id,
        sessionId: sessionAttendance.sessionId,
        userId: sessionAttendance.userId,
        status: sessionAttendance.status,
        createdAt: sessionAttendance.createdAt,
        username: users.username,
        displayName: users.displayName,
      })
      .from(sessionAttendance)
      .innerJoin(users, eq(sessionAttendance.userId, users.id))
      .where(eq(sessionAttendance.sessionId, sessionId));

    return rows.map((r) => ({
      id: r.id,
      sessionId: r.sessionId,
      userId: r.userId,
      status: r.status,
      createdAt: r.createdAt,
      user: { id: r.userId, username: r.username, displayName: r.displayName },
    }));
  }

  async listPostsByUser(userId: number): Promise<MemberPost[]> {
    return await db.select().from(memberPosts).where(eq(memberPosts.userId, userId)).orderBy(desc(memberPosts.createdAt));
  }

  async listAttendanceByUser(userId: number): Promise<SessionAttendance[]> {
    return await db.select().from(sessionAttendance).where(eq(sessionAttendance.userId, userId)).orderBy(desc(sessionAttendance.createdAt));
  }

  // ========== BIBLIOTECA ==========

  async createBibleHighlight(userId: number, data: InsertBibleHighlight): Promise<BibleHighlight> {
    const [created] = await db.insert(bibleHighlights).values({ ...data, userId }).returning();
    return created;
  }

  async listBibleHighlights(userId: number, book?: string, chapter?: number): Promise<BibleHighlight[]> {
    const conditions = [eq(bibleHighlights.userId, userId)];
    if (book) conditions.push(eq(bibleHighlights.book, book));
    if (chapter !== undefined) conditions.push(eq(bibleHighlights.chapter, chapter));
    return await db.select().from(bibleHighlights).where(and(...conditions)).orderBy(bibleHighlights.verseStart);
  }

  async deleteBibleHighlight(id: number, userId: number): Promise<void> {
    await db.delete(bibleHighlights).where(and(eq(bibleHighlights.id, id), eq(bibleHighlights.userId, userId)));
  }

  async createBibleNote(userId: number, data: InsertBibleNote): Promise<BibleNote> {
    const [created] = await db.insert(bibleNotes).values({ ...data, userId }).returning();
    return created;
  }

  async listBibleNotes(userId: number, book?: string, chapter?: number): Promise<BibleNote[]> {
    const conditions = [eq(bibleNotes.userId, userId)];
    if (book) conditions.push(eq(bibleNotes.book, book));
    if (chapter !== undefined) conditions.push(eq(bibleNotes.chapter, chapter));
    return await db.select().from(bibleNotes).where(and(...conditions)).orderBy(bibleNotes.verse);
  }

  async updateBibleNote(id: number, userId: number, content: string): Promise<BibleNote | undefined> {
    const [updated] = await db.update(bibleNotes).set({ content })
      .where(and(eq(bibleNotes.id, id), eq(bibleNotes.userId, userId))).returning();
    return updated;
  }

  async deleteBibleNote(id: number, userId: number): Promise<void> {
    await db.delete(bibleNotes).where(and(eq(bibleNotes.id, id), eq(bibleNotes.userId, userId)));
  }

  async createReadingPlan(userId: number, data: InsertReadingPlan): Promise<ReadingPlan> {
    const [created] = await db.insert(readingPlans).values({ ...data, userId }).returning();
    return created;
  }

  async getReadingPlan(id: number): Promise<ReadingPlan | undefined> {
    const [plan] = await db.select().from(readingPlans).where(eq(readingPlans.id, id));
    return plan;
  }

  async listReadingPlans(userId: number): Promise<ReadingPlan[]> {
    return await db.select().from(readingPlans).where(eq(readingPlans.userId, userId)).orderBy(desc(readingPlans.createdAt));
  }

  async listPublicReadingPlans(): Promise<(ReadingPlan & { user: { username: string; displayName: string | null } })[]> {
    const rows = await db
      .select({
        id: readingPlans.id, userId: readingPlans.userId, title: readingPlans.title,
        description: readingPlans.description, isPublic: readingPlans.isPublic, createdAt: readingPlans.createdAt,
        username: users.username, displayName: users.displayName,
      })
      .from(readingPlans)
      .innerJoin(users, eq(readingPlans.userId, users.id))
      .where(eq(readingPlans.isPublic, true))
      .orderBy(desc(readingPlans.createdAt));
    return rows.map(r => ({
      id: r.id, userId: r.userId, title: r.title, description: r.description,
      isPublic: r.isPublic, createdAt: r.createdAt,
      user: { username: r.username, displayName: r.displayName },
    }));
  }

  async deleteReadingPlan(id: number): Promise<void> {
    await db.delete(readingPlanItems).where(eq(readingPlanItems.planId, id));
    await db.delete(readingPlans).where(eq(readingPlans.id, id));
  }

  async addReadingPlanItem(data: InsertReadingPlanItem): Promise<ReadingPlanItem> {
    const [created] = await db.insert(readingPlanItems).values(data).returning();
    return created;
  }

  async bulkAddReadingPlanItems(items: InsertReadingPlanItem[]): Promise<ReadingPlanItem[]> {
    if (items.length === 0) return [];
    const created = await db.insert(readingPlanItems).values(items).returning();
    return created;
  }

  async listReadingPlanItems(planId: number): Promise<ReadingPlanItem[]> {
    return await db.select().from(readingPlanItems).where(eq(readingPlanItems.planId, planId)).orderBy(readingPlanItems.sortOrder);
  }

  async getReadingPlanItem(id: number): Promise<ReadingPlanItem | undefined> {
    const [item] = await db.select().from(readingPlanItems).where(eq(readingPlanItems.id, id));
    return item;
  }

  async toggleReadingPlanItem(id: number): Promise<ReadingPlanItem | undefined> {
    const [item] = await db.select().from(readingPlanItems).where(eq(readingPlanItems.id, id));
    if (!item) return undefined;
    const [updated] = await db.update(readingPlanItems)
      .set({ isCompleted: !item.isCompleted, completedAt: !item.isCompleted ? new Date() : null })
      .where(eq(readingPlanItems.id, id)).returning();
    return updated;
  }

  async deleteReadingPlanItem(id: number): Promise<void> {
    await db.delete(readingPlanItems).where(eq(readingPlanItems.id, id));
  }

  async createReadingClubPost(userId: number, data: InsertReadingClubPost): Promise<ReadingClubPost> {
    const [created] = await db.insert(readingClubPosts).values({ ...data, userId }).returning();
    return created;
  }

  async listReadingClubPosts(): Promise<(ReadingClubPost & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null; cargo: string | null; country: string | null }; commentCount: number; likeCount: number })[]> {
    const rows = await db
      .select({
        id: readingClubPosts.id, userId: readingClubPosts.userId, book: readingClubPosts.book,
        chapter: readingClubPosts.chapter, verseStart: readingClubPosts.verseStart, verseEnd: readingClubPosts.verseEnd,
        content: readingClubPosts.content, createdAt: readingClubPosts.createdAt,
        username: users.username, displayName: users.displayName, avatarUrl: users.avatarUrl,
        cargo: users.cargo, country: users.country,
        commentCount: sql<number>`(SELECT count(*)::int FROM reading_club_comments WHERE post_id = ${readingClubPosts.id})`,
        likeCount: sql<number>`(SELECT count(*)::int FROM reading_club_post_likes WHERE post_id = ${readingClubPosts.id})`,
      })
      .from(readingClubPosts)
      .innerJoin(users, eq(readingClubPosts.userId, users.id))
      .orderBy(desc(readingClubPosts.createdAt))
      .limit(100); // el club muestra las más recientes; sin límite crecía sin fin
    return rows.map(r => ({
      id: r.id, userId: r.userId, book: r.book, chapter: r.chapter,
      verseStart: r.verseStart, verseEnd: r.verseEnd, content: r.content, createdAt: r.createdAt,
      user: { id: r.userId, username: r.username, displayName: r.displayName, avatarUrl: r.avatarUrl, cargo: r.cargo, country: r.country },
      commentCount: r.commentCount,
      likeCount: r.likeCount,
    }));
  }

  async deleteReadingClubPost(id: number): Promise<void> {
    await db.delete(readingClubPostLikes).where(eq(readingClubPostLikes.postId, id));
    await db.delete(readingClubComments).where(eq(readingClubComments.postId, id));
    await db.delete(readingClubPosts).where(eq(readingClubPosts.id, id));
  }

  async toggleReadingClubPostLike(postId: number, userId: number): Promise<{ liked: boolean }> {
    const [existing] = await db.select().from(readingClubPostLikes)
      .where(and(eq(readingClubPostLikes.postId, postId), eq(readingClubPostLikes.userId, userId)));
    if (existing) {
      await db.delete(readingClubPostLikes).where(eq(readingClubPostLikes.id, existing.id));
      return { liked: false };
    }
    await db.insert(readingClubPostLikes).values({ postId, userId });
    return { liked: true };
  }

  async getUserLikedPosts(userId: number): Promise<number[]> {
    const rows = await db.select({ postId: readingClubPostLikes.postId }).from(readingClubPostLikes).where(eq(readingClubPostLikes.userId, userId));
    return rows.map(r => r.postId);
  }

  async createReadingClubComment(userId: number, data: InsertReadingClubComment): Promise<ReadingClubComment> {
    const [created] = await db.insert(readingClubComments).values({ ...data, userId }).returning();
    return created;
  }

  async listReadingClubComments(postId: number): Promise<(ReadingClubComment & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]> {
    const rows = await db
      .select({
        id: readingClubComments.id, postId: readingClubComments.postId, userId: readingClubComments.userId,
        content: readingClubComments.content, createdAt: readingClubComments.createdAt,
        username: users.username, displayName: users.displayName, avatarUrl: users.avatarUrl,
      })
      .from(readingClubComments)
      .innerJoin(users, eq(readingClubComments.userId, users.id))
      .where(eq(readingClubComments.postId, postId))
      .orderBy(readingClubComments.createdAt);
    return rows.map(r => ({
      id: r.id, postId: r.postId, userId: r.userId, content: r.content, createdAt: r.createdAt,
      user: { id: r.userId, username: r.username, displayName: r.displayName, avatarUrl: r.avatarUrl },
    }));
  }

  async deleteReadingClubComment(id: number): Promise<void> {
    await db.delete(readingClubComments).where(eq(readingClubComments.id, id));
  }

  async createLibraryResource(userId: number, data: InsertLibraryResource): Promise<LibraryResource> {
    const [created] = await db.insert(libraryResources).values({ ...data, userId }).returning();
    return created;
  }

  async listLibraryResources(category?: string, search?: string): Promise<(LibraryResource & { user: { username: string; displayName: string | null }; likeCount: number })[]> {
    const conditions: any[] = [];
    if (category && category !== "all") conditions.push(eq(libraryResources.category, category));
    if (search) conditions.push(or(ilike(libraryResources.title, `%${search}%`), ilike(libraryResources.description, `%${search}%`)));

    const query = db
      .select({
        id: libraryResources.id, userId: libraryResources.userId, title: libraryResources.title,
        description: libraryResources.description, resourceType: libraryResources.resourceType,
        fileData: libraryResources.fileData, fileUrl: libraryResources.fileUrl,
        fileName: libraryResources.fileName, fileSize: libraryResources.fileSize,
        category: libraryResources.category, createdAt: libraryResources.createdAt,
        username: users.username, displayName: users.displayName,
        likeCount: sql<number>`(SELECT count(*)::int FROM library_resource_likes WHERE resource_id = ${libraryResources.id})`,
      })
      .from(libraryResources)
      .innerJoin(users, eq(libraryResources.userId, users.id))
      .orderBy(desc(libraryResources.createdAt));

    const rows = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query;

    return rows.map(r => ({
      id: r.id, userId: r.userId, title: r.title, description: r.description,
      resourceType: r.resourceType, fileData: r.fileData, fileUrl: r.fileUrl,
      fileName: r.fileName, fileSize: r.fileSize, category: r.category, createdAt: r.createdAt,
      user: { username: r.username, displayName: r.displayName },
      likeCount: r.likeCount,
    }));
  }

  async deleteLibraryResource(id: number): Promise<void> {
    await db.delete(libraryResourceLikes).where(eq(libraryResourceLikes.resourceId, id));
    await db.delete(libraryResources).where(eq(libraryResources.id, id));
  }

  async toggleLibraryResourceLike(resourceId: number, userId: number): Promise<{ liked: boolean }> {
    const [existing] = await db.select().from(libraryResourceLikes)
      .where(and(eq(libraryResourceLikes.resourceId, resourceId), eq(libraryResourceLikes.userId, userId)));
    if (existing) {
      await db.delete(libraryResourceLikes).where(eq(libraryResourceLikes.id, existing.id));
      return { liked: false };
    }
    await db.insert(libraryResourceLikes).values({ resourceId, userId });
    return { liked: true };
  }

  async getUserLikedResources(userId: number): Promise<number[]> {
    const rows = await db.select({ resourceId: libraryResourceLikes.resourceId })
      .from(libraryResourceLikes).where(eq(libraryResourceLikes.userId, userId));
    return rows.map(r => r.resourceId);
  }

  async updateUserInfo(id: number, cargo: string | null, country: string | null): Promise<User | undefined> {
    const [user] = await db.update(users).set({ cargo, country }).where(eq(users.id, id)).returning();
    return user;
  }

  async createNotification(data: InsertNotification): Promise<Notification> {
    const [n] = await db.insert(notifications).values(data).returning();
    return n;
  }

  async createNotificationForAll(data: Omit<InsertNotification, "userId">): Promise<void> {
    const allUsers = await db.select({ id: users.id }).from(users);
    if (allUsers.length === 0) return;
    const values = allUsers.map(u => ({ ...data, userId: u.id }));
    await db.insert(notifications).values(values);
  }

  async listNotifications(userId: number): Promise<Notification[]> {
    return db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(50);
  }

  async markNotificationRead(id: number, userId: number): Promise<void> {
    await db.update(notifications).set({ isRead: true })
      .where(and(eq(notifications.id, id), eq(notifications.userId, userId)));
  }

  async markAllNotificationsRead(userId: number): Promise<void> {
    await db.update(notifications).set({ isRead: true }).where(eq(notifications.userId, userId));
  }

  async getUnreadNotificationCount(userId: number): Promise<number> {
    const [result] = await db.select({ count: sql<number>`count(*)::int` }).from(notifications)
      .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
    return result?.count || 0;
  }

  async createPrayerActivity(userId: number, data: InsertPrayerActivity): Promise<PrayerActivity> {
    const [a] = await db.insert(prayerActivities).values({
      ...data,
      userId,
      scheduledDate: data.scheduledDate ? new Date(data.scheduledDate) : null,
    }).returning();
    return a;
  }

  async getPrayerActivity(id: number): Promise<PrayerActivity | undefined> {
    const [activity] = await db.select().from(prayerActivities).where(eq(prayerActivities.id, id));
    return activity;
  }

  async updatePrayerActivity(id: number, data: UpdatePrayerActivity): Promise<PrayerActivity | undefined> {
    const updateData: any = { ...data };
    if (data.scheduledDate !== undefined) {
      updateData.scheduledDate = data.scheduledDate ? new Date(data.scheduledDate) : null;
    }
    const [updated] = await db.update(prayerActivities).set(updateData).where(eq(prayerActivities.id, id)).returning();
    return updated;
  }

  async listPrayerActivities(): Promise<(PrayerActivity & { user: { username: string; displayName: string | null } })[]> {
    const rows = await db
      .select({
        id: prayerActivities.id, userId: prayerActivities.userId,
        title: prayerActivities.title, description: prayerActivities.description,
        meetingUrl: prayerActivities.meetingUrl, meetingPlatform: prayerActivities.meetingPlatform,
        scheduledDate: prayerActivities.scheduledDate, isActive: prayerActivities.isActive,
        createdAt: prayerActivities.createdAt,
        username: users.username, displayName: users.displayName,
      })
      .from(prayerActivities)
      .leftJoin(users, eq(prayerActivities.userId, users.id))
      .orderBy(desc(prayerActivities.createdAt));
    return rows.map(r => ({
      id: r.id, userId: r.userId, title: r.title, description: r.description,
      meetingUrl: r.meetingUrl, meetingPlatform: r.meetingPlatform,
      scheduledDate: r.scheduledDate, isActive: r.isActive, createdAt: r.createdAt,
      user: { username: r.username!, displayName: r.displayName },
    }));
  }

  async deletePrayerActivity(id: number): Promise<void> {
    // Delete attendees first
    await db.delete(prayerAttendees).where(eq(prayerAttendees.activityId, id));
    await db.delete(prayerActivities).where(eq(prayerActivities.id, id));
  }

  async upsertPrayerAttendee(activityId: number, userId: number, data: { status?: string }): Promise<any> {
    const status = data.status || "confirmado";
    const [existing] = await db.select().from(prayerAttendees)
      .where(and(eq(prayerAttendees.activityId, activityId), eq(prayerAttendees.userId, userId)));
    
    if (existing) {
      const [updated] = await db.update(prayerAttendees)
        .set({ status })
        .where(eq(prayerAttendees.id, existing.id))
        .returning();
      return updated;
    }
    
    const [created] = await db.insert(prayerAttendees).values({
      activityId,
      userId,
      status,
    }).returning();
    return created;
  }

  async getPrayerAttendee(activityId: number, userId: number): Promise<any> {
    const [att] = await db.select().from(prayerAttendees)
      .where(and(eq(prayerAttendees.activityId, activityId), eq(prayerAttendees.userId, userId)));
    return att || null;
  }

  async listPrayerAttendees(activityId: number): Promise<any[]> {
    const rows = await db
      .select({
        id: prayerAttendees.id,
        activityId: prayerAttendees.activityId,
        userId: prayerAttendees.userId,
        status: prayerAttendees.status,
        createdAt: prayerAttendees.createdAt,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      })
      .from(prayerAttendees)
      .innerJoin(users, eq(prayerAttendees.userId, users.id))
      .where(eq(prayerAttendees.activityId, activityId))
      .orderBy(desc(prayerAttendees.createdAt));
    
    return rows.map(r => ({
      id: r.id,
      activityId: r.activityId,
      userId: r.userId,
      status: r.status,
      createdAt: r.createdAt,
      user: { id: r.userId, username: r.username, displayName: r.displayName, avatarUrl: r.avatarUrl },
    }));
  }

  async cancelPrayerAttendance(activityId: number, userId: number): Promise<void> {
    await db.delete(prayerAttendees)
      .where(and(eq(prayerAttendees.activityId, activityId), eq(prayerAttendees.userId, userId)));
  }

  async getPrayerAttendeeCount(activityId: number): Promise<number> {
    const [result] = await db.select({ count: sql<number>`count(*)::int` })
      .from(prayerAttendees)
      .where(and(eq(prayerAttendees.activityId, activityId), eq(prayerAttendees.status, "confirmado")));
    return result?.count || 0;
  }

  async createRegionPost(userId: number, data: InsertRegionPost): Promise<RegionPost> {
    const [p] = await db.insert(regionPosts).values({ ...data, userId }).returning();
    return p;
  }

  async listRegionPosts(region?: string): Promise<(RegionPost & { user: { username: string; displayName: string | null; avatarUrl: string | null; country: string | null } })[]> {
    const query = db
      .select({
        id: regionPosts.id, userId: regionPosts.userId,
        region: regionPosts.region, content: regionPosts.content,
        imageUrl: regionPosts.imageUrl, createdAt: regionPosts.createdAt,
        username: users.username, displayName: users.displayName,
        avatarUrl: users.avatarUrl, country: users.country,
      })
      .from(regionPosts)
      .leftJoin(users, eq(regionPosts.userId, users.id))
      .orderBy(desc(regionPosts.createdAt));
    const rows = region ? await query.where(eq(regionPosts.region, region)) : await query;
    return rows.map(r => ({
      id: r.id, userId: r.userId, region: r.region, content: r.content,
      imageUrl: r.imageUrl, createdAt: r.createdAt,
      user: { username: r.username!, displayName: r.displayName, avatarUrl: r.avatarUrl, country: r.country },
    }));
  }

  async getRegionPost(id: number): Promise<RegionPost | undefined> {
    const [post] = await db.select().from(regionPosts).where(eq(regionPosts.id, id));
    return post;
  }

  async deleteRegionPost(id: number): Promise<void> {
    // Delete cascading: votes -> options -> polls, reactions, then the post
    const polls = await db.select({ id: regionPostPolls.id }).from(regionPostPolls).where(eq(regionPostPolls.postId, id));
    if (polls.length > 0) {
      const pollIds = polls.map(p => p.id);
      const options = await db.select({ id: regionPostPollOptions.id }).from(regionPostPollOptions).where(inArray(regionPostPollOptions.pollId, pollIds));
      if (options.length > 0) {
        const optionIds = options.map(o => o.id);
        await db.delete(regionPostPollVotes).where(inArray(regionPostPollVotes.optionId, optionIds));
      }
      await db.delete(regionPostPollOptions).where(inArray(regionPostPollOptions.pollId, pollIds));
      await db.delete(regionPostPolls).where(inArray(regionPostPolls.id, pollIds));
    }
    await db.delete(regionPostReactions).where(eq(regionPostReactions.postId, id));
    await db.delete(regionPosts).where(eq(regionPosts.id, id));
  }

  async listMinistryRegions(): Promise<MinistryRegion[]> {
    return db.select().from(ministryRegions).orderBy(asc(ministryRegions.sortOrder), asc(ministryRegions.name));
  }

  async createMinistryRegion(data: InsertMinistryRegion): Promise<MinistryRegion> {
    const [created] = await db.insert(ministryRegions).values(data).returning();
    return created;
  }

  async updateMinistryRegion(id: number, data: UpdateMinistryRegion): Promise<MinistryRegion | undefined> {
    const [updated] = await db.update(ministryRegions).set(data).where(eq(ministryRegions.id, id)).returning();
    return updated;
  }

  async deleteMinistryRegion(id: number): Promise<void> {
    await db.delete(ministryRegions).where(eq(ministryRegions.id, id));
  }

  // ========== MINISTRY CHURCHES ==========
  async listMinistryChurches(churchType?: string): Promise<MinistryChurch[]> {
    if (churchType) {
      return db.select().from(ministryChurches)
        .where(eq(ministryChurches.churchType, churchType))
        .orderBy(asc(ministryChurches.sortOrder), asc(ministryChurches.name));
    }
    return db.select().from(ministryChurches).orderBy(asc(ministryChurches.sortOrder), asc(ministryChurches.name));
  }

  async getMinistryChurch(id: number): Promise<MinistryChurch | undefined> {
    const [church] = await db.select().from(ministryChurches).where(eq(ministryChurches.id, id));
    return church;
  }

  // allianceDate llega como texto desde el formulario/API, pero la columna es
  // timestamp: Drizzle espera un Date (con texto falla en toISOString()).
  async createMinistryChurch(data: InsertMinistryChurch): Promise<MinistryChurch> {
    const { allianceDate, ...rest } = data;
    const [created] = await db.insert(ministryChurches).values({
      ...rest,
      allianceDate: allianceDate ? new Date(allianceDate) : null,
    }).returning();
    return created;
  }

  async updateMinistryChurch(id: number, data: UpdateMinistryChurch): Promise<MinistryChurch | undefined> {
    const { allianceDate, ...rest } = data;
    const [updated] = await db.update(ministryChurches).set({
      ...rest,
      ...(allianceDate !== undefined && { allianceDate: allianceDate ? new Date(allianceDate) : null }),
    }).where(eq(ministryChurches.id, id)).returning();
    return updated;
  }

  async deleteMinistryChurch(id: number): Promise<void> {
    // Delete posts associated with this church first
    await db.delete(churchPosts).where(eq(churchPosts.churchId, id));
    await db.delete(ministryChurches).where(eq(ministryChurches.id, id));
  }

  // ========== CHURCH POSTS ==========
  async createChurchPost(userId: number, data: InsertChurchPost): Promise<ChurchPost> {
    const [created] = await db.insert(churchPosts).values({ ...data, userId }).returning();
    return created;
  }

  async listChurchPosts(churchId?: number): Promise<any[]> {
    const conditions = churchId ? eq(churchPosts.churchId, churchId) : undefined;
    const rows = await db.select({
      id: churchPosts.id,
      userId: churchPosts.userId,
      churchId: churchPosts.churchId,
      content: churchPosts.content,
      imageUrl: churchPosts.imageUrl,
      createdAt: churchPosts.createdAt,
      username: users.username,
      displayName: users.displayName,
      avatarUrl: users.avatarUrl,
      churchName: ministryChurches.name,
      churchType: ministryChurches.churchType,
    })
    .from(churchPosts)
    .innerJoin(users, eq(churchPosts.userId, users.id))
    .innerJoin(ministryChurches, eq(churchPosts.churchId, ministryChurches.id))
    .where(conditions)
    .orderBy(desc(churchPosts.createdAt));
    return rows.map(r => ({
      id: r.id, userId: r.userId, churchId: r.churchId, content: r.content,
      imageUrl: r.imageUrl, createdAt: r.createdAt,
      user: { username: r.username!, displayName: r.displayName, avatarUrl: r.avatarUrl },
      church: { name: r.churchName!, churchType: r.churchType! },
    }));
  }

  async getChurchPost(id: number): Promise<ChurchPost | undefined> {
    const [post] = await db.select().from(churchPosts).where(eq(churchPosts.id, id));
    return post;
  }

  async deleteChurchPost(id: number): Promise<void> {
    await db.delete(churchPosts).where(eq(churchPosts.id, id));
  }

  async listTeamMembers(): Promise<any[]> {
    // Esta lista es pública (página Equipo y bienvenida): sin el nombre de usuario, que en
    // algunas cuentas es el correo de la persona.
    const rows = await db.select({
      member: teamMembers,
      user: {
        id: users.id,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      },
    })
    .from(teamMembers)
    .leftJoin(users, eq(teamMembers.userId, users.id))
    .orderBy(asc(teamMembers.sortOrder), asc(teamMembers.name));
    return rows.map(r => ({ ...r.member, user: r.user }));
  }

  async createTeamMember(data: InsertTeamMember): Promise<TeamMember> {
    const [created] = await db.insert(teamMembers).values(data).returning();
    return created;
  }

  async updateTeamMember(id: number, data: UpdateTeamMember): Promise<TeamMember | undefined> {
    const [updated] = await db.update(teamMembers).set(data).where(eq(teamMembers.id, id)).returning();
    return updated;
  }

  async deleteTeamMember(id: number): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  async toggleRegionPostReaction(postId: number, userId: number, reactionType: string): Promise<{ added: boolean }> {
    const [existing] = await db.select().from(regionPostReactions)
      .where(and(eq(regionPostReactions.postId, postId), eq(regionPostReactions.userId, userId), eq(regionPostReactions.reactionType, reactionType)));
    if (existing) {
      await db.delete(regionPostReactions).where(eq(regionPostReactions.id, existing.id));
      return { added: false };
    }
    await db.insert(regionPostReactions).values({ postId, userId, reactionType });
    return { added: true };
  }

  async getRegionPostReactions(postId: number): Promise<{ reactionType: string; count: number; users: number[] }[]> {
    const rows = await db.select({
      reactionType: regionPostReactions.reactionType,
      userId: regionPostReactions.userId,
    }).from(regionPostReactions).where(eq(regionPostReactions.postId, postId));

    const grouped: Record<string, number[]> = {};
    for (const r of rows) {
      if (!grouped[r.reactionType]) grouped[r.reactionType] = [];
      grouped[r.reactionType].push(r.userId);
    }
    return Object.entries(grouped).map(([reactionType, userIds]) => ({
      reactionType,
      count: userIds.length,
      users: userIds,
    }));
  }

  async createRegionPostPoll(postId: number, question: string, options: string[]): Promise<RegionPostPoll> {
    const [poll] = await db.insert(regionPostPolls).values({ postId, question }).returning();
    for (let i = 0; i < options.length; i++) {
      await db.insert(regionPostPollOptions).values({ pollId: poll.id, optionText: options[i], sortOrder: i });
    }
    return poll;
  }

  async getRegionPostPoll(postId: number): Promise<{ poll: RegionPostPoll; options: (RegionPostPollOption & { voteCount: number })[] } | null> {
    const [poll] = await db.select().from(regionPostPolls).where(eq(regionPostPolls.postId, postId));
    if (!poll) return null;
    const opts = await db.select({
      id: regionPostPollOptions.id,
      pollId: regionPostPollOptions.pollId,
      optionText: regionPostPollOptions.optionText,
      sortOrder: regionPostPollOptions.sortOrder,
      voteCount: sql<number>`(SELECT count(*)::int FROM region_post_poll_votes WHERE option_id = ${regionPostPollOptions.id})`,
    }).from(regionPostPollOptions).where(eq(regionPostPollOptions.pollId, poll.id)).orderBy(regionPostPollOptions.sortOrder);
    return { poll, options: opts };
  }

  async voteRegionPostPoll(optionId: number, userId: number): Promise<{ success: boolean }> {
    const [option] = await db.select().from(regionPostPollOptions).where(eq(regionPostPollOptions.id, optionId));
    if (!option) return { success: false };
    const allOptions = await db.select({ id: regionPostPollOptions.id }).from(regionPostPollOptions)
      .where(eq(regionPostPollOptions.pollId, option.pollId));
    const optionIds = allOptions.map(o => o.id);
    if (optionIds.length > 0) {
      await db.delete(regionPostPollVotes).where(
        and(eq(regionPostPollVotes.userId, userId), inArray(regionPostPollVotes.optionId, optionIds))
      );
    }
    await db.insert(regionPostPollVotes).values({ optionId, userId });
    return { success: true };
  }

  async getUserPollVote(postId: number, userId: number): Promise<number | null> {
    const [poll] = await db.select().from(regionPostPolls).where(eq(regionPostPolls.postId, postId));
    if (!poll) return null;
    const allOptions = await db.select({ id: regionPostPollOptions.id }).from(regionPostPollOptions)
      .where(eq(regionPostPollOptions.pollId, poll.id));
    const optionIds = allOptions.map(o => o.id);
    if (optionIds.length === 0) return null;
    const [vote] = await db.select().from(regionPostPollVotes)
      .where(and(eq(regionPostPollVotes.userId, userId), inArray(regionPostPollVotes.optionId, optionIds)));
    return vote ? vote.optionId : null;
  }

  // ========== GAME STUBS (tables not yet created) ==========
  async getOrCreateGameProfile(_userId: number): Promise<any> { return null; }
  async updateGameProfile(_userId: number, _updates: any): Promise<any> { return null; }
  async getRandomQuestion(_difficulty: string, _excludeIds?: number[]): Promise<any> { return null; }
  async submitGameAnswer(_userId: number, _questionId: number, _selectedAnswer: string): Promise<any> { return { correct: false, pointsEarned: 0, explanation: null }; }
  async getLeaderboard(_limit: number = 20): Promise<any[]> { return []; }
  async getGameMissions(_userId: number): Promise<any[]> { return []; }
  async progressMission(_userId: number, _actionType: string): Promise<void> {}
  async claimMissionReward(_userId: number, _missionId: number): Promise<any> { return { energy: 0, points: 0 }; }
  async refillEnergy(_userId: number): Promise<any> { return null; }

  // ========== STORY STUBS (tables not yet created) ==========
  async getStoryChapters(): Promise<any[]> { return []; }
  async getStoryChapter(_id: number): Promise<any> { return null; }
  async getStoryActivities(_chapterId: number): Promise<any[]> { return []; }
  async getStoryActivity(_id: number): Promise<any> { return null; }
  async getUserStoryProgress(_userId: number): Promise<any[]> { return []; }
  async getChapterProgress(_userId: number, _chapterId: number): Promise<any[]> { return []; }
  async saveStoryActivityProgress(_userId: number, _chapterId: number, _activityId: number, _userAnswer: string | null, _isCorrect: boolean | null): Promise<any> { return null; }

  async getEnrollmentCounts(): Promise<Record<number, { total: number; approved: number; pending: number }>> {
    const rows = await db
      .select({
        courseId: enrollments.courseId,
        status: enrollments.status,
        count: sql<number>`count(*)::int`,
      })
      .from(enrollments)
      .groupBy(enrollments.courseId, enrollments.status);

    const counts: Record<number, { total: number; approved: number; pending: number }> = {};
    for (const r of rows) {
      if (!counts[r.courseId]) counts[r.courseId] = { total: 0, approved: 0, pending: 0 };
      counts[r.courseId].total += r.count;
      if (r.status === "aprobado" || r.status === "completado") counts[r.courseId].approved += r.count;
      if (r.status === "solicitado") counts[r.courseId].pending += r.count;
    }
    return counts;
  }

  // ======================
  // NOTE: city-builder and story logic removed (tables not yet created)

  // ========== PASSWORD RESET TOKENS ==========

  async createPasswordResetToken(userId: number, token: string, expiresAt: Date): Promise<void> {
    await db.insert(passwordResetTokens).values({ userId, token, expiresAt });
  }

  async getPasswordResetToken(token: string): Promise<{ userId: number; expiresAt: Date; usedAt: Date | null } | undefined> {
    const [row] = await db.select({
      userId: passwordResetTokens.userId,
      expiresAt: passwordResetTokens.expiresAt,
      usedAt: passwordResetTokens.usedAt,
    }).from(passwordResetTokens).where(eq(passwordResetTokens.token, token));
    return row;
  }

  async markPasswordResetTokenUsed(token: string): Promise<void> {
    await db.update(passwordResetTokens)
      .set({ usedAt: new Date() })
      .where(eq(passwordResetTokens.token, token));
  }

  // ========== EMAIL VERIFICATION ==========

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(ilike(users.email, email));
    return user;
  }

  async getUserByVerifyToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.emailVerifyToken, token));
    return user;
  }

  // ========== PUSH SUBSCRIPTIONS ==========

  async createPushSubscription(userId: number, endpoint: string, p256dh: string, auth: string): Promise<void> {
    // Upsert: replace if same endpoint exists
    await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, endpoint));
    await db.insert(pushSubscriptions).values({ userId, endpoint, p256dh, auth });
  }

  async deletePushSubscription(endpoint: string): Promise<void> {
    await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, endpoint));
  }

  async getPushSubscriptionsByUser(userId: number): Promise<Array<{ id: number; endpoint: string; p256dh: string; auth: string }>> {
    return db.select({
      id: pushSubscriptions.id,
      endpoint: pushSubscriptions.endpoint,
      p256dh: pushSubscriptions.p256dh,
      auth: pushSubscriptions.auth,
    }).from(pushSubscriptions).where(eq(pushSubscriptions.userId, userId));
  }

  async getAllPushSubscriptions(): Promise<Array<{ id: number; userId: number; endpoint: string; p256dh: string; auth: string }>> {
    return db.select({
      id: pushSubscriptions.id,
      userId: pushSubscriptions.userId,
      endpoint: pushSubscriptions.endpoint,
      p256dh: pushSubscriptions.p256dh,
      auth: pushSubscriptions.auth,
    }).from(pushSubscriptions);
  }

  async deletePushSubscriptionsByIds(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await db.delete(pushSubscriptions).where(inArray(pushSubscriptions.id, ids));
  }

  // ========== CERTIFICATES ==========

  async createCertificate(userId: number, courseId: number, enrollmentId: number, code: string, teacherName?: string, grade?: string): Promise<Certificate> {
    const [cert] = await db.insert(certificates).values({ userId, courseId, enrollmentId, certificateCode: code, teacherName, grade }).returning();
    return cert;
  }

  async updateCertificate(id: number, updates: Partial<Pick<Certificate, 'teacherName' | 'grade' | 'studentNameOverride' | 'courseNameOverride' | 'customMessage' | 'signatureUrl' | 'issuedDateOverride'>>): Promise<Certificate | undefined> {
    const [cert] = await db.update(certificates).set(updates).where(eq(certificates.id, id)).returning();
    return cert;
  }

  async getCertificate(id: number): Promise<Certificate | undefined> {
    const [cert] = await db.select().from(certificates).where(eq(certificates.id, id));
    return cert;
  }

  async getCertificateByCode(code: string): Promise<Certificate | undefined> {
    const [cert] = await db.select().from(certificates).where(eq(certificates.certificateCode, code));
    return cert;
  }

  async listCertificatesByUser(userId: number): Promise<(Certificate & { course: { title: string } })[]> {
    const rows = await db.select({
      id: certificates.id,
      userId: certificates.userId,
      courseId: certificates.courseId,
      enrollmentId: certificates.enrollmentId,
      certificateCode: certificates.certificateCode,
      issuedAt: certificates.issuedAt,
      teacherName: certificates.teacherName,
      grade: certificates.grade,
      studentNameOverride: certificates.studentNameOverride,
      courseNameOverride: certificates.courseNameOverride,
      customMessage: certificates.customMessage,
      signatureUrl: certificates.signatureUrl,
      issuedDateOverride: certificates.issuedDateOverride,
      churchId: certificates.churchId,
      churchLogoUrl: certificates.churchLogoUrl,
      churchName: certificates.churchName,
      isCoCertified: certificates.isCoCertified,
      courseTitle: courses.title,
    }).from(certificates).leftJoin(courses, eq(certificates.courseId, courses.id)).where(eq(certificates.userId, userId)).orderBy(desc(certificates.issuedAt));
    // Un certificado por inscripción: el botón "Generar certificado" llegó a crear
    // duplicados. Se muestra el más reciente (el que el maestro pudo personalizar);
    // los códigos de los demás siguen verificándose.
    const seen = new Set<number>();
    const unique = rows.filter(r => {
      if (r.enrollmentId == null) return true;
      if (seen.has(r.enrollmentId)) return false;
      seen.add(r.enrollmentId);
      return true;
    });
    return unique.map(r => ({
      id: r.id, userId: r.userId, courseId: r.courseId, enrollmentId: r.enrollmentId,
      certificateCode: r.certificateCode, issuedAt: r.issuedAt, teacherName: r.teacherName, grade: r.grade,
      studentNameOverride: r.studentNameOverride, courseNameOverride: r.courseNameOverride,
      customMessage: r.customMessage, signatureUrl: r.signatureUrl, issuedDateOverride: r.issuedDateOverride,
      churchId: r.churchId, churchLogoUrl: r.churchLogoUrl, churchName: r.churchName, isCoCertified: r.isCoCertified,
      course: { title: r.courseTitle || "Curso eliminado" },
    }));
  }

  // ========== TITHES ==========

  async createTithe(data: InsertTithe & { recordedBy: number }): Promise<Tithe> {
    const [t] = await db.insert(tithes).values(data).returning();
    return t;
  }

  async listTithes(filters?: { churchId?: number; regionName?: string; month?: string }): Promise<Tithe[]> {
    let query = db.select().from(tithes).orderBy(desc(tithes.createdAt));
    // filters are applied via SQL conditions
    const conditions: any[] = [];
    if (filters?.churchId) conditions.push(eq(tithes.churchId, filters.churchId));
    if (filters?.regionName) conditions.push(eq(tithes.regionName, filters.regionName));
    if (filters?.month) {
      conditions.push(sql`to_char(${tithes.createdAt}, 'YYYY-MM') = ${filters.month}`);
    }
    if (conditions.length > 0) {
      return db.select().from(tithes).where(and(...conditions)).orderBy(desc(tithes.createdAt));
    }
    return query;
  }

  async deleteTithe(id: number): Promise<void> {
    await db.delete(tithes).where(eq(tithes.id, id));
  }

  async getTitheReport(month?: string, year?: string): Promise<any> {
    const conditions: any[] = [];
    if (month && year) {
      conditions.push(sql`to_char(${tithes.createdAt}, 'YYYY-MM') = ${year + '-' + month.padStart(2, '0')}`);
    } else if (year) {
      conditions.push(sql`to_char(${tithes.createdAt}, 'YYYY') = ${year}`);
    }
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = whereClause 
      ? await db.select().from(tithes).where(whereClause).orderBy(desc(tithes.createdAt))
      : await db.select().from(tithes).orderBy(desc(tithes.createdAt));
    
    const totalByType: Record<string, number> = {};
    const totalByMethod: Record<string, number> = {};
    const totalByRegion: Record<string, number> = {};
    let grandTotal = 0;
    for (const r of rows) {
      const amt = parseFloat(r.amount) || 0;
      grandTotal += amt;
      totalByType[r.type] = (totalByType[r.type] || 0) + amt;
      totalByMethod[r.method] = (totalByMethod[r.method] || 0) + amt;
      if (r.regionName) totalByRegion[r.regionName] = (totalByRegion[r.regionName] || 0) + amt;
    }
    return { total: grandTotal, count: rows.length, byType: totalByType, byMethod: totalByMethod, byRegion: totalByRegion, rows };
  }

  // ========== SERMONS ==========

  async createSermon(data: InsertSermon & { createdBy: number }): Promise<Sermon> {
    const values: any = { ...data };
    if (data.sermonDate) values.sermonDate = new Date(data.sermonDate);
    const [s] = await db.insert(sermons).values(values).returning();
    return s;
  }

  async getSermon(id: number): Promise<Sermon | undefined> {
    const [s] = await db.select().from(sermons).where(eq(sermons.id, id));
    return s;
  }

  async listSermons(filters?: { category?: string; preacherId?: number; series?: string; search?: string }): Promise<Sermon[]> {
    const conditions: any[] = [eq(sermons.isPublished, true)];
    if (filters?.category) conditions.push(eq(sermons.category, filters.category));
    if (filters?.preacherId) conditions.push(eq(sermons.preacherId, filters.preacherId));
    if (filters?.series) conditions.push(eq(sermons.seriesName, filters.series));
    if (filters?.search) conditions.push(or(ilike(sermons.title, `%${filters.search}%`), ilike(sermons.description, `%${filters.search}%`)));
    return db.select().from(sermons).where(and(...conditions)).orderBy(desc(sermons.sermonDate));
  }

  async updateSermon(id: number, data: UpdateSermon): Promise<Sermon | undefined> {
    const values: any = { ...data };
    if (data.sermonDate) values.sermonDate = new Date(data.sermonDate);
    const [s] = await db.update(sermons).set(values).where(eq(sermons.id, id)).returning();
    return s;
  }

  async deleteSermon(id: number): Promise<void> {
    await db.delete(sermonNotes).where(eq(sermonNotes.sermonId, id));
    await db.delete(sermons).where(eq(sermons.id, id));
  }

  async createSermonNote(userId: number, data: InsertSermonNote): Promise<SermonNote> {
    const [n] = await db.insert(sermonNotes).values({ ...data, userId }).returning();
    return n;
  }

  async listSermonNotes(sermonId: number, userId: number): Promise<SermonNote[]> {
    return db.select().from(sermonNotes).where(and(eq(sermonNotes.sermonId, sermonId), eq(sermonNotes.userId, userId))).orderBy(desc(sermonNotes.createdAt));
  }

  async deleteSermonNote(id: number, userId: number): Promise<void> {
    await db.delete(sermonNotes).where(and(eq(sermonNotes.id, id), eq(sermonNotes.userId, userId)));
  }

  // ========== SMALL GROUPS ==========

  async createSmallGroup(data: InsertSmallGroup): Promise<SmallGroup> {
    const [g] = await db.insert(smallGroups).values(data).returning();
    // Add leader as member
    await db.insert(smallGroupMembers).values({ groupId: g.id, userId: data.leaderId, role: "lider" });
    return g;
  }

  async getSmallGroup(id: number): Promise<SmallGroup | undefined> {
    const [g] = await db.select().from(smallGroups).where(eq(smallGroups.id, id));
    return g;
  }

  async listSmallGroups(): Promise<(SmallGroup & { leader: { username: string; displayName: string | null }; memberCount: number })[]> {
    const rows = await db.select({
      id: smallGroups.id,
      name: smallGroups.name,
      description: smallGroups.description,
      leaderId: smallGroups.leaderId,
      meetingDay: smallGroups.meetingDay,
      meetingTime: smallGroups.meetingTime,
      meetingLocation: smallGroups.meetingLocation,
      meetingUrl: smallGroups.meetingUrl,
      maxMembers: smallGroups.maxMembers,
      isActive: smallGroups.isActive,
      createdAt: smallGroups.createdAt,
      leaderUsername: users.username,
      leaderDisplayName: users.displayName,
      memberCount: sql<number>`(SELECT COUNT(*) FROM small_group_members WHERE group_id = ${smallGroups.id})`,
    }).from(smallGroups).innerJoin(users, eq(smallGroups.leaderId, users.id)).where(eq(smallGroups.isActive, true)).orderBy(asc(smallGroups.name));
    return rows.map(r => ({
      id: r.id, name: r.name, description: r.description, leaderId: r.leaderId,
      meetingDay: r.meetingDay, meetingTime: r.meetingTime, meetingLocation: r.meetingLocation,
      meetingUrl: r.meetingUrl, maxMembers: r.maxMembers, isActive: r.isActive, createdAt: r.createdAt,
      leader: { username: r.leaderUsername, displayName: r.leaderDisplayName },
      memberCount: Number(r.memberCount),
    }));
  }

  async updateSmallGroup(id: number, data: UpdateSmallGroup): Promise<SmallGroup | undefined> {
    const [g] = await db.update(smallGroups).set(data).where(eq(smallGroups.id, id)).returning();
    return g;
  }

  async deleteSmallGroup(id: number): Promise<void> {
    await db.delete(smallGroupMessages).where(eq(smallGroupMessages.groupId, id));
    // delete attendance for meetings of this group
    const meetings = await db.select({ id: smallGroupMeetings.id }).from(smallGroupMeetings).where(eq(smallGroupMeetings.groupId, id));
    for (const m of meetings) {
      await db.delete(smallGroupAttendance).where(eq(smallGroupAttendance.meetingId, m.id));
    }
    await db.delete(smallGroupMeetings).where(eq(smallGroupMeetings.groupId, id));
    await db.delete(smallGroupMembers).where(eq(smallGroupMembers.groupId, id));
    await db.delete(smallGroups).where(eq(smallGroups.id, id));
  }

  async joinSmallGroup(groupId: number, userId: number): Promise<SmallGroupMember> {
    // Check if already a member
    const [existing] = await db.select().from(smallGroupMembers).where(and(eq(smallGroupMembers.groupId, groupId), eq(smallGroupMembers.userId, userId)));
    if (existing) return existing;
    const [m] = await db.insert(smallGroupMembers).values({ groupId, userId, role: "miembro" }).returning();
    return m;
  }

  async leaveSmallGroup(groupId: number, userId: number): Promise<void> {
    await db.delete(smallGroupMembers).where(and(eq(smallGroupMembers.groupId, groupId), eq(smallGroupMembers.userId, userId)));
  }

  async listSmallGroupMembers(groupId: number): Promise<(SmallGroupMember & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]> {
    const rows = await db.select({
      id: smallGroupMembers.id,
      groupId: smallGroupMembers.groupId,
      userId: smallGroupMembers.userId,
      role: smallGroupMembers.role,
      joinedAt: smallGroupMembers.joinedAt,
      username: users.username,
      displayName: users.displayName,
      avatarUrl: users.avatarUrl,
    }).from(smallGroupMembers).innerJoin(users, eq(smallGroupMembers.userId, users.id)).where(eq(smallGroupMembers.groupId, groupId));
    return rows.map(r => ({
      id: r.id, groupId: r.groupId, userId: r.userId, role: r.role, joinedAt: r.joinedAt,
      user: { id: r.userId, username: r.username, displayName: r.displayName, avatarUrl: r.avatarUrl },
    }));
  }

  async createSmallGroupMeeting(data: InsertSmallGroupMeeting): Promise<SmallGroupMeeting> {
    const [m] = await db.insert(smallGroupMeetings).values({ ...data, meetingDate: new Date(data.meetingDate) }).returning();
    return m;
  }

  async listSmallGroupMeetings(groupId: number): Promise<SmallGroupMeeting[]> {
    return db.select().from(smallGroupMeetings).where(eq(smallGroupMeetings.groupId, groupId)).orderBy(desc(smallGroupMeetings.meetingDate));
  }

  async sendSmallGroupMessage(userId: number, data: InsertSmallGroupMessage): Promise<SmallGroupMessage> {
    const [m] = await db.insert(smallGroupMessages).values({ ...data, userId }).returning();
    return m;
  }

  async listSmallGroupMessages(groupId: number): Promise<(SmallGroupMessage & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]> {
    const rows = await db.select({
      id: smallGroupMessages.id,
      groupId: smallGroupMessages.groupId,
      userId: smallGroupMessages.userId,
      content: smallGroupMessages.content,
      createdAt: smallGroupMessages.createdAt,
      username: users.username,
      displayName: users.displayName,
      avatarUrl: users.avatarUrl,
    }).from(smallGroupMessages).innerJoin(users, eq(smallGroupMessages.userId, users.id)).where(eq(smallGroupMessages.groupId, groupId)).orderBy(asc(smallGroupMessages.createdAt));
    return rows.map(r => ({
      id: r.id, groupId: r.groupId, userId: r.userId, content: r.content, createdAt: r.createdAt,
      user: { id: r.userId, username: r.username, displayName: r.displayName, avatarUrl: r.avatarUrl },
    }));
  }

  async getUserSmallGroups(userId: number): Promise<number[]> {
    const rows = await db.select({ groupId: smallGroupMembers.groupId }).from(smallGroupMembers).where(eq(smallGroupMembers.userId, userId));
    return rows.map(r => r.groupId);
  }

  // ========== REPORTS ==========

  async getReportDashboard(): Promise<any> {
    const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
    const [activeUsers] = await db.select({ count: sql<number>`count(*)` }).from(users).where(eq(users.isActive, true));
    const [courseCount] = await db.select({ count: sql<number>`count(*)` }).from(courses);
    const [activeCourses] = await db.select({ count: sql<number>`count(*)` }).from(courses).where(eq(courses.isActive, true));
    const [enrollmentCount] = await db.select({ count: sql<number>`count(*)` }).from(enrollments);
    const [completedEnrollments] = await db.select({ count: sql<number>`count(*)` }).from(enrollments).where(eq(enrollments.status, "completado"));
    const [eventCount] = await db.select({ count: sql<number>`count(*)` }).from(events);
    const [prayerCount] = await db.select({ count: sql<number>`count(*)` }).from(prayerActivities);
    const [sermonCount] = await db.select({ count: sql<number>`count(*)` }).from(sermons);
    const [groupCount] = await db.select({ count: sql<number>`count(*)` }).from(smallGroups);
    return {
      totalUsers: Number(userCount.count),
      activeUsers: Number(activeUsers.count),
      totalCourses: Number(courseCount.count),
      activeCourses: Number(activeCourses.count),
      totalEnrollments: Number(enrollmentCount.count),
      completedEnrollments: Number(completedEnrollments.count),
      totalEvents: Number(eventCount.count),
      totalPrayerActivities: Number(prayerCount.count),
      totalSermons: Number(sermonCount.count),
      totalSmallGroups: Number(groupCount.count),
    };
  }

  async getMemberGrowthReport(): Promise<any> {
    const rows = await db.select({
      month: sql<string>`to_char(${users.createdAt}, 'YYYY-MM')`,
      count: sql<number>`count(*)`,
    }).from(users).groupBy(sql`to_char(${users.createdAt}, 'YYYY-MM')`).orderBy(sql`to_char(${users.createdAt}, 'YYYY-MM')`);
    // Also by country
    const byCountry = await db.select({
      country: users.country,
      count: sql<number>`count(*)`,
    }).from(users).where(sql`${users.country} IS NOT NULL`).groupBy(users.country).orderBy(desc(sql`count(*)`));
    return { monthly: rows, byCountry };
  }

  async getCourseStatsReport(): Promise<any> {
    const courseRows = await db.select({
      id: courses.id,
      title: courses.title,
      category: courses.category,
      enrolled: sql<number>`(SELECT count(*) FROM enrollments WHERE course_id = ${courses.id} AND status = 'aprobado')`,
      completed: sql<number>`(SELECT count(*) FROM enrollments WHERE course_id = ${courses.id} AND status = 'completado')`,
      pending: sql<number>`(SELECT count(*) FROM enrollments WHERE course_id = ${courses.id} AND status = 'solicitado')`,
    }).from(courses).orderBy(desc(sql`(SELECT count(*) FROM enrollments WHERE course_id = ${courses.id})`));
    return courseRows;
  }

  async getAttendanceReport(): Promise<any> {
    const rows = await db.select({
      sessionId: sessionAttendance.sessionId,
      status: sessionAttendance.status,
      count: sql<number>`count(*)`,
    }).from(sessionAttendance).groupBy(sessionAttendance.sessionId, sessionAttendance.status);
    return rows;
  }

  async getPrayerStatsReport(): Promise<any> {
    const activities = await db.select({
      month: sql<string>`to_char(${prayerActivities.createdAt}, 'YYYY-MM')`,
      count: sql<number>`count(*)`,
    }).from(prayerActivities).groupBy(sql`to_char(${prayerActivities.createdAt}, 'YYYY-MM')`).orderBy(sql`to_char(${prayerActivities.createdAt}, 'YYYY-MM')`);
    const attendees = await db.select({
      month: sql<string>`to_char(${prayerAttendees.createdAt}, 'YYYY-MM')`,
      count: sql<number>`count(*)`,
    }).from(prayerAttendees).groupBy(sql`to_char(${prayerAttendees.createdAt}, 'YYYY-MM')`).orderBy(sql`to_char(${prayerAttendees.createdAt}, 'YYYY-MM')`);
    return { activities, attendees };
  }

  async getLibraryStatsReport(): Promise<any> {
    const byCategory = await db.select({
      category: libraryResources.category,
      count: sql<number>`count(*)`,
    }).from(libraryResources).groupBy(libraryResources.category);
    const topLiked = await db.select({
      resourceId: libraryResourceLikes.resourceId,
      count: sql<number>`count(*)`,
    }).from(libraryResourceLikes).groupBy(libraryResourceLikes.resourceId).orderBy(desc(sql`count(*)`)).limit(10);
    // Get reading plan completion
    const planStats = await db.select({
      total: sql<number>`count(*)`,
      completed: sql<number>`count(*) FILTER (WHERE ${readingPlanItems.isCompleted} = true)`,
    }).from(readingPlanItems);
    return { byCategory, topLiked, planStats: planStats[0] };
  }

  // ========== CALENDAR ==========

  async getCalendarEvents(start?: string, end?: string): Promise<any[]> {
    const calendarItems: any[] = [];
    // Events
    const allEvents = await db.select().from(events).where(eq(events.isPublished, true)).orderBy(asc(events.eventDate));
    for (const e of allEvents) {
      calendarItems.push({ type: "evento", id: e.id, title: e.title, date: e.eventDate, endDate: e.eventEndDate, location: e.location, link: "/eventos" });
    }
    // Course sessions
    const sessions = await db.select({
      id: courseSessions.id,
      title: courseSessions.title,
      sessionDate: courseSessions.sessionDate,
      courseId: courseSessions.courseId,
      courseTitle: courses.title,
    }).from(courseSessions).innerJoin(courses, eq(courseSessions.courseId, courses.id)).orderBy(asc(courseSessions.sessionDate));
    for (const s of sessions) {
      calendarItems.push({ type: "sesion", id: s.id, title: `${s.courseTitle}: ${s.title}`, date: s.sessionDate, link: `/aula/${s.courseId}` });
    }
    // Prayer activities
    const prayers = await db.select().from(prayerActivities).where(eq(prayerActivities.isActive, true)).orderBy(asc(prayerActivities.scheduledDate));
    for (const p of prayers) {
      if (p.scheduledDate) {
        calendarItems.push({ type: "oracion", id: p.id, title: p.title, date: p.scheduledDate, link: "/oracion" });
      }
    }
    // Sort by date
    calendarItems.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db2 = b.date ? new Date(b.date).getTime() : 0;
      return da - db2;
    });
    return calendarItems;
  }

  // ========== FRIENDS SYSTEM ==========
  async listFriends(userId: number): Promise<any[]> {
    const rows = await db
      .select()
      .from(friendships)
      .where(
        and(
          or(
            eq(friendships.requesterId, userId),
            eq(friendships.addresseeId, userId)
          ),
          eq(friendships.status, "accepted")
        )
      );
    // Enrich with user data
    const result: any[] = [];
    for (const f of rows) {
      const friendId = f.requesterId === userId ? f.addresseeId : f.requesterId;
      const friend = await this.getUser(friendId);
      if (friend) {
        result.push({
          id: f.id,
          status: f.status,
          createdAt: f.createdAt,
          friend: {
            id: friend.id,
            username: friend.username,
            displayName: friend.displayName,
            avatarUrl: friend.avatarUrl,
          },
        });
      }
    }
    return result;
  }

  async listFriendRequests(userId: number): Promise<any[]> {
    const rows = await db
      .select()
      .from(friendships)
      .where(
        and(
          eq(friendships.addresseeId, userId),
          eq(friendships.status, "pending")
        )
      )
      .orderBy(desc(friendships.createdAt));
    const result: any[] = [];
    for (const f of rows) {
      const requester = await this.getUser(f.requesterId);
      if (requester) {
        result.push({
          id: f.id,
          status: f.status,
          createdAt: f.createdAt,
          requester: {
            id: requester.id,
            username: requester.username,
            displayName: requester.displayName,
            avatarUrl: requester.avatarUrl,
          },
        });
      }
    }
    return result;
  }

  async searchUsersForFriends(userId: number, query: string): Promise<any[]> {
    if (!query || query.trim().length === 0) return [];
    const q = `%${query.trim()}%`;
    const foundUsers = await db
      .select({
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .where(
        and(
          ne(users.id, userId),
          eq(users.isActive, true),
          or(
            ilike(users.username, q),
            ilike(users.displayName, q)
          )
        )
      )
      .limit(20);

    // Check existing friendship status for each result
    const result: any[] = [];
    for (const u of foundUsers) {
      const existing = await db
        .select()
        .from(friendships)
        .where(
          or(
            and(eq(friendships.requesterId, userId), eq(friendships.addresseeId, u.id)),
            and(eq(friendships.requesterId, u.id), eq(friendships.addresseeId, userId))
          )
        )
        .limit(1);
      result.push({
        ...u,
        friendshipStatus: existing.length > 0 ? existing[0].status : null,
        friendshipId: existing.length > 0 ? existing[0].id : null,
      });
    }
    return result;
  }

  async sendFriendRequest(requesterId: number, addresseeId: number): Promise<any> {
    // Check if friendship already exists
    const existing = await db
      .select()
      .from(friendships)
      .where(
        or(
          and(eq(friendships.requesterId, requesterId), eq(friendships.addresseeId, addresseeId)),
          and(eq(friendships.requesterId, addresseeId), eq(friendships.addresseeId, requesterId))
        )
      )
      .limit(1);
    if (existing.length > 0) {
      if (existing[0].status === "accepted") throw new Error("Ya son amigos");
      if (existing[0].status === "pending") throw new Error("Ya existe una solicitud pendiente");
      // If rejected, update to pending again
      const [updated] = await db
        .update(friendships)
        .set({ status: "pending", requesterId, addresseeId })
        .where(eq(friendships.id, existing[0].id))
        .returning();
      return updated;
    }
    const [created] = await db
      .insert(friendships)
      .values({ requesterId, addresseeId, status: "pending" })
      .returning();
    return created;
  }

  async acceptFriendRequest(friendshipId: number, userId: number): Promise<any> {
    const [f] = await db
      .select()
      .from(friendships)
      .where(eq(friendships.id, friendshipId))
      .limit(1);
    if (!f) throw new Error("Solicitud no encontrada");
    if (f.addresseeId !== userId) throw new Error("No tienes permiso para aceptar esta solicitud");
    if (f.status !== "pending") throw new Error("Esta solicitud ya fue procesada");
    const [updated] = await db
      .update(friendships)
      .set({ status: "accepted" })
      .where(eq(friendships.id, friendshipId))
      .returning();
    return updated;
  }

  async rejectFriendRequest(friendshipId: number, userId: number): Promise<any> {
    const [f] = await db
      .select()
      .from(friendships)
      .where(eq(friendships.id, friendshipId))
      .limit(1);
    if (!f) throw new Error("Solicitud no encontrada");
    if (f.addresseeId !== userId) throw new Error("No tienes permiso para rechazar esta solicitud");
    const [updated] = await db
      .update(friendships)
      .set({ status: "rejected" })
      .where(eq(friendships.id, friendshipId))
      .returning();
    return updated;
  }

  async removeFriend(friendshipId: number, userId: number): Promise<void> {
    const [f] = await db
      .select()
      .from(friendships)
      .where(eq(friendships.id, friendshipId))
      .limit(1);
    if (!f) throw new Error("Amistad no encontrada");
    if (f.requesterId !== userId && f.addresseeId !== userId) {
      throw new Error("No tienes permiso para eliminar esta amistad");
    }
    await db.delete(friendships).where(eq(friendships.id, friendshipId));
  }

  // ========== DIRECT MESSAGES ==========
  async sendDirectMessage(senderId: number, data: InsertDirectMessage): Promise<DirectMessage> {
    const [msg] = await db
      .insert(directMessages)
      .values({
        senderId,
        receiverId: data.receiverId,
        content: data.content,
        isRead: false,
      })
      .returning();
    return msg;
  }

  async listConversations(userId: number): Promise<any[]> {
    // Get all DMs involving this user
    const allMessages = await db
      .select()
      .from(directMessages)
      .where(
        or(
          eq(directMessages.senderId, userId),
          eq(directMessages.receiverId, userId)
        )
      )
      .orderBy(desc(directMessages.createdAt));

    // Group by other user
    const conversationMap = new Map<number, { lastMessage: typeof allMessages[0]; unreadCount: number }>();
    for (const msg of allMessages) {
      const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
      if (!conversationMap.has(otherUserId)) {
        conversationMap.set(otherUserId, { lastMessage: msg, unreadCount: 0 });
      }
      if (msg.receiverId === userId && !msg.isRead) {
        const entry = conversationMap.get(otherUserId)!;
        entry.unreadCount++;
      }
    }

    const result: any[] = [];
    for (const [otherUserId, data] of conversationMap) {
      const otherUser = await this.getUser(otherUserId);
      if (otherUser) {
        result.push({
          user: {
            id: otherUser.id,
            username: otherUser.username,
            displayName: otherUser.displayName,
            avatarUrl: otherUser.avatarUrl,
          },
          lastMessage: {
            id: data.lastMessage.id,
            content: data.lastMessage.content,
            senderId: data.lastMessage.senderId,
            createdAt: data.lastMessage.createdAt,
            isRead: data.lastMessage.isRead,
          },
          unreadCount: data.unreadCount,
        });
      }
    }
    return result;
  }

  async listDirectMessages(userId: number, otherUserId: number): Promise<(DirectMessage & { sender: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]> {
    const msgs = await db
      .select()
      .from(directMessages)
      .where(
        or(
          and(eq(directMessages.senderId, userId), eq(directMessages.receiverId, otherUserId)),
          and(eq(directMessages.senderId, otherUserId), eq(directMessages.receiverId, userId))
        )
      )
      .orderBy(asc(directMessages.createdAt));
    const result: any[] = [];
    for (const msg of msgs) {
      const sender = await this.getUser(msg.senderId);
      result.push({
        ...msg,
        sender: sender
          ? { id: sender.id, username: sender.username, displayName: sender.displayName, avatarUrl: sender.avatarUrl }
          : { id: msg.senderId, username: "Desconocido", displayName: null, avatarUrl: null },
      });
    }
    return result;
  }

  async markDirectMessagesRead(userId: number, senderId: number): Promise<void> {
    await db
      .update(directMessages)
      .set({ isRead: true })
      .where(
        and(
          eq(directMessages.senderId, senderId),
          eq(directMessages.receiverId, userId),
          eq(directMessages.isRead, false)
        )
      );
  }

  async getUnreadDirectMessageCount(userId: number): Promise<number> {
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(directMessages)
      .where(
        and(
          eq(directMessages.receiverId, userId),
          eq(directMessages.isRead, false)
        )
      );
    return result[0]?.count || 0;
  }

  // ========== LIVE EVENT MONITORING ==========

  async createLiveEventSession(data: { context: string; contextId: string; title: string; roomName: string; startedBy: number }): Promise<LiveEventSession> {
    const [session] = await db.insert(liveEventSessions).values({
      context: data.context,
      contextId: data.contextId,
      title: data.title,
      roomName: data.roomName,
      startedBy: data.startedBy,
      startedAt: new Date(),
      status: "active",
    }).returning();
    return session;
  }

  async endLiveEventSession(sessionId: number): Promise<LiveEventSession | undefined> {
    const [session] = await db.select().from(liveEventSessions).where(eq(liveEventSessions.id, sessionId));
    if (!session) return undefined;
    const endedAt = new Date();
    const durationMinutes = session.startedAt ? Math.round((endedAt.getTime() - new Date(session.startedAt).getTime()) / 60000) : 0;
    // Count total joins and peak concurrent
    const joinStats = await db
      .select({
        totalJoins: sql<number>`count(*)::int`,
        uniqueUsers: sql<number>`count(distinct user_id)::int`,
      })
      .from(liveEventAttendance)
      .where(eq(liveEventAttendance.sessionId, sessionId));
    // Also update any attendance records that are still open
    await db.update(liveEventAttendance)
      .set({
        leftAt: endedAt,
        durationMinutes: sql`GREATEST(1, EXTRACT(EPOCH FROM (${endedAt}::timestamp - joined_at)) / 60)::int`,
      })
      .where(
        and(
          eq(liveEventAttendance.sessionId, sessionId),
          sql`left_at IS NULL`
        )
      );
    const [updated] = await db.update(liveEventSessions)
      .set({
        endedAt,
        durationMinutes,
        status: "ended",
        totalJoins: joinStats[0]?.totalJoins || 0,
        peakViewers: joinStats[0]?.uniqueUsers || 0,
      })
      .where(eq(liveEventSessions.id, sessionId))
      .returning();
    return updated;
  }

  async getActiveLiveSession(context: string, contextId: string): Promise<LiveEventSession | undefined> {
    const [session] = await db.select().from(liveEventSessions)
      .where(
        and(
          eq(liveEventSessions.context, context),
          eq(liveEventSessions.contextId, contextId),
          eq(liveEventSessions.status, "active")
        )
      )
      .orderBy(desc(liveEventSessions.startedAt))
      .limit(1);
    return session;
  }

  async trackLiveEventJoin(sessionId: number, userId: number): Promise<LiveEventAttendance> {
    // Check if user already has an open attendance record for this session
    const [existing] = await db.select().from(liveEventAttendance)
      .where(
        and(
          eq(liveEventAttendance.sessionId, sessionId),
          eq(liveEventAttendance.userId, userId),
          sql`left_at IS NULL`
        )
      );
    if (existing) return existing;
    // Check if user has previous records for this session (to increment joinCount)
    const prevRecords = await db.select({ count: sql<number>`count(*)::int` })
      .from(liveEventAttendance)
      .where(
        and(
          eq(liveEventAttendance.sessionId, sessionId),
          eq(liveEventAttendance.userId, userId)
        )
      );
    const joinCount = (prevRecords[0]?.count || 0) + 1;
    const [record] = await db.insert(liveEventAttendance).values({
      sessionId,
      userId,
      joinedAt: new Date(),
      joinCount,
    }).returning();
    // Update peak viewers on session
    const currentViewers = await db.select({ count: sql<number>`count(*)::int` })
      .from(liveEventAttendance)
      .where(
        and(
          eq(liveEventAttendance.sessionId, sessionId),
          sql`left_at IS NULL`
        )
      );
    const peak = currentViewers[0]?.count || 0;
    await db.update(liveEventSessions)
      .set({ peakViewers: sql`GREATEST(peak_viewers, ${peak})` })
      .where(eq(liveEventSessions.id, sessionId));
    return record;
  }

  async trackLiveEventLeave(sessionId: number, userId: number): Promise<void> {
    const now = new Date();
    await db.update(liveEventAttendance)
      .set({
        leftAt: now,
        durationMinutes: sql`GREATEST(1, EXTRACT(EPOCH FROM (${now}::timestamp - joined_at)) / 60)::int`,
      })
      .where(
        and(
          eq(liveEventAttendance.sessionId, sessionId),
          eq(liveEventAttendance.userId, userId),
          sql`left_at IS NULL`
        )
      );
  }

  async getLiveEventReport(): Promise<any> {
    const sessions = await db
      .select({
        id: liveEventSessions.id,
        context: liveEventSessions.context,
        contextId: liveEventSessions.contextId,
        title: liveEventSessions.title,
        roomName: liveEventSessions.roomName,
        startedBy: liveEventSessions.startedBy,
        startedAt: liveEventSessions.startedAt,
        endedAt: liveEventSessions.endedAt,
        durationMinutes: liveEventSessions.durationMinutes,
        peakViewers: liveEventSessions.peakViewers,
        totalJoins: liveEventSessions.totalJoins,
        status: liveEventSessions.status,
        creatorName: sql<string>`COALESCE(u.display_name, u.username)`,
        creatorUsername: users.username,
      })
      .from(liveEventSessions)
      .innerJoin(users, eq(liveEventSessions.startedBy, users.id))
      .orderBy(desc(liveEventSessions.startedAt));

    // Get unique attendee counts per session
    const attendeeCounts = await db
      .select({
        sessionId: liveEventAttendance.sessionId,
        uniqueUsers: sql<number>`count(distinct user_id)::int`,
        totalConnections: sql<number>`count(*)::int`,
        avgDuration: sql<number>`COALESCE(AVG(duration_minutes), 0)::int`,
      })
      .from(liveEventAttendance)
      .groupBy(liveEventAttendance.sessionId);

    const countsMap = new Map(attendeeCounts.map(c => [c.sessionId, c]));

    // Summary stats
    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
    const activeSessions = sessions.filter(s => s.status === "active").length;
    const totalUniqueAttendees = new Set(attendeeCounts.flatMap(c => [])).size; // Simplified

    // Context labels
    const contextLabels: Record<string, string> = { prayer: "Oración", event: "Evento", live: "En Vivo", classroom: "Aula" };

    return {
      sessions: sessions.map(s => ({
        ...s,
        contextLabel: contextLabels[s.context] || s.context,
        uniqueAttendees: countsMap.get(s.id)?.uniqueUsers || 0,
        totalConnections: countsMap.get(s.id)?.totalConnections || 0,
        avgDuration: countsMap.get(s.id)?.avgDuration || 0,
      })),
      summary: {
        totalSessions,
        activeSessions,
        totalDuration,
        avgDuration: totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0,
      },
    };
  }

  async getLiveEventSessionDetail(sessionId: number): Promise<any> {
    const [session] = await db
      .select({
        id: liveEventSessions.id,
        context: liveEventSessions.context,
        contextId: liveEventSessions.contextId,
        title: liveEventSessions.title,
        roomName: liveEventSessions.roomName,
        startedBy: liveEventSessions.startedBy,
        startedAt: liveEventSessions.startedAt,
        endedAt: liveEventSessions.endedAt,
        durationMinutes: liveEventSessions.durationMinutes,
        peakViewers: liveEventSessions.peakViewers,
        totalJoins: liveEventSessions.totalJoins,
        status: liveEventSessions.status,
        creatorName: sql<string>`COALESCE(u.display_name, u.username)`,
        creatorUsername: users.username,
      })
      .from(liveEventSessions)
      .innerJoin(users, eq(liveEventSessions.startedBy, users.id))
      .where(eq(liveEventSessions.id, sessionId));

    if (!session) return null;

    const attendees = await db
      .select({
        id: liveEventAttendance.id,
        userId: liveEventAttendance.userId,
        joinedAt: liveEventAttendance.joinedAt,
        leftAt: liveEventAttendance.leftAt,
        durationMinutes: liveEventAttendance.durationMinutes,
        joinCount: liveEventAttendance.joinCount,
        userName: sql<string>`COALESCE(u2.display_name, u2.username)`,
        userUsername: sql<string>`u2.username`,
        userAvatar: sql<string>`u2.avatar_url`,
      })
      .from(liveEventAttendance)
      .innerJoin(sql`users u2`, sql`u2.id = ${liveEventAttendance.userId}`)
      .where(eq(liveEventAttendance.sessionId, sessionId))
      .orderBy(desc(liveEventAttendance.joinedAt));

    const contextLabels: Record<string, string> = { prayer: "Oración", event: "Evento", live: "En Vivo", classroom: "Aula" };

    return {
      ...session,
      contextLabel: contextLabels[session.context] || session.context,
      attendees,
      uniqueAttendees: new Set(attendees.map(a => a.userId)).size,
      totalConnections: attendees.length,
    };
  }

  // ========== REFORMA MINISTERIAL: IMPLEMENTACIONES ==========

  // Teacher Profiles
  async getTeacherProfile(userId: number): Promise<TeacherProfile | undefined> {
    const [profile] = await db.select().from(teacherProfiles).where(eq(teacherProfiles.userId, userId));
    return profile;
  }

  async createTeacherProfile(userId: number, data: InsertTeacherProfile): Promise<TeacherProfile> {
    const [profile] = await db.insert(teacherProfiles).values({ ...data, userId }).returning();
    return profile;
  }

  async updateTeacherProfile(userId: number, data: UpdateTeacherProfile): Promise<TeacherProfile | undefined> {
    const [profile] = await db.update(teacherProfiles).set({ ...data, updatedAt: new Date() }).where(eq(teacherProfiles.userId, userId)).returning();
    return profile;
  }

  async listTeacherProfiles(): Promise<(TeacherProfile & { user: { id: number; username: string; displayName: string | null; avatarUrl: string | null } })[]> {
    const rows = await db
      .select({
        profile: teacherProfiles,
        user: { id: users.id, username: users.username, displayName: users.displayName, avatarUrl: users.avatarUrl },
      })
      .from(teacherProfiles)
      .innerJoin(users, eq(teacherProfiles.userId, users.id))
      .orderBy(desc(teacherProfiles.createdAt));
    return rows.map(r => ({ ...r.profile, user: r.user }));
  }

  async approveTeacherProfile(userId: number, approvedBy: number): Promise<TeacherProfile | undefined> {
    const [profile] = await db.update(teacherProfiles).set({ isApproved: true, approvedAt: new Date(), approvedByUserId: approvedBy }).where(eq(teacherProfiles.userId, userId)).returning();
    return profile;
  }

  // Church Permissions
  async getChurchPermissions(churchId: number): Promise<(ChurchPermission & { user: { id: number; username: string; displayName: string | null } })[]> {
    const rows = await db
      .select({
        perm: churchPermissions,
        user: { id: users.id, username: users.username, displayName: users.displayName },
      })
      .from(churchPermissions)
      .innerJoin(users, eq(churchPermissions.userId, users.id))
      .where(eq(churchPermissions.churchId, churchId));
    return rows.map(r => ({ ...r.perm, user: r.user }));
  }

  async setChurchPermission(data: InsertChurchPermission, grantedBy: number): Promise<ChurchPermission> {
    // Upsert: delete existing then insert
    await db.delete(churchPermissions).where(and(eq(churchPermissions.userId, data.userId), eq(churchPermissions.churchId, data.churchId)));
    const [perm] = await db.insert(churchPermissions).values({ ...data, grantedBy }).returning();
    return perm;
  }

  async removeChurchPermission(userId: number, churchId: number): Promise<void> {
    await db.delete(churchPermissions).where(and(eq(churchPermissions.userId, userId), eq(churchPermissions.churchId, churchId)));
  }

  async getUserChurchRole(userId: number, churchId: number): Promise<string | null> {
    const [perm] = await db.select().from(churchPermissions).where(and(eq(churchPermissions.userId, userId), eq(churchPermissions.churchId, churchId)));
    return perm?.role ?? null;
  }

  // Alliance Requests
  async createAllianceRequest(data: InsertAllianceRequest): Promise<AllianceRequest> {
    const [req] = await db.insert(allianceRequests).values(data).returning();
    return req;
  }

  async listAllianceRequests(): Promise<AllianceRequest[]> {
    return db.select().from(allianceRequests).orderBy(desc(allianceRequests.createdAt));
  }

  async updateAllianceRequest(id: number, data: UpdateAllianceRequest, reviewedBy: number): Promise<AllianceRequest | undefined> {
    const [req] = await db.update(allianceRequests).set({ ...data, reviewedBy, resolvedAt: new Date() }).where(eq(allianceRequests.id, id)).returning();
    return req;
  }

  // Member Channeling
  async createMemberChanneling(userId: number, data: InsertMemberChanneling): Promise<MemberChanneling> {
    const [ch] = await db.insert(memberChanneling).values({ ...data, userId }).returning();
    return ch;
  }

  async listMemberChannelings(churchId?: number): Promise<(MemberChanneling & { user: { id: number; username: string; displayName: string | null } })[]> {
    const baseQuery = db
      .select({
        channeling: memberChanneling,
        user: { id: users.id, username: users.username, displayName: users.displayName },
      })
      .from(memberChanneling)
      .innerJoin(users, eq(memberChanneling.userId, users.id));

    const rows = churchId
      ? await baseQuery.where(eq(memberChanneling.targetChurchId, churchId)).orderBy(desc(memberChanneling.requestedAt))
      : await baseQuery.orderBy(desc(memberChanneling.requestedAt));

    return rows.map(r => ({ ...r.channeling, user: r.user }));
  }

  async resolveMemberChanneling(id: number, status: string, resolvedBy: number): Promise<MemberChanneling | undefined> {
    const [ch] = await db.update(memberChanneling).set({ status, resolvedBy, resolvedAt: new Date() }).where(eq(memberChanneling.id, id)).returning();
    if (ch && status === "aprobado") {
      // Automatically update user's churchId and memberType
      await db.update(users).set({ churchId: ch.targetChurchId, memberType: "iglesia" }).where(eq(users.id, ch.userId));
      // Record membership
      await db.insert(churchMemberships).values({ userId: ch.userId, churchId: ch.targetChurchId });
    }
    return ch;
  }

  // Course Teacher Assignments
  async createCourseTeacherAssignment(data: InsertCourseTeacherAssignment, proposedBy: number): Promise<CourseTeacherAssignment> {
    const [a] = await db.insert(courseTeacherAssignments).values({ ...data, proposedBy }).returning();
    return a;
  }

  async listCourseTeacherAssignments(courseId: number): Promise<(CourseTeacherAssignment & { teacher: { id: number; username: string; displayName: string | null } })[]> {
    const rows = await db
      .select({
        assignment: courseTeacherAssignments,
        teacher: { id: users.id, username: users.username, displayName: users.displayName },
      })
      .from(courseTeacherAssignments)
      .innerJoin(users, eq(courseTeacherAssignments.teacherUserId, users.id))
      .where(eq(courseTeacherAssignments.courseId, courseId))
      .orderBy(desc(courseTeacherAssignments.createdAt));
    return rows.map(r => ({ ...r.assignment, teacher: r.teacher }));
  }

  async updateCourseTeacherAssignment(id: number, data: UpdateCourseTeacherAssignment, approvedBy: number): Promise<CourseTeacherAssignment | undefined> {
    const [a] = await db.update(courseTeacherAssignments).set({ ...data, approvedBy, resolvedAt: new Date() }).where(eq(courseTeacherAssignments.id, id)).returning();
    if (a && data.status === "aprobado") {
      // Auto-assign teacher to the course
      await db.update(courses).set({ teacherId: a.teacherUserId }).where(eq(courses.id, a.courseId));
    }
    return a;
  }

  // Audit Log
  async createAuditLog(data: { userId?: number; action: string; entityType: string; entityId?: number; details?: string; ipAddress?: string }): Promise<AuditLog> {
    const [log] = await db.insert(auditLog).values(data).returning();
    return log;
  }

  async listAuditLogs(limit = 100): Promise<(AuditLog & { user?: { username: string; displayName: string | null } })[]> {
    const rows = await db
      .select({
        log: auditLog,
        user: { username: users.username, displayName: users.displayName },
      })
      .from(auditLog)
      .leftJoin(users, eq(auditLog.userId, users.id))
      .orderBy(desc(auditLog.createdAt))
      .limit(limit);
    return rows.map(r => ({ ...r.log, user: r.user ?? undefined }));
  }

  // Member Progress / Badges
  async awardBadge(userId: number, badgeType: string, details?: string): Promise<MemberProgressEntry> {
    const [badge] = await db.insert(memberProgress).values({ userId, badgeType, details }).returning();
    return badge;
  }

  async getUserBadges(userId: number): Promise<MemberProgressEntry[]> {
    return db.select().from(memberProgress).where(eq(memberProgress.userId, userId)).orderBy(desc(memberProgress.earnedAt));
  }

  // Church Dashboard
  async getChurchDashboard(churchId: number): Promise<{ memberCount: number; courseCount: number; eventCount: number }> {
    const [members] = await db.select({ count: sql<number>`count(*)` }).from(users).where(eq(users.churchId, churchId));
    const [coursesCount] = await db.select({ count: sql<number>`count(*)` }).from(courses).where(eq(courses.churchId, churchId));
    return {
      memberCount: Number(members?.count ?? 0),
      courseCount: Number(coursesCount?.count ?? 0),
      eventCount: 0, // Events don't have churchId yet
    };
  }

  async getChurchMembers(churchId: number): Promise<{ id: number; username: string; displayName: string | null; avatarUrl: string | null; memberType: string | null; role: string }[]> {
    return db
      .select({
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
        memberType: users.memberType,
        role: users.role,
      })
      .from(users)
      .where(eq(users.churchId, churchId))
      .orderBy(users.displayName);
  }
}

// Auto-check enrollment schedules and update status
export async function checkEnrollmentSchedules() {
  try {
    const now = new Date();
    // Open scheduled courses whose open date has passed
    await db.update(courses)
      .set({ enrollmentStatus: "open" })
      .where(
        and(
          eq(courses.enrollmentStatus, "scheduled"),
          sql`"enrollment_open_date" IS NOT NULL AND "enrollment_open_date" <= ${now}`
        )
      );
    // Close courses whose close date has passed
    await db.update(courses)
      .set({ enrollmentStatus: "closed" })
      .where(
        and(
          eq(courses.enrollmentStatus, "open"),
          sql`"enrollment_close_date" IS NOT NULL AND "enrollment_close_date" <= ${now}`
        )
      );
  } catch (err) {
    console.error("Error checking enrollment schedules:", err);
  }
}

// singleton instance for ease of use
export const storage: IStorage = new DatabaseStorage();
