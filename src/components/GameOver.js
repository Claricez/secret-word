import React from 'react'
import './GameOver.css'

const GameOver = ({restart}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={restart}>Reiniciar o jogo</button>
    </div>
  )
}

export default GameOver