import { useState } from 'react'
import './App.css'
import MinesweeperFake from './feature/main-game/Game.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MinesweeperFake />
      <p style={
        {
          bottom: '10px'
        }
      }>By Nguyễn Quang Thông</p>
    </div>
  )
}

export default App
