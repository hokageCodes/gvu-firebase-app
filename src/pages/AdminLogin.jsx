import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Ensure correct imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      // Perform admin login with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the logged-in user is an admin
      const adminSnapshot = await getDoc(doc(db, "admin", user.uid));
      if (!adminSnapshot.exists() || !adminSnapshot.data().isAdmin) {
        throw new Error("You are not authorized to access this page.");
      }

      // Redirect to admin dashboard on successful login
      navigate("/admin-dashboard"); // Replace with your admin dashboard route
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleLogin}>
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

