import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import "../styles/Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 relative">

        {/* Logo */}
        <div className="flex-shrink-0">
          <NavLink exact="true" to="/">
            <img width="150px" src="/images/logo.png" alt="logo" />
          </NavLink>
        </div>

        {/* Centered Nav Links */}
        <ul className="absolute left-1/2 transform -translate-x-1/2 flex space-x-12 hidden md:flex">
          <li><NavLink exact="true" to="/" className={({ isActive }) => `${isActive ? "active-link" : ""} transition transform hover:-translate-y-1 duration-200`}>LINK</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => `${isActive ? "active-link" : ""} transition transform hover:-translate-y-1 duration-200`}>LINK</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => `${isActive ? "active-link" : ""} transition transform hover:-translate-y-1 duration-200`}>LINK</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => `${isActive ? "active-link" : ""} transition transform hover:-translate-y-1 duration-200`}>LINK</NavLink></li>
        </ul>

        {/* Right Side Links */}
        <div className="flex items-center space-x-4 hidden md:flex">
          <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login/Register</NavLink>
        </div>

        {/* Hamburger (for mobile) */}
        <div className="md:hidden" onClick={() => setOpen(!open)}>
          <Hamburger toggled={open} toggle={setOpen} size={24} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu-wrapper ${open ? 'open' : ''} md:hidden`}>
        <ul className="flex flex-col items-center bg-white/90 backdrop-blur-md py-4 space-y-4">
          <li><NavLink exact="true" to="/" onClick={handleLinkClick} className="mobile-link">LINK</NavLink></li>
          <li><NavLink to="/" onClick={handleLinkClick} className="mobile-link">LINK</NavLink></li>
          <li><NavLink to="/" onClick={handleLinkClick} className="mobile-link">LINK</NavLink></li>
          <li><NavLink to="/" onClick={handleLinkClick} className="mobile-link">LINK</NavLink></li>
          <li><NavLink to="/" onClick={handleLinkClick} className="mobile-link">Login/Register</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
