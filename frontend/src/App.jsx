import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import UserAnalytics from './pages/dashboardPages/UserAnalytics'
import MyPosts from './pages/dashboardPages/MyPosts'
import UserNewPost from './pages/dashboardPages/UserNewPost'
import UserAssets from './pages/dashboardPages/UserAssets'
import CommentsPage from './pages/dashboardPages/CommentsPage'
import PostPage from './pages/default/PostPage'
import LoginPage from './pages/auth/LoginPage'
import Homepage from './pages/default/Homepage'

// components
import ProtectedRoute from './components/auth/ProtectedRoute'
import RegisterPage from './pages/auth/RegisterPage'
import ExplorePage from './pages/default/ExplorePage'
import FriendsPage from './pages/default/FriendsPage'
import SearchPage from './pages/default/SearchPage'
import MyProfile from './pages/dashboardPages/MyProfile'


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
          path='/My_profile'
          element={
            <ProtectedRoute>
              <MyProfile/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/'
          element={<Homepage/>}
        />

        <Route
          path='/Explore'
          element={<ExplorePage/>}
        />

        <Route
          path='/Friends'
          element={
            <ProtectedRoute>
              <FriendsPage/>
            </ProtectedRoute>
          }
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
            <ProtectedRoute>
              <CommentsPage/>              
            </ProtectedRoute>
          }
        />

        <Route
          path='/posts/:id'
          element={
            <PostPage/>
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

        <Route
          path='/Search'
          element={<SearchPage/>}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App