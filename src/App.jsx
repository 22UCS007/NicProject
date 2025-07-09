
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar"; 
import LoginPage from "./pages/Loginpage"; 
import ManualPayment from "./pages/ManualPayment"; 
import CheckerReview from "./pages/CheckerReview";

function App() {
  const [userRole, setUserRole] = useState("");

 
  const handleLogin = (role) => {
    setUserRole(role);
    console.log(`User logged in as: ${role}`);
  };

  
  const handleSignOut = () => {
    setUserRole(null);
    console.log('User signed out.');
  };

  return (
    
    <Router>
     
      <div className="flex flex-col min-h-screen">

        {userRole && <NavBar userRole={userRole} onSignOut={handleSignOut} />}

          <Routes>

            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

            <Route
              path="/"
              element={userRole ? <Navigate to="/home" /> : <Navigate to="/login" />}
            />

            <Route
              path="/home"
              element={userRole ? <div className="p-4 text-center text-xl font-semibold">Welcome to the Home Page!</div> : <Navigate to="/login" />}
            />

            <Route
              path="/manual-payment"
              element={userRole === "approver" ? <ManualPayment /> : <Navigate to="/" />}
            />

            <Route
              path="/checkernote"
              element={userRole==="checker" ? <CheckerReview userRole={userRole}/> : <Navigate to="/" />}
            ></Route>

            {!userRole && <Route path="*" element={<Navigate to="/login" replace />} />}

          </Routes>
      </div>
    </Router>
  );
}

export default App;
