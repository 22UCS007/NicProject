import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css';
import { NavBar } from './components/index.js';
import Finish from "./forms/Finish.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/finish" element={<Finish />} />
      </Routes>

    </Router>
  );
}

export default App;
