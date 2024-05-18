import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PublicNavBar from "./components/navbar/PublicNavBar";
import StudentNavBar from "./components/navbar/StudentNavBar";
import AdminNavBar from "./components/navbar/AdminNavBar";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = ({ children }) => {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (currentUser) {
        const adminSnapshot = await getDoc(doc(db, "admin", currentUser.uid));
        setIsAdmin(adminSnapshot.exists() && adminSnapshot.data().isAdmin);
      }
    };

    checkAdmin();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <>
        <PublicNavBar />
        {children}
      </>
    );
  }

  if (isAdmin) {
    return <AdminNavBar />;
  }

  return (
    <>
      <StudentNavBar />
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/student-dashboard" element={<ProtectedRoute studentOnly><StudentDashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
