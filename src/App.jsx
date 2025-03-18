import { useState } from 'react'
import './App.css'

import Login from './Login';
import ChessPuzzle from './ChessPuzzle';
import Board from './Board';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
    </>
  )
}

export default App
