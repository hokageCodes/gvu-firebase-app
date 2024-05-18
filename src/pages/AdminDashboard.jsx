import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {currentUser.email}!</p>
      {/* Add more admin-specific functionalities here */}
    </div>
  );
};

export default AdminDashboard;
