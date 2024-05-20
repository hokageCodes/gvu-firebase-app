import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase'; // Adjust the path as per your project structure
import { signOut } from 'firebase/auth';

const AdminHeader = () => {
  const { currentUser, adminName } = useAuth(); // Access currentUser and adminName from the authentication context
  const [greeting, setGreeting] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Redirect to admin-login page
        window.location.href = '/admin-login';
      })
      .catch((error) => {
        // Handle logout error
        console.error('Error signing out:', error);
      });
  };

  return (
    <header className="px-4 py-2 shadow bg-white w-full md:w-auto md:flex-shrink-0">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold">Welcome, {adminName || 'Admin'}</h1>
          <p className="text-gray-600">{greeting}</p>
        </div>

        <div className="relative">
          <button
            data-dropdown
            className="flex items-center px-3 py-2 focus:outline-none hover:bg-gray-200 hover:rounded-md"
            type="button"
            onClick={toggleDropdown}
          >
            <img
              src={currentUser ? currentUser.photoURL : 'https://via.placeholder.com/100'} // Use currentUser's photoURL
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <span className="ml-4 text-sm hidden md:inline-block">{adminName || 'Jessica Smith'}</span>
            <svg className="fill-current w-3 ml-4" viewBox="0 0 407.437 407.437">
              <path d="M386.258 91.567l-182.54 181.945L21.179 91.567 0 112.815 203.718 315.87l203.719-203.055z" />
            </svg>
          </button>
          {dropdownOpen && (
            <div
              data-dropdown-items
              className="text-sm text-left absolute top-12 right-0 mt-1 bg-white rounded border border-gray-400 shadow"
            >
              <ul>
                {/* <li className="px-4 py-3 border-b hover:bg-gray-200">
                  <a href="#">My Profile</a>
                </li>
                <li className="px-4 py-3 border-b hover:bg-gray-200">
                  <a href="#">Settings</a>
                </li> */}
                <li className="px-4 py-3 hover:bg-gray-200">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
