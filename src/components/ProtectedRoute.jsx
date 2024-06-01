import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading: authLoading } = useAuth();
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

    if (currentUser) {
      checkAdmin();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (authLoading || loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/login" />;

  if (adminOnly && !isAdmin) return <Navigate to="/admin-login" />;

  return children;
};

export default ProtectedRoute;
