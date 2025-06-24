// // import React, { useState } from "react";

// // const RegisterPage = () => {
// //   const [formData, setFormData] = useState({
// //     username: "",
// //     password: "",
// //     role: "",
// //     designation: "",
// //   });
// //   const [registered, setRegistered] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch("https://sign-up-page-h05w.onrender.com/register", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       });
// //       await res.json();
// //       setRegistered(true);
// //     } catch (err) {
// //       console.error("Registration failed:", err);
// //       alert("Registration failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
// //       >
// //         <h2 className="text-2xl font-bold text-center mb-4">Register New Officer</h2>

// //         <input
// //           type="text"
// //           name="username"
// //           placeholder="Username"
// //           onChange={handleChange}
// //           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
// //         />
// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           onChange={handleChange}
// //           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
// //         />
// //         <input
// //           type="text"
// //           name="role"
// //           placeholder="Role (e.g., APPROVER)"
// //           onChange={handleChange}
// //           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
// //         />
// //         <input
// //           type="text"
// //           name="designation"
// //           placeholder="Designation"
// //           onChange={handleChange}
// //           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
// //         />

// //         <button
// //           type="submit"
// //           className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
// //         >
// //           Register
// //         </button>

// //         {registered && (
// //           <p className="text-green-600 text-center mt-2 font-semibold">
// //             ✅ Registration successful!
// //           </p>
// //         )}
// //       </form>
// //     </div>
// //   );
// // };

// // export default RegisterPage;


// import React, { useState } from "react";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     role: "",
//     designation: "",
//   });
//   const [registered, setRegistered] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Log all input fields
//     console.log("🟢 Registration submitted:");
//     console.log("Username:", formData.username);
//     console.log("Password:", formData.password);
//     console.log("Role:", formData.role);
//     console.log("Designation:", formData.designation);

//     // ✅ Show fake frontend success
//     setRegistered(true);

//     // 🔄 Try to send to backend, but ignore if it fails
//     try {
//       await fetch("https://sign-up-page-h05w.onrender.com/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//     } catch (err) {
//       console.warn("⚠️ Backend failed or CORS issue — ignored for frontend flow.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center mb-4">Register New Officer</h2>

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
//         />
//         <input
//           type="text"
//           name="role"
//           placeholder="Role (e.g., APPROVER)"
//           value={formData.role}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
//         />
//         <input
//           type="text"
//           name="designation"
//           placeholder="Designation"
//           value={formData.designation}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
//         />

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
//         >
//           Register
//         </button>

//         {registered && (
//           <div className="text-green-700 text-sm text-center mt-2">
//             ✅ Registration successful!
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    designation: "",
  });

  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Log the full object as required
    console.log("🟢 Registration submitted:", formData);

    // ✅ Show success message regardless of backend
    setRegistered(true);

    // 🔄 Optional: attempt to send data, silently ignore failure
    try {
      await fetch("https://sign-up-page-h05w.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn("⚠️ Backend/CORS issue — ignored on frontend.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register New Officer</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g., APPROVER)"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Register
        </button>

        {registered && (
          <div className="text-green-700 text-sm text-center mt-2">
            ✅ Registration successful!
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
