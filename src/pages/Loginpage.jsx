import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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
      console.log(response);

      const data = await response.json();
      console.log("✅ Server response JSON:", data);

      Cookies.set('authToken', data.token, { expires: 7, secure: true, sameSite: 'Lax' });
      console.log("Token stored in cookie:", data.token);

      if (response.ok && data?.role) {
        onLogin(data);
        navigate('/');
      } else {
        setError(data.message || "Invalid credentials or no role returned.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-blue-500 text-white pmin-w-full justify-between items-center pt-5">
      <h1 className="text-4xl text-center font-bold pb-5 text-black">
        VAT e-Filing System
      </h1>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-300 p-0 rounded shadow-md w-full max-w-md space-y-4"
        >
          {/* New div for the header section */}
          <div className="bg-blue-600 text-white py-4 px-8 rounded-t">
            <h2 className="text-2xl font-bold text-center">Officer Login</h2>
          </div>

          <div className="p-8 space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" // Added text-black here
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" // Added text-black here
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
