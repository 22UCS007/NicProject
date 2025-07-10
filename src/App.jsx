// File: src/App.jsx
import React, { useState } from 'react';
import PartAForm from './forms/PartAForm.jsx'; // Corrected import path with .jsx extension
import PartBForm from './forms/PartBForm.jsx'; // Corrected import path with .jsx extension

const App = () => {

  const [currentStep, setCurrentStep] = useState(1);

  const [partAData, setPartAData] = useState({});

  const [partBData, setPartBData] = useState({});


  const handleNext = (data) => {
    if (currentStep === 1) {
      setPartAData(data);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setPartBData(data);
    
      console.log('All forms completed! Part A:', partAData, 'Part B:', partBData);
    
      alert('Forms submitted successfully! Check console for data.');
    }
  };

  
  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="App">
      <header className="bg-[#5CA5F3] text-white p-4 text-center"> {/* Primary Blue header */}
        <h1 className="text-3xl font-bold">VAT Officer Portal</h1>
      </header>

      <main className="container mx-auto p-4">
        {currentStep === 1 && (
          <PartAForm onNext={handleNext} />
        )}
        {currentStep === 2 && (
          <PartBForm onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {/* You can add more steps here for CSTDetailsForm, BankInfoForm, etc. */}
      </main>

      <footer className="bg-[#5CA5F3] text-white p-4 text-center mt-8"> {/* Primary Blue footer */}
        <p>&copy; {new Date().getFullYear()} VAT Officer Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
