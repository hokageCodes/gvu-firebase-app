import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // If you have additional styles

const AdminSidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleModeSwitch = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  const handleToggle = () => {
    setIsClosed(!isClosed);
  };

  const handleLogout = () => {
    // Perform logout operations (e.g., clearing auth tokens)
    window.location.href = '/admin-login';
  };

  return (
    <nav className={`sidebar ${isClosed ? 'close' : ''} ${isDarkMode ? 'dark' : ''}`}>
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <a href="/">
            <img
              src="/assets/logo.jpg"
              alt="logo"
              className="w-10 h-10 rounded-lg"
            />
          </a>
          <div className="ml-4">
            <span className="block font-semibold">Glorius Vision</span>
            <span className="block text-sm">University</span>
          </div>
        </div>
        <i className="bx bx-chevron-right toggle cursor-pointer text-xl" onClick={handleToggle}></i>
      </header>

      <div className="menu-bar flex flex-col justify-between flex-1">
      <ul className="menu-links mt-8 space-y-8 p-4">
          <li className="nav-link mb-4">
            <Link to="/admin-dashboard" className="flex items-center p-2 rounded hover:bg-gray-200">
              <i className="bx bx-home-alt icons text-xl mr-4"></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li className="nav-link mb-4">
            <Link to="/student-management" className="flex items-center p-2 rounded hover:bg-gray-200">
              <i className="bx bx-user icons text-xl mr-4"></i>
              <span className="text">Student Management</span>
            </Link>
          </li>
          <li className="nav-link mb-4">
            <Link to="/upload-past-questions" className="flex items-center p-2 rounded hover:bg-gray-200">
              <i className="bx bx-upload icons text-xl mr-4"></i>
              <span className="text">Upload Past Questions</span>
            </Link>
          </li>
          <li className="nav-link mb-4">
            <Link to="/view-uploads" className="flex items-center p-2 rounded hover:bg-gray-200">
              <i className="bx bx-list-ul icons text-xl mr-4"></i>
              <span className="text">View Uploads</span>
            </Link>
          </li>
          <li className="nav-link mb-4">
            <Link to="/messages" className="flex items-center p-2 rounded hover:bg-gray-200">
              <i className="bx bx-list-ul icons text-xl mr-4"></i>
              <span className="text">Messages</span>
            </Link>
          </li>
        </ul>

        <div className="bottom-content p-4">
          <li className="nav-link mb-4">
            <button onClick={handleLogout} className="flex items-center p-2 w-full text-left rounded hover:bg-gray-200">
              <i className="bx bx-log-out icons text-xl mr-4"></i>
              <span className="text">Log Out</span>
            </button>
          </li>
        </div>
      </div>

    </nav>
  );
};

export default AdminSidebar;

