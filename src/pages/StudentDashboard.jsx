import React from "react";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>Welcome, {currentUser.email}!</p>
      {/* Add more student-specific functionalities here */}
    </div>
  );
};

export default StudentDashboard;
