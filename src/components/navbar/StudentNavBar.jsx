import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase"; // Make sure to import db
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const StudentNavBar = () => {
  const { currentUser } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          // Handle non-existent document gracefully
          console.log("Document does not exist for this user.");
          setUserData(null); // Set userData to null or provide default values
        }
      } catch (error) {
        console.error("Error getting user document:", error);
      }
    };
    

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        <a href="/">
        <img src="/assets/logo.jpg" alt="Logo" className="h-10 w-10" />  
        </a>  
        <span className="text-lg">Glorius Vision University</span> 
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>
      <div className="md:flex hidden space-x-6">
        <Link to="/about">About</Link>
        <Link to="/cgpa-calculator">CGPA Calculator</Link>
        <Link to="/past-questions">Past Questions</Link>
        <Link to="/faqs">FAQs</Link>
        <Link to="/contact-us">Contact</Link>
      </div>
      {!currentUser ? (
        <div className="md:flex hidden space-x-4">
          <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</Link>
          <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
        </div>
      ) : (
        <div className="md:flex hidden items-center space-x-4 relative">
          <button onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)} className="flex items-center focus:outline-none">
            <img src={userData?.profileImage || '/assets/user-default.png'} alt="Avatar" className="h-8 w-8 rounded-full" />
            {userData && (
              <div className="ml-2 text-left">
                <p className="text-sm text-gray-700">{userData.fullName}</p>
                <p className="text-xs text-gray-500">{userData.matricNumber}</p>
              </div>
            )}
          </button>
          {avatarDropdownOpen && (
            <div className="absolute right-0 mt-48 w-36 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <Link to="/student-dashboard" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Dashboard</Link>
                <Link to="/student-profile" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          )}
        </div>
      )}

      {navOpen && (
        <div className="fixed top-0 right-0 h-full bg-white w-64 shadow-lg z-50">
          <div className="flex justify-end py-4 px-4">
            <button onClick={() => setNavOpen(false)}>
              <AiOutlineClose size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4 px-4">
            <Link to="/about" className="py-2 text-lg text-gray-800 hover:text-blue-500" onClick={() => setNavOpen(false)}>About</Link>
            <Link to="/cgpa-calculator" className="py-2 text-lg text-gray-800 hover:text-blue-500" onClick={() => setNavOpen(false)}>CGPA Calculator</Link>
            <Link to="/past-questions" className="py-2 text-lg text-gray-800 hover:text-blue-500" onClick={() => setNavOpen(false)}>Past Questions</Link>
            <Link to="/faqs" className="py-2 text-lg text-gray-800 hover:text-blue-500" onClick={() => setNavOpen(false)}>FAQs</Link>
            <Link to="/contact-us" className="py-2 text-lg text-gray-800 hover:text-blue-500" onClick={() => setNavOpen(false)}>Contact Us</Link>
            {!currentUser && (
              <div className="flex flex-col space-y-2">
                <Link to="/signup" className="py-2 text-lg text-gray-800 hover:text-blue-500" onClick={() => setNavOpen(false)}>Sign Up</Link>
                <Link to="/login" className="py-2 text-lg text-gray-800 hover:text-blue-500" onClick={() => setNavOpen(false)}>Login</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default StudentNavBar;
