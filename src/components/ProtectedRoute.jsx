import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ProtectedRoute = ({ children, adminOnly = false, studentOnly = false }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (currentUser) {
        const adminSnapshot = await getDoc(doc(db, "admin", currentUser.uid));
        setIsAdmin(adminSnapshot.exists() && adminSnapshot.data().isAdmin);
      }
      setLoading(false);
    };

    checkAdmin();
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/login" />;

  if (adminOnly && !isAdmin) return <Navigate to="/admin-login" />;

  if (studentOnly && isAdmin) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
