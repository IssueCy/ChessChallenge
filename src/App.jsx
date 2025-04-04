import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./auth";

import './App.css';
import Login from './Login';
import MainPage from './MainPage';
import SubmitPuzzle from "./SubmitPuzzle";
import PuzzlePage from "./PuzzlePage";
import ChessPuzzle from "./ChessPuzzle";

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      {user ? (
        <Routes>
          <Route path="/" element={<MainPage logout={logout} />} />
          <Route path="/submit" element={<SubmitPuzzle />} />
          <Route path="/puzzle/:category" element={<PuzzlePage />} /> {/* Neu */}
        </Routes>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
