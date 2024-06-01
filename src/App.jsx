// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import PublicNavBar from "./components/navbar/PublicNavBar";
import StudentNavBar from "./components/navbar/StudentNavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UploadPastQuestions from "./components/admin/UploadPastQuestions";
import ManageStudents from "./components/admin/ManageStudents";
import ViewUploads from "./components/admin/ViewUploads";
import AdminLayout from "./components/admin/AdminLayout";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import CGPACalculator from "./pages/CGPACalculator";
import FAQs from "./pages/FAQs";
import PastQuestionsPage from "./pages/PastQuestionsPage";
import LevelsPage from "./pages/LevelsPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import Contact from "./pages/ContactPage";
import Footer from "./components/footer/Footer";
import PQsTable from "./components/past-questions/PQsTable";
import StudentProfilePage from "./pages/StudentProfilePage";
import AdminProfilePage from "./pages/AdminProfilePage";

const Layout = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return (
      <>
        <PublicNavBar />
          <div>{children}</div>
        <Footer />
      </>
    );
  }

  if (isAdmin) {
    return (
      <>
        <AdminLayout>{children}</AdminLayout>
      </>
    );
  }

  return (
    <>
      <StudentNavBar />
        <div>{children}</div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cgpa-calculator" element={<CGPACalculator />} />
            <Route path="/past-questions" element={<PastQuestionsPage />} />
            <Route path="/departments/:facultyId" element={<DepartmentsPage />} />
            <Route path="/levels/:facultyId/:departmentId" element={<LevelsPage />} />
            <Route path="/past-questions/:facultyId/:departmentId/:levelIndex" element={<PQsTable />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute studentOnly>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student-profile"
              element={
                <ProtectedRoute studentOnly>
                  <StudentProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/upload"
              element={
                <ProtectedRoute adminOnly>
                  <UploadPastQuestions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-students"
              element={
                <ProtectedRoute adminOnly>
                  <ManageStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/view-uploads"
              element={
                <ProtectedRoute adminOnly>
                  <ViewUploads />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
