import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import UserAnalytics from './pages/dashboardPages/UserAnalytics'
import UserPosts from './pages/dashboardPages/UserPosts'
import UserNewPost from './pages/dashboardPages/UserNewPost'
import UserAssets from './pages/dashboardPages/UserAssets'
import CommentsPage from './pages/dashboardPages/CommentsPage'
import Post from './pages/default/Post'
import LoginPage from './pages/auth/LoginPage'


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
          path='/Posts'
          element={
            <UserPosts/>
          }
        />

        <Route
          path='/Posts/NewPost'
          element={
            <UserNewPost/>
          }
        />

        <Route
          path='/Assets'
          element={
            <UserAssets/>
          }
        />

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

      </Routes>
    </BrowserRouter>
  )
}

export default App