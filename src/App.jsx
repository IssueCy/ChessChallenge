import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./auth";

import './App.css';
import Login from './Login';
import MainPage from './MainPage';
import SubmitPuzzle from "./SubmitPuzzle";
import PuzzlePage from "./PuzzlePage";
import AccountSection from "./AccountSection";
import Privacy from "./Privacy";

function App() {
  const { user, logout } = useAuth();

return (
    <Router>
      <Routes>
        {/* Öffentliche Route – jeder darf hierhin */}
        <Route path="/privacy" element={<Privacy />} />

        {user ? (
          <>
            <Route path="/" element={<MainPage logout={logout} />} />
            <Route path="/submit" element={<SubmitPuzzle />} />
            <Route path="/puzzle/:category" element={<PuzzlePage />} />
            <Route path="/account" element={<AccountSection />} />
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
