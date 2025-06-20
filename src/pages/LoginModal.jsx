import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🟡 LoginModal rendered");
  }, []);

  const handleLoginClick = () => {
    console.log("🟢 Login button clicked");
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Welcome to VAT Portal</h2>
        <p className="mb-4">Already have an account?</p>

        <button
          onClick={handleLoginClick}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-2 w-full"
        >
          Log In
        </button>

        <p className="my-2 text-gray-500">or</p>

        <button
          onClick={() =>
            (window.location.href = 'https://accounts.google.com/o/oauth2/auth')
          }
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Sign in with Google
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

