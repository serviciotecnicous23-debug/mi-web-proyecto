import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { useMyEnrollments, useDeleteEnrollment } from "@/hooks/use-users";
import { Layout } from "@/components/layout";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, BookOpen, GraduationCap, XCircle, ArrowRight } from "lucide-react";
import { COURSE_CATEGORIES, ENROLLMENT_STATUSES } from "@shared/schema";

export default function MisCapacitaciones() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { data: enrollments, isLoading } = useMyEnrollments();
  const deleteEnrollment = useDeleteEnrollment();

  // Cambiar de página en un efecto, no durante el dibujado (React lo prohíbe).
  useEffect(() => {
    if (!authLoading && !user) setLocation(loginUrl());
  }, [authLoading, user, setLocation]);

  if (authLoading) {
    return <Layout><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  }
  if (!user) return null;

  const pending = enrollments?.filter((e: any) => e.status === "solicitado") || [];
  const active = enrollments?.filter((e: any) => e.status === "aprobado") || [];
  const completed = enrollments?.filter((e: any) => e.status === "completado") || [];
  const rejected = enrollments?.filter((e: any) => e.status === "rechazado") || [];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-mis-capacitaciones-title">Mis Capacitaciones</h1>
            <p className="text-muted-foreground text-sm">Gestiona tus inscripciones y revisa tu progreso</p>
          </div>
          <Link href="/capacitaciones">
            <Button variant="outline" size="sm" data-testid="button-explore-courses"><BookOpen className="w-4 h-4 mr-1" /> Explorar Cursos</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : !enrollments?.length ? (
          <Card>
            <CardContent className="py-12 text-center">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">Aún no te has inscrito en ningún curso.</p>
              <Link href="/capacitaciones">
                <Button data-testid="button-explore-capacitaciones">Explorar Capacitaciones</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {active.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" /> Cursos Activos ({active.length})
                </h2>
                <div className="grid gap-3">
                  {active.map((e: any) => (
                    <EnrollmentCard key={e.id} enrollment={e} />
                  ))}
                </div>
              </section>
            )}
            {pending.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Pendientes de aprobación ({pending.length})</h2>
                <div className="grid gap-3">
                  {pending.map((e: any) => (
                    <EnrollmentCard key={e.id} enrollment={e} onCancel={() => deleteEnrollment.mutate({ id: e.id, courseId: e.courseId })} />
                  ))}
                </div>
              </section>
            )}
            {completed.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Completados ({completed.length})</h2>
                <div className="grid gap-3">
                  {completed.map((e: any) => (
                    <EnrollmentCard key={e.id} enrollment={e} />
                  ))}
                </div>
              </section>
            )}
            {rejected.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3 text-muted-foreground">Rechazados ({rejected.length})</h2>
                <div className="grid gap-3">
                  {rejected.map((e: any) => (
                    <EnrollmentCard key={e.id} enrollment={e} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

function EnrollmentCard({ enrollment, onCancel }: { enrollment: any; onCancel?: () => void }) {
  const statusVariant = enrollment.status === "aprobado" ? "default" : enrollment.status === "completado" ? "secondary" : enrollment.status === "rechazado" ? "destructive" : "outline";

  return (
    <Card data-testid={`card-enrollment-${enrollment.id}`}>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold">{enrollment.course.title}</h3>
              <Badge variant={statusVariant}>
                {ENROLLMENT_STATUSES[enrollment.status as keyof typeof ENROLLMENT_STATUSES]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{enrollment.course.description}</p>
            <Badge variant="outline" className="text-xs">
              {COURSE_CATEGORIES[enrollment.course.category as keyof typeof COURSE_CATEGORIES] || enrollment.course.category}
            </Badge>
            {enrollment.grade && (
              <p className="text-sm mt-2"><span className="text-muted-foreground">Calificación:</span> <span className="font-semibold">{enrollment.grade}</span></p>
            )}
            {enrollment.observations && (
              <p className="text-sm mt-1"><span className="text-muted-foreground">Observaciones:</span> {enrollment.observations}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(enrollment.status === "aprobado" || enrollment.status === "completado") && (
              <Link href={`/aula/${enrollment.courseId}`}>
                <Button size="sm" data-testid={`button-enter-aula-${enrollment.id}`}>
                  <BookOpen className="w-4 h-4 mr-1" /> Aula Virtual
                </Button>
              </Link>
            )}
            {onCancel && (
              <Button size="sm" variant="ghost" onClick={onCancel} data-testid={`button-cancel-enrollment-${enrollment.id}`}>
                <XCircle className="w-4 h-4 mr-1" /> Cancelar
              </Button>
            )}
            <Link href={`/capacitaciones/${enrollment.courseId}`}>
              <Button size="sm" variant="outline" data-testid={`button-goto-course-${enrollment.id}`}>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
