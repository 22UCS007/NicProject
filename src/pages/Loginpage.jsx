import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

// Changed prop name from 'setRole' to 'onLogin' to match App.jsx
const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("🟢 Submitting login:", credentials);

    try {
      const response = await fetch(
        "https://vat-portal-backend-nic.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();
      console.log("✅ Server response JSON:", data);

      if (response.ok && data?.role) { // Check for response.ok as well
        onLogin(data.role); // Call the onLogin prop with the role
        navigate('/'); // Redirect to the home page after successful login
      } else {
        setError(data.message || "Invalid credentials or no role returned.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Officer Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        {error && (
          <div className="text-red-700 text-sm text-center mt-2">
            ❌ {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
