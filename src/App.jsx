import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import MovieDetailsPage from './Pages/MovieDetailsPage'
import ScrollToTop from './Components/ScrollToTop'
import BlogPage from './Pages/BlogPage'
import BlogDetails from './Pages/BlogDetails'
import AdminPage from './Pages/AdminPage'


const App = () => {
  return (
    <div>
      <ScrollToTop/>
      <Navbar/>
      <div className='mt-10'>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App