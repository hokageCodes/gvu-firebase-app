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
  const [adminPhotoURL, setAdminPhotoURL] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        console.log("User logged in:", user);
        setCurrentUser(user);
        const adminSnapshot = await getDoc(doc(db, 'admin', user.uid));
        if (adminSnapshot.exists()) {
          console.log("Admin details:", adminSnapshot.data());
          setIsAdmin(true);
          setAdminName(adminSnapshot.data().adminName);
          setAdminEmail(adminSnapshot.data().adminEmail);
          setAdminPassword(adminSnapshot.data().adminPassword);
          setAdminPhotoURL(adminSnapshot.data().profileImage);
        } else {
          setIsAdmin(false);
          setAdminName("");
          setAdminEmail("");
          setAdminPassword("");
          setAdminPhotoURL("");
        }
      } else {
        console.log("No user logged in.");
        setCurrentUser(null);
        setIsAdmin(false);
        setAdminName("");
        setAdminEmail("");
        setAdminPassword("");
        setAdminPhotoURL("");
      }
      setLoading(false);
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
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
