import React from "react";
import { Link } from "react-router-dom";

const PublicNavBar = () => {
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
        <div className="flex space-x-4">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</Link>
          <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavBar;
