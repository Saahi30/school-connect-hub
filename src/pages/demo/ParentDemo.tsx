import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ParentSidebar } from '@/components/dashboard/ParentSidebar';
import { MobileNav } from '@/components/dashboard/MobileNav';
import { useDemo } from '@/contexts/DemoContext';
import { ParentDashboardContent } from '@/components/parent/ParentDashboardContent';
import { ParentChildrenPage } from '@/components/parent/ParentChildrenPage';
import { ParentFeePage } from '@/components/parent/ParentFeePage';
import { ParentAttendancePage } from '@/components/parent/ParentAttendancePage';
import { ParentMarksPage } from '@/components/parent/ParentMarksPage';
import { ParentHomeworkPage } from '@/components/parent/ParentHomeworkPage';
import { ParentMessagesPage } from '@/components/parent/ParentMessagesPage';
import { ParentLeavePage } from '@/components/parent/ParentLeavePage';
import { ParentLibraryPage } from '@/components/parent/ParentLibraryPage';
import { ParentTransportPage } from '@/components/parent/ParentTransportPage';
import { ParentReportCardPage } from '@/components/parent/ParentReportCardPage';
import { ParentMeetingRequestPage } from '@/components/parent/ParentMeetingRequestPage';
import { NotificationsInboxPage } from '@/components/notifications/NotificationsInboxPage';
import { ProfilePage } from '@/components/profile/ProfilePage';

export default function ParentDemo() {
  const { setDemoMode } = useDemo();

  useEffect(() => {
    setDemoMode('parent');
  }, [setDemoMode]);

  return (
    <>
      <DashboardLayout userType="parent" sidebar={<ParentSidebar isDemo />}>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ParentDashboardContent isDemo />} />
          <Route path="children" element={<ParentChildrenPage />} />
          <Route path="attendance" element={<ParentAttendancePage />} />
          <Route path="marks" element={<ParentMarksPage />} />
          <Route path="meetings" element={<ParentMeetingRequestPage />} />
          <Route path="report-card" element={<ParentReportCardPage />} />
          <Route path="homework" element={<ParentHomeworkPage />} />
          <Route path="fees" element={<ParentFeePage />} />
          <Route path="library" element={<ParentLibraryPage />} />
          <Route path="transport" element={<ParentTransportPage />} />
          <Route path="leaves" element={<ParentLeavePage />} />
          <Route path="messages" element={<ParentMessagesPage />} />
          <Route path="notifications" element={<NotificationsInboxPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </DashboardLayout>
      <MobileNav userType="parent" isDemo />
    </>
  );
}
