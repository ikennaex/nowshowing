import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import "../Styles/Navbar.css";
import { logo } from '../imports';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-lg shadow`}>
      <div className="max-w-7xl mx-auto px-4 p-7 flex items-center justify-between h-16 relative">

        {/* Logo */}
        <div className="flex-shrink-0">
          <NavLink exact="true" to="/">
            <img width="120px" src= {logo} alt="logo" />
          </NavLink>
        </div>

        {/* Centered Nav Links */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex space-x-12 hidden md:flex">
          <li><NavLink exact="true" to="/buy-tickets" className={({ isActive }) => `${isActive ? "active-link" : ""} navlink-a transition transform hover:-translate-y-1 duration-200 text-sm font-bold`}>BUY TICKETS</NavLink></li>
          <li><NavLink to="/cinema" className={({ isActive }) => `${isActive ? "active-link" : ""} navlink-a transition transform hover:-translate-y-1 duration-200 text-sm font-bold`}>CINEMA</NavLink></li>
          <li><NavLink to="/streaming" className={({ isActive }) => `${isActive ? "active-link" : ""} navlink-a transition transform hover:-translate-y-1 duration-200 text-sm font-bold`}>STREAMING</NavLink></li>
          <li><NavLink to="/blog" className={({ isActive }) => `${isActive ? "active-link" : ""} navlink-a transition transform hover:-translate-y-1 duration-200 text-sm font-bold`}>BLOG</NavLink></li>
          <li><NavLink to="/youtube" className={({ isActive }) => `${isActive ? "active-link" : ""} navlink-a transition transform hover:-translate-y-1 duration-200 text-sm font-bold`}>YOUTUBE</NavLink></li>
          {/* <li><NavLink to="/contact" className={({ isActive }) => `${isActive ? "active-link" : ""} navlink-a transition transform hover:-translate-y-1 duration-200 text-sm font-bold`}>CONTACT</NavLink></li> */}
        </ul>

        {/* Right Side Links */}
        <div className="flex items-center space-x-4 hidden md:flex">
          <NavLink to="/login" className={({ isActive }) => isActive ? "active-link navlink-a text-sm font-bold" : "navlink-a text-sm font-bold"}>Login/Register</NavLink>
          {/* <NavLink to="/admin" className={({ isActive }) => isActive ? "active-link navlink-a text-sm font-bold" : "navlink-a text-sm font-bold"}>Admin</NavLink> */}
        </div>

        {/* Hamburger (for mobile) */}
        <div className="md:hidden" onClick={() => setOpen(!open)}>
          <Hamburger toggled={open} toggle={setOpen} size={24} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu-wrapper ${open ? 'open' : ''} md:hidden`}>
        <ul className="flex flex-col items-center bg-white/90 backdrop-blur-md py-1 space-y-4 overflow-y-auto z-40">
          <li><NavLink exact="true" to="/buy-tickets" onClick={handleLinkClick} className="mobile-link">BUY TICKETS</NavLink></li>
          <li><NavLink to="/streaming" onClick={handleLinkClick} className="mobile-link">STREAMING</NavLink></li>
          <li><NavLink to="/cinema" onClick={handleLinkClick} className="mobile-link">CINEMA</NavLink></li>
          <li><NavLink to="/youtube" onClick={handleLinkClick} className="mobile-link">YOUTUBE</NavLink></li>
          <li><NavLink to="/blog" onClick={handleLinkClick} className="mobile-link">BLOG</NavLink></li>
          {/* <li><NavLink to="/login" onClick={handleLinkClick} className="mobile-link">Login/Register</NavLink></li> */}
          {/* <li><NavLink to="/admin" onClick={handleLinkClick} className="mobile-link">Admin</NavLink></li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;