import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

        <header>
          <h1>SSR Editor</h1>
        </header>


    <div className="App">

      <main className="main" id="main">
      <h2>Dokument</h2>

        <h3><a href="#">Första dokumentets titel</a></h3>
        <h3><a href="#">En annan titel</a></h3>
      </main>

    </div>
    </>
  )
}

export default App
