import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import UserAnalytics from './pages/dashboardPages/UserAnalytics'
import MyPosts from './pages/dashboardPages/MyPosts'
import UserNewPost from './pages/dashboardPages/UserNewPost'
import UserAssets from './pages/dashboardPages/UserAssets'
import CommentsPage from './pages/dashboardPages/CommentsPage'
import Post from './pages/default/Post'
import LoginPage from './pages/auth/LoginPage'
import Homepage from './pages/default/Homepage'

// components
import ProtectedRoute from './components/auth/ProtectedRoute'
import RegisterPage from './pages/auth/RegisterPage'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>


        <Route
          path='/Analytics'
          element={
            <UserAnalytics/>
          }
        />

        <Route
          path='/My_posts'
          element={
            <ProtectedRoute>
              <MyPosts/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/'
          element={<Homepage/>}
        />

        {/* <Route
          path='/Posts/NewPost'
          element={
            <UserNewPost/>
          }
        /> */}

        {/* <Route
          path='/Assets'
          element={
            <UserAssets/>
          }
        /> */}

        <Route
          path='/Comments'
          element={
            <CommentsPage/>
          }
        />

        <Route
          path='/:url'
          element={
            <Post/>
          }
        />

        <Route
          path='/Login'
          element={
            <LoginPage/>
          }
        />

        <Route
          path='/Register'
          element={
            <RegisterPage/>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App