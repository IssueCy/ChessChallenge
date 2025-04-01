import { useState } from 'react';
import './App.css';
import { useAuth } from "./auth";

import Login from './Login';
import MainPage from './MainPage';

function App() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState("home");

  return (
    <>
      {user ? (
        <MainPage user={user} logout={logout} setPage={setPage} page={page} />
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
