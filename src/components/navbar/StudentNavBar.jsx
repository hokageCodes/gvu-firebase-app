import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const StudentNavBar = () => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-blue-500">Logo</Link>
          <div className="ml-10 flex space-x-4">
            <Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link>
            <Link to="/cgpa-calculator" className="text-gray-700 hover:text-blue-500">CGPA Calculator</Link>
            <Link to="/past-questions" className="text-gray-700 hover:text-blue-500">Past Questions</Link>
            <Link to="/faqs" className="text-gray-700 hover:text-blue-500">FAQs</Link>
          </div>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <img src="user-avatar-url" alt="User Avatar" className="h-8 w-8 rounded-full" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
              <div className="p-4">
                <p className="font-bold">{currentUser.displayName}</p>
                <p>{currentUser.email}</p>
              </div>
              <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default StudentNavBar;
