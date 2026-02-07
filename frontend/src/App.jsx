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
import MyPostsPage from './pages/MyPostsPage'
import FriendsPage from './pages/FriendsPage'
import Dashboard from './pages/Dashboard'

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
          path='/Friends'
          element={
            <ProtectedRoute>
              <FriendsPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/Dashboard'
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/Posts'
          element={
            <ProtectedRoute>
              <MyPostsPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/Posts/NewPost'
          element={
            <ProtectedRoute>
              <CreatePostPage/>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
