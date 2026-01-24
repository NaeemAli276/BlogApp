import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Register from './pages/RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>

        {/* home */}
        <Route
          path='/'
          element={<HomePage/>}
        />

        {/* login */}
        <Route
          path='/Login'
          element={<LoginPage/>}
        />

        {/* register */}
        <Route
          path='/Register'
          element={<Register/>}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
