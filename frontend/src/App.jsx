import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Register from './pages/RegisterPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CreatePostPage from './pages/CreatePostPage'
import ViewPage from './pages/ViewPage'

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

        <Route
          path='/Dashboard/NewPost'
          element={
            <ProtectedRoute>
              <CreatePostPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/Dashboard/NewPost?:slug'
          element={
            <ProtectedRoute>
              <ViewPage/>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
