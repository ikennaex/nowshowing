import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col"></div>
      <Navbar/>
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App