import React from 'react';
import { FaYoutube, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { logo } from '../imports';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Section: Logo and App Buttons */}
        <div className="space-y-4">
          <img width="120px" src= {logo} alt="Nowshowing" />
          
        </div>

        {/* Link Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">Profile</h3>
            <ul className="space-y-2">
              <li>FAQ's</li>
              <Link to='/blog'><li>Gossip/News</li></Link>
            </ul>
          </div>

          {/* Terms */}
          <div>
            <h3 className="font-semibold mb-3">Recent Posts</h3>
            <ul className="space-y-2">
              <li>General</li>
              <li>Ticket sales</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Customer</h3>
            <ul className="space-y-2">
              <Link to='/contact'><li>Contact us</li></Link>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <Link to= "/privacypolicy">
              <li>Privacy policy</li>
              </Link>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-6">
          {/* <FaMail className="text-xl" /> */}
          <Link target='_blank' to="https://www.instagram.com/nowshowing.ng/">
          <FaInstagram className="text-xl" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
