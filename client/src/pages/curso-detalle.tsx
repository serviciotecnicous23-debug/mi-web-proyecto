import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useCourse, useCourseMaterials, useCourseSessions, useCreateEnrollment, useMyEnrollments, useMyTeacherRequests, useCreateTeacherRequest } from "@/hooks/use-users";
import { Layout } from "@/components/layout";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2, BookOpen, Calendar, Clock, Video, FileText, Link as LinkIcon,
  Music, Presentation, GraduationCap, ExternalLink, ArrowLeft, Users, Shield, UserCircle,
} from "lucide-react";
import { COURSE_CATEGORIES, ENROLLMENT_STATUSES, MATERIAL_TYPES, TEACHER_REQUEST_STATUSES } from "@shared/schema";
import type { CourseMaterial, CourseSession } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const materialIcons: Record<string, any> = {
  documento: FileText,
  video: Video,
  enlace: LinkIcon,
  audio: Music,
  presentacion: Presentation,
};

export default function CursoDetalle({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id);
  const { user } = useAuth();
  const { data: course, isLoading } = useCourse(courseId);
  const { data: sessions } = useCourseSessions(courseId);
  const { data: myEnrollments } = useMyEnrollments();
  const createEnrollment = useCreateEnrollment();
  const { data: myTeacherRequests } = useMyTeacherRequests();
  const createTeacherRequest = useCreateTeacherRequest();
  const [showTeachRequestForm, setShowTeachRequestForm] = useState(false);
  const [teachMessage, setTeachMessage] = useState("");

  const myEnrollment = myEnrollments?.find((e: any) => e.courseId === courseId);
  const myTeachRequest = myTeacherRequests?.find((r: any) => r.courseId === courseId);
  const isObrero = user?.role === "obrero" || user?.role === "admin";
  const isTeacher = course?.teacherId === user?.id;
  const isEnrolled = myEnrollment && (myEnrollment.status === "aprobado" || myEnrollment.status === "completado");
  const isAdminUser = user?.role === "admin" || user?.role === "director" || user?.role === "staff_global";
  const { data: materials } = useCourseMaterials(courseId, !!(isEnrolled || isTeacher || isAdminUser));

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h2 className="text-xl font-semibold mb-2">Curso no encontrado</h2>
          <Link href="/capacitaciones">
            <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-1" /> Volver a Capacitaciones</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/capacitaciones">
          <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back-courses">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver a Capacitaciones
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {course.imageUrl && (
              <div className="h-56 overflow-hidden rounded-md">
                <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <Badge variant="secondary" className="mb-2">
                {COURSE_CATEGORIES[course.category as keyof typeof COURSE_CATEGORIES] || course.category}
              </Badge>
              <h1 className="text-2xl font-bold mb-3" data-testid="text-course-detail-title">{course.title}</h1>
              <p className="text-muted-foreground whitespace-pre-wrap">{course.description}</p>

              {(course as any).teacher && (
                <div className="flex items-center gap-3 mt-4 p-3 bg-muted/50 rounded-md">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={(course as any).teacher.avatarUrl} />
                    <AvatarFallback>
                      {((course as any).teacher.displayName || (course as any).teacher.username || "?").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{(course as any).teacher.displayName || (course as any).teacher.username}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><UserCircle className="w-3 h-3" /> Maestro del curso</p>
                    {(course as any).teacher.bio && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{(course as any).teacher.bio}</p>}
                  </div>
                </div>
              )}
            </div>

            {sessions && sessions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Horario de Clases
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sessions.map((s: CourseSession) => (
                    <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-md bg-muted/50" data-testid={`session-${s.id}`}>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{s.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(s.sessionDate).toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          {s.duration ? ` - ${s.duration} min` : ""}
                        </p>
                        {s.description && <p className="text-xs text-muted-foreground mt-1">{s.description}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        {s.isCompleted && <Badge variant="secondary">Completada</Badge>}
                        {s.meetingUrl && isEnrolled && !s.isCompleted && (
                          <a href={s.meetingUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" data-testid={`button-join-session-${s.id}`}>
                              <Video className="w-4 h-4 mr-1" /> Unirse
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {materials && materials.length > 0 && isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> Materiales y Recursos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {materials.map((m: CourseMaterial) => {
                    const Icon = materialIcons[m.materialType] || FileText;
                    return (
                      <div key={m.id} className="flex items-center justify-between gap-2 p-3 rounded-md bg-muted/50" data-testid={`material-${m.id}`}>
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Icon className="w-5 h-5 text-primary shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{m.title}</p>
                            {m.description && <p className="text-xs text-muted-foreground truncate">{m.description}</p>}
                            <Badge variant="outline" className="text-xs mt-1">
                              {MATERIAL_TYPES[m.materialType as keyof typeof MATERIAL_TYPES] || m.materialType}
                            </Badge>
                          </div>
                        </div>
                        {m.fileUrl && (
                          <a href={m.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Button size="icon" variant="ghost"><ExternalLink className="w-4 h-4" /></Button>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inscripción</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {myEnrollment ? (
                  <div className="space-y-3">
                    <Badge
                      variant={myEnrollment.status === "aprobado" ? "default" : myEnrollment.status === "completado" ? "secondary" : "outline"}
                      data-testid="badge-my-enrollment-status"
                    >
                      {ENROLLMENT_STATUSES[myEnrollment.status as keyof typeof ENROLLMENT_STATUSES]}
                    </Badge>
                    {(myEnrollment.status === "aprobado" || myEnrollment.status === "completado") && (
                      <Link href={`/aula/${course.id}`}>
                        <Button className="w-full" data-testid="button-enter-aula-detail">
                          <BookOpen className="w-4 h-4 mr-1" /> Entrar al Aula Virtual
                        </Button>
                      </Link>
                    )}
                    {myEnrollment.grade && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Calificación: </span>
                        <span className="font-semibold">{myEnrollment.grade}</span>
                      </div>
                    )}
                    {myEnrollment.observations && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Observaciones: </span>
                        <p className="text-sm mt-1">{myEnrollment.observations}</p>
                      </div>
                    )}
                  </div>
                ) : (course as any).enrollmentStatus === "closed" ? (
                  <div className="text-center py-2">
                    <Badge variant="destructive" className="mb-2">Inscripciones Cerradas</Badge>
                    <p className="text-sm text-muted-foreground">Las inscripciones para este curso no están disponibles en este momento.</p>
                  </div>
                ) : (course as any).enrollmentStatus === "scheduled" ? (
                  <div className="text-center py-2">
                    <Badge variant="outline" className="mb-2">Inscripciones Programadas</Badge>
                    <p className="text-sm text-muted-foreground">Las inscripciones se abrirán próximamente.</p>
                    {(course as any).enrollmentOpenDate && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Apertura: {new Date((course as any).enrollmentOpenDate).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                  </div>
                ) : user?.isActive ? (
                  <Button
                    className="w-full"
                    onClick={() => createEnrollment.mutate(course.id)}
                    disabled={createEnrollment.isPending}
                    data-testid="button-enroll-detail"
                  >
                    {createEnrollment.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <GraduationCap className="w-4 h-4 mr-1" />}
                    Solicitar inscripción
                  </Button>
                ) : !user ? (
                  <Link href="/login">
                    <Button className="w-full" variant="outline">Inicia sesión</Button>
                  </Link>
                ) : (
                  <p className="text-sm text-muted-foreground">Tu cuenta debe estar activa para inscribirte.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="text-sm text-muted-foreground flex items-center gap-2" data-testid="text-enrolled-count">
                  <Users className="w-4 h-4" /> Inscritos: {(course as any).enrolledCount || 0}{course.maxStudents ? ` / ${course.maxStudents}` : ""}
                </div>
                {(course as any).pendingCount > 0 && (
                  <div className="text-sm text-muted-foreground flex items-center gap-2" data-testid="text-pending-count">
                    <Clock className="w-4 h-4" /> Solicitudes pendientes: {(course as any).pendingCount}
                  </div>
                )}
              </CardContent>
            </Card>

            {isObrero && !isTeacher && user?.isActive && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" /> Ensenar este Curso
                  </CardTitle>
                  <CardDescription>Como obrero, puedes solicitar ser maestro de este curso.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {myTeachRequest ? (
                    <div className="space-y-2">
                      <Badge
                        variant={myTeachRequest.status === "aprobado" ? "default" : myTeachRequest.status === "rechazado" ? "destructive" : "outline"}
                        data-testid="badge-teach-request-status"
                      >
                        {TEACHER_REQUEST_STATUSES[myTeachRequest.status as keyof typeof TEACHER_REQUEST_STATUSES]}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {myTeachRequest.status === "solicitado" && "Tu solicitud esta siendo revisada por el administrador."}
                        {myTeachRequest.status === "aprobado" && "Has sido aprobado como maestro de este curso."}
                        {myTeachRequest.status === "rechazado" && "Tu solicitud fue rechazada."}
                      </p>
                    </div>
                  ) : showTeachRequestForm ? (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Mensaje opcional: explica tu experiencia o motivacion para ensenar este curso..."
                        value={teachMessage}
                        onChange={(e) => setTeachMessage(e.target.value)}
                        className="resize-none"
                        rows={3}
                        data-testid="textarea-teach-message"
                      />
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => {
                            createTeacherRequest.mutate({ courseId: course.id, message: teachMessage || undefined });
                            setShowTeachRequestForm(false);
                            setTeachMessage("");
                          }}
                          disabled={createTeacherRequest.isPending}
                          data-testid="button-submit-teach-request"
                        >
                          {createTeacherRequest.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                          Enviar Solicitud
                        </Button>
                        <Button variant="ghost" onClick={() => { setShowTeachRequestForm(false); setTeachMessage(""); }}>
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => setShowTeachRequestForm(true)}
                      data-testid="button-request-teach"
                    >
                      <Shield className="w-4 h-4 mr-1" /> Solicitar Ensenar
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
