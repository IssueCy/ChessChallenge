import { useState } from 'react'
import './App.css'

import ChessPuzzle from './ChessPuzzle';
import Board from './Board';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChessPuzzle />
      <Board />
    </>
  )
}

export default App
