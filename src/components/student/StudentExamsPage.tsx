import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, MapPin, FileText, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useDemo } from '@/contexts/DemoContext';
import { format, differenceInDays, isFuture, isToday } from 'date-fns';

interface StudentExamsPageProps {
  isDemo?: boolean;
}

// Demo data removed to ensure real data is used

export function StudentExamsPage({ isDemo = false }: StudentExamsPageProps) {
  const { user } = useAuth();
  const { isDemo: contextIsDemo, demoUserType } = useDemo();
  const effectiveDemo = isDemo || (contextIsDemo && demoUserType === 'student');

  // Get student's class_id first
  const { data: studentData } = useQuery({
    queryKey: ['student-for-exams', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user');
      const { data, error } = await supabase
        .from('students')
        .select('class_id')
        .eq('user_id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id && !effectiveDemo,
  });

  // Get exams for student's class
  const { data: exams, isLoading } = useQuery({
    queryKey: ['student-exams', studentData?.class_id],
    queryFn: async () => {
      if (!studentData?.class_id) return [];

      const { data, error } = await supabase
        .from('exams')
        .select(`
          *,
          exam_type:exam_types(name),
          subject:subjects(name, code)
        `)
        .eq('class_id', studentData.class_id)
        .gte('exam_date', new Date().toISOString().split('T')[0])
        .order('exam_date', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!studentData?.class_id && !effectiveDemo,
  });

  const displayExams = exams || [];

  const getExamStatus = (examDate: string) => {
    const date = new Date(examDate);
    if (isToday(date)) return { label: 'Today', variant: 'destructive' as const };
    const daysUntil = differenceInDays(date, new Date());
    if (daysUntil === 1) return { label: 'Tomorrow', variant: 'default' as const };
    if (daysUntil <= 7) return { label: `${daysUntil} days`, variant: 'secondary' as const };
    return { label: format(date, 'MMM d'), variant: 'outline' as const };
  };

  if (isLoading && !effectiveDemo) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const upcomingExams = displayExams?.filter(e => isFuture(new Date(e.exam_date)) || isToday(new Date(e.exam_date))) || [];
  const nextExam = upcomingExams[0];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Exam Schedule</h1>
        <p className="text-muted-foreground">View your upcoming examinations</p>
      </div>

      {/* Next Exam Highlight */}
      {nextExam && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Next Exam</CardTitle>
              <Badge variant="destructive">
                {getExamStatus(nextExam.exam_date).label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{(nextExam.subject as any)?.name}</h3>
                <p className="text-muted-foreground">{(nextExam.exam_type as any)?.name}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(nextExam.exam_date), 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{nextExam.start_time} - {nextExam.end_time}</span>
                </div>
                {nextExam.room && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{nextExam.room}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{nextExam.max_marks} marks</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Upcoming Exams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Upcoming Exams
          </CardTitle>
          <CardDescription>
            {upcomingExams.length} exam{upcomingExams.length !== 1 ? 's' : ''} scheduled
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingExams.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-lg font-medium">No Exams Scheduled</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Your examination schedule is empty. New exams will appear here once scheduled by the administration.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingExams.map((exam) => {
                const status = getExamStatus(exam.exam_date);
                return (
                  <div
                    key={exam.id}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold truncate">{(exam.subject as any)?.name}</h4>
                        <Badge variant={status.variant} className="shrink-0">
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {(exam.exam_type as any)?.name}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(exam.exam_date), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{exam.start_time} - {exam.end_time}</span>
                      </div>
                      {exam.room && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{exam.room}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-4 w-4" />
                        <span>{exam.max_marks} marks</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
