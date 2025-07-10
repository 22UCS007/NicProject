// File: src/App.jsx
import React, { useState } from 'react';
import PartAForm from './forms/PartAForm.jsx';
import PartBForm from './forms/PartBForm.jsx';

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
    <main className="container mx-auto p-4">
      {currentStep === 1 && (
        <PartAForm onNext={handleNext} />
      )}
      {currentStep === 2 && (
        <PartBForm onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {/* You can add more steps here for CSTDetailsForm, BankInfoForm, etc. */}
    </main>
  );
};

export default App;
