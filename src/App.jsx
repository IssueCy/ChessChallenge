import { useState } from 'react'
import './App.css'
import { useAuth } from "./auth";


import Login from './Login';
import MainPage from './MainPage';
import ChessPuzzle from './ChessPuzzle';
import Board from './Board';

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? (
        <MainPage user={user} logout={logout} />
      ) : (
        <Login />
      )}
    </>
  );
}
export default App
