import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TeacherSidebar } from '@/components/dashboard/TeacherSidebar';
import { MobileNav } from '@/components/dashboard/MobileNav';
import { useDemo } from '@/contexts/DemoContext';
import { TeacherDashboardContent } from '@/components/teacher/TeacherDashboardContent';
import { ComingSoonPage } from '@/components/shared/ComingSoonPage';
import { TeacherClassesPage } from '@/components/teacher/TeacherClassesPage';
import { AttendancePage } from '@/components/teacher/AttendancePage';
import { AttendanceJustificationsPage } from '@/components/teacher/AttendanceJustificationsPage';
import { MarksEntryPage } from '@/components/teacher/MarksEntryPage';
import { BulkMarksUploadPage } from '@/components/teacher/BulkMarksUploadPage';
import { TeacherAnalyticsPage } from '@/components/teacher/TeacherAnalyticsPage';
import { QuestionBankPage } from '@/components/teacher/QuestionBankPage';
import { OnlineExamBuilderPage } from '@/components/teacher/OnlineExamBuilderPage';
import { ReevalHandlerPage } from '@/components/teacher/ReevalHandlerPage';
import { TeacherPtmPage } from '@/components/teacher/TeacherPtmPage';
import { HomeworkPage } from '@/components/teacher/HomeworkPage';
import { SessionPlanningPage } from '@/components/teacher/SessionPlanningPage';
import { TeacherAnnouncementsPage } from '@/components/teacher/TeacherAnnouncementsPage';
import { TeacherLeavePage } from '@/components/teacher/TeacherLeavePage';
import { TeacherLeaveApprovalsPage } from '@/components/teacher/TeacherLeaveApprovalsPage';
import { TeacherMessagesPage } from '@/components/teacher/TeacherMessagesPage';
import { TeacherSchedulePage } from '@/components/teacher/TeacherSchedulePage';
import { NotificationsInboxPage } from '@/components/notifications/NotificationsInboxPage';
import { NotificationComposerPage } from '@/components/notifications/NotificationComposerPage';

export default function TeacherDemo() {
  const { setDemoMode } = useDemo();

  useEffect(() => {
    setDemoMode('teacher');
  }, [setDemoMode]);

  return (
    <>
      <DashboardLayout userType="teacher" sidebar={<TeacherSidebar isDemo />}>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TeacherDashboardContent isDemo />} />
          <Route path="classes" element={<TeacherClassesPage />} />
          <Route path="schedule" element={<TeacherSchedulePage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="attendance/justifications" element={<AttendanceJustificationsPage />} />
          <Route path="marks" element={<MarksEntryPage />} />
          <Route path="marks/bulk" element={<BulkMarksUploadPage />} />
          <Route path="analytics" element={<TeacherAnalyticsPage />} />
          <Route path="question-bank" element={<QuestionBankPage />} />
          <Route path="online-exams" element={<OnlineExamBuilderPage />} />
          <Route path="reeval" element={<ReevalHandlerPage />} />
          <Route path="meetings" element={<TeacherPtmPage />} />
          <Route path="homework" element={<HomeworkPage />} />
          <Route path="sessions" element={<SessionPlanningPage />} />
          <Route path="announcements" element={<TeacherAnnouncementsPage />} />
          <Route path="leave" element={<TeacherLeavePage />} />
          <Route path="leaves" element={<TeacherLeavePage />} />
          <Route path="leave-approvals" element={<TeacherLeaveApprovalsPage />} />
          <Route path="messages" element={<TeacherMessagesPage />} />
          <Route path="notifications" element={<NotificationsInboxPage />} />
          <Route path="notifications/send" element={<NotificationComposerPage />} />
          <Route path="profile" element={<ComingSoonPage title="My Profile" />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </DashboardLayout>
      <MobileNav userType="teacher" isDemo />
    </>
  );
}
