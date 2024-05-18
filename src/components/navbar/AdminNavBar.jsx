import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminNavBar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <Link to="/" className="text-2xl font-bold">Logo</Link>
        </div>
        <nav className="flex-1 px-2 py-4">
          <Link to="/admin-dashboard" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
          {/* Add more admin links here */}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <p className="font-bold">{currentUser.displayName}</p>
          <p>{currentUser.email}</p>
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700 mt-4"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-gray-100">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button onClick={logout} className="text-gray-700 hover:text-gray-900">
            Logout
          </button>
        </header>
        {/* Admin main content goes here */}
      </main>
    </div>
  );
};

export default AdminNavBar;
