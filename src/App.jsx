import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar"; 
import LoginPage from "./pages/Loginpage"; 
import ManualPayment from "./pages/ManualPayment"; 
import Footer from "./components/Footer";
import { useState } from "react";
import Assignment from "./pages/InspectorAssign/Assignment";
import Review from "./pages/Review";

import MainForm from "./forms/MainForm";
// import PartA from "./forms/PartA";
import PartAForm from "./forms/PartA";
import PartBForm from "./forms/PartB";
import PartC from "./forms/Partc";
import Cst from "./forms/Cst";
import AdditionalBusinessPlaces from "./forms/AdditionalBusinessPlaces";
import BankInfo from "./forms/BankInfo";
import BusinessPartnerForm from "./forms/BusinessPartnerDetails";
import Documents from "./forms/Documents";
import Finish from "./forms/Finish";




function App() {
  const [userRole, setUserRole] = useState("");
  const [userData, setUserData] = useState(null);
  const [tinN, setTinN] = useState(null);

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
      <div className="flex flex-col justify-between min-h-screen">
        {userRole && <NavBar userRole={userRole} onSignOut={handleSignOut} />}

        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/"
            element={userRole ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={userRole ? <div className="p-4 text-center text-xl font-semibold"></div> : <Navigate to="/login" />}
          />
          <Route
            path="/manual-payment"
            element={userRole === "approver" ? <ManualPayment /> : <Navigate to="/" />}
          />
          <Route
            path="/assignments"
            element={userRole === "approver" ? <Assignment /> : <Navigate to="/" />}
          />
          <Route
            path="/reviewpage"
            element={userRole ? <Review userRole={userRole} userData={userData}/> : <Navigate to="/" />}
          />
          <Route path="/form" element={userRole ? <MainForm userRole={userRole}/> : <Navigate to="/" />}>
            <Route path="partA/:tinNumber" element={<PartAForm userRole={userRole} userData={userData}/>}/>
            <Route path="partB/:tinNumber" element={<PartBForm userRole={userRole} userData={userData}/>}/>
            <Route path="partC/:tinNumber" element={<PartC userRole={userRole} userData={userData}/>}/>
            <Route path="cst/:tinNumber" element={<Cst userRole={userRole} userData={userData}/>}/>
            <Route path="bankinfo/:tinNumber" element={<BankInfo userRole={userRole} userData={userData}/>}/>
            <Route path="businessplaces/:tinNumber" element={<AdditionalBusinessPlaces userRole={userRole} userData={userData}/>}/>
            <Route path="businesspartner/:tinNumber" element={<BusinessPartnerForm userRole={userRole} userData={userData}/>}/>
            <Route path="documents/:tinNumber" element={<Documents userRole={userRole} userData={userData}/>}/>
            <Route path="finish/:tinNumber" element={<Finish userRole={userRole} userData={userData}/>}/>
          </Route>
          {!userRole && <Route path="*" element={<Navigate to="/login" replace />} />}
        </Routes>

        {userRole && <Footer userData={userData} />}
      </div>
    </Router>
  );
}

export default App;

