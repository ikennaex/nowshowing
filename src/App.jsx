import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ScrollToTop from './Components/ScrollToTop'
import BlogPage from './Pages/BlogPage'
import BlogDetails from './Pages/BlogDetails'
import AdminPage from './Pages/Admin/AdminPage'
import CreateCinemaMovie from './Pages/Admin/CreateCinemaMovie'
import CreateStreamingMovie from './Pages/Admin/CreateStreamingMovie'
import CreateYoutubeMovie from './Pages/Admin/CreateYoutubeMovie'
import StreamingPage from './Pages/StreamingPage'
import CinemaMovieDetailPage from './Pages/MovieDetailPages/CinemaMovieDetailPage'
import StreamingMovieDetailPage from './Pages/MovieDetailPages/StreamingMovieDetailPage'


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
        <Route path="/cinemamovie/:id" element={<CinemaMovieDetailPage />} />
        <Route path="/streamingmovie/:id" element={<StreamingMovieDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/createcinemamovie" element={<CreateCinemaMovie />} />
        <Route path="/admin/createstreamingmovie" element={<CreateStreamingMovie />} />
        <Route path="/admin/createyoutubemovie" element={<CreateYoutubeMovie />} />
        <Route path="/streaming" element={<StreamingPage />} />
      </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App