// import { useState } from 'react'
// import './App.css'
// import { NavBar } from './components/index.js'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <NavBar/>
//     </>
//   )
// }

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar"; 
import LoginPage from "./pages/Loginpage"; 
import ManualPayment from "./pages/ManualPayment"; 
import Footer from "./components/Footer";
import { useState } from "react";
import Review from "./pages/Review";

function App() {
  const [userRole, setUserRole] = useState("");
  const [userData,setUserData] = useState(null);
 
  const handleLogin = (data) => {
    setUserRole(data.role);
    setUserData(data);
    console.log(data);
    console.log(`User logged in as: ${data.role}`);
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
              path="/reviewpage"
              element={userRole ? <Review userRole={userRole} userData={userData}/> : <Navigate to="/" />}
            ></Route>

            {!userRole && <Route path="*" element={<Navigate to="/login" replace />} />}

          </Routes>
        {userRole && <Footer userData={userData}/>}  
      </div>
    </Router>
  );
}

export default App;
