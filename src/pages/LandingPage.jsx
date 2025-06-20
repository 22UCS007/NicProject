import React, { useState } from 'react';
import NavBar from '../components/navbar';
import LoginModal from './LoginModal';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const backgroundImageUrl =
    'https://media.istockphoto.com/id/1426962165/photo/tax-word-on-wooden-blocks-with-calculator-pen-magnifying-glass-and-data-analysis-background.jpg?s=2048x2048&w=is&k=20&c=xWzaof1mOelvTOVToa57dAk6UKLY85QC5HTSCur7my4=';

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Blurred overlay */}
      <div className="h-screen w-full bg-black bg-opacity-40">
        <NavBar onLoginClick={() => setShowLogin(true)} />
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      </div>
    </div>
  );
};

export default LandingPage;



