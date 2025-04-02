import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import { useAuth } from "./auth";

import Login from './Login';
import MainPage from './MainPage';
import SubmitPuzzle from "./SubmitPuzzle";

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      {user ? (
        <Routes>
          <Route path="/" element={<MainPage logout={logout} />} />
          <Route path="/submit" element={<SubmitPuzzle />} />
        </Routes>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
