import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);
  
        const adminSnapshot = await getDoc(doc(db, 'admin', user.uid));
        if (adminSnapshot.exists()) {
          setIsAdmin(true);
          setAdminName(adminSnapshot.data().adminName);
          setAdminEmail(adminSnapshot.data().adminEmail);
          setAdminPassword(adminSnapshot.data().adminPassword);
        } else {
          setIsAdmin(false);
          setAdminName("");
          setAdminEmail("");
          setAdminPassword("");
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
        setAdminName("");
        setAdminEmail("");
        setAdminPassword("");
      }
      setLoading(false); // Set loading to false after operations
    });
  
    return unsubscribe;
  }, []);
  
  const value = {
    currentUser,
    isAdmin,
    adminName,
    adminEmail,
    adminPassword,
    loading // Add loading to context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
