import { useState } from 'react'
import './App.css'
import { useAuth } from "./auth";


import Login from './Login';
import ChessPuzzle from './ChessPuzzle';
import Board from './Board';

function App() {
  const { user, logout } = useAuth();

  return (
      <>
          {user ? (
              <div>
                  <p>Willkommen, {user.email}!</p>
                  <button onClick={logout}>Logout</button>
                  <ChessPuzzle />
              </div>
          ) : (
              <Login />
          )}
      </>
  );
}
export default App
