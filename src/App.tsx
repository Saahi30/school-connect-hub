import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DemoProvider } from "@/contexts/DemoContext";

// Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Integrations from "./pages/Integrations";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ForSchools from "./pages/ForSchools";
import BookDemo from "./pages/BookDemo";
import About from "./pages/About";
import AdmissionsLanding from "./pages/admissions/AdmissionsLanding";
import ApplyPage from "./pages/admissions/ApplyPage";
import StatusPage from "./pages/admissions/StatusPage";

// Login Pages
import Login from "./pages/Login";
import StudentLogin from "./pages/login/StudentLogin";
import ParentLogin from "./pages/login/ParentLogin";
import TeacherLogin from "./pages/login/TeacherLogin";
import AdminLogin from "./pages/login/AdminLogin";

// Demo Pages
import StudentDemo from "./pages/demo/StudentDemo";
import ParentDemo from "./pages/demo/ParentDemo";
import TeacherDemo from "./pages/demo/TeacherDemo";
import AdminDemo from "./pages/demo/AdminDemo";

// Real Dashboard Pages
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import AdminSetup from "./pages/AdminSetup";
import DriverPage from "./pages/DriverPage";

// Auth Components
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DemoProvider>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<Landing />} />

              {/* Marketing Pages */}
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/for-schools" element={<ForSchools />} />
              <Route path="/book-demo" element={<BookDemo />} />
              <Route path="/about" element={<About />} />

              {/* Public Admissions */}
              <Route path="/admissions" element={<AdmissionsLanding />} />
              <Route path="/admissions/apply" element={<ApplyPage />} />
              <Route path="/admissions/status" element={<StatusPage />} />
              
              {/* Login Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/login/student" element={<StudentLogin />} />
              <Route path="/login/parent" element={<ParentLogin />} />
              <Route path="/login/teacher" element={<TeacherLogin />} />
              <Route path="/login/admin" element={<AdminLogin />} />
              
              {/* Admin Setup (only works when no admin exists) */}
              <Route path="/admin/setup" element={<AdminSetup />} />

              {/* Driver PWA — any authenticated user whose account is linked to a bus */}
              <Route path="/driver" element={<DriverPage />} />
              
              {/* Demo Routes */}
              <Route path="/demo/student/*" element={<StudentDemo />} />
              <Route path="/demo/parent/*" element={<ParentDemo />} />
              <Route path="/demo/teacher/*" element={<TeacherDemo />} />
              <Route path="/demo/admin/*" element={<AdminDemo />} />
              
              {/* Protected Dashboard Routes */}
              <Route path="/student/*" element={
                <ProtectedRoute allowedRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/parent/*" element={
                <ProtectedRoute allowedRole="parent">
                  <ParentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/teacher/*" element={
                <ProtectedRoute allowedRole="teacher">
                  <TeacherDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/*" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DemoProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
