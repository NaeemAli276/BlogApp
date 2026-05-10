import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import UserAnalytics from './pages/dashboardPages/UserAnalytics'
import UserPosts from './pages/dashboardPages/UserPosts'
import UserNewPost from './pages/dashboardPages/UserNewPost'
import UserAssets from './pages/dashboardPages/UserAssets'


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

      </Routes>
    </BrowserRouter>
  )
}

export default App