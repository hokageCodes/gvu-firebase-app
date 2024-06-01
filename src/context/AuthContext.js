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
  const [adminPhotoURL, setAdminPhotoURL] = useState(""); // New state for admin photo URL

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true); // Set loading to true when auth state changes
      if (user) {
        setCurrentUser(user);
  
        const adminSnapshot = await getDoc(doc(db, 'admin', user.uid));
        if (adminSnapshot.exists()) {
          setIsAdmin(true);
          setAdminName(adminSnapshot.data().adminName);
          setAdminEmail(adminSnapshot.data().adminEmail);
          setAdminPassword(adminSnapshot.data().adminPassword);
          setAdminPhotoURL(adminSnapshot.data().profileImage); // Set admin photo URL
        } else {
          setIsAdmin(false);
          setAdminName("");
          setAdminEmail("");
          setAdminPassword("");
          setAdminPhotoURL(""); // Clear admin photo URL
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
        setAdminName("");
        setAdminEmail("");
        setAdminPassword("");
        setAdminPhotoURL(""); // Clear admin photo URL
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
    adminPhotoURL,
    loading // Add loading to context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
