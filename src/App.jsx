// File: src/App.jsx
import React, { useState } from 'react';
import PartAForm from './forms/PartAForm.jsx'; // Corrected import path with .jsx extension
import PartBForm from './forms/PartBForm.jsx'; // Corrected import path with .jsx extension

const App = () => {
  // State to manage the current step in the form process
  const [currentStep, setCurrentStep] = useState(1);
  // State to store data from Part A
  const [partAData, setPartAData] = useState({});
  // State to store data from Part B
  const [partBData, setPartBData] = useState({});

  // Function to handle moving to the next step
  const handleNext = (data) => {
    if (currentStep === 1) {
      setPartAData(data);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setPartBData(data);
      // In a real application, you would proceed to the next form (e.g., CSTDetailsForm)
      // For this example, we'll just log the completion
      console.log('All forms completed! Part A:', partAData, 'Part B:', partBData);
      // Using a simple alert for demo purposes; replace with a custom modal or toast
      // for better user experience in a real application.
      alert('Forms submitted successfully! Check console for data.');
    }
  };

  // Function to handle moving to the previous step
  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="App">
      <header className="bg-[#294D74] text-white p-4 text-center"> {/* Primary Blue header */}
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

      <footer className="bg-[#294D74] text-white p-4 text-center mt-8"> {/* Primary Blue footer */}
        <p>&copy; {new Date().getFullYear()} VAT Officer Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
