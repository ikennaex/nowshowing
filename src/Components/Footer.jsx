import React from 'react';
import { FaYoutube, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Logo & App Buttons */}
        <div className="space-y-4">
          <img src="/images/logo.png" alt="nowshowing" className="w-32" />
          
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About us</li>
            <li>Ticket prices</li>
            <li>The Script Blog</li>
            <li>Experiences</li>
          </ul>
        </div>

        {/* Terms */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Terms</h3>
          <ul className="space-y-2 text-sm">
            <li>General</li>
            <li>Ticket sales</li>
            <li>Filmhouse+</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Self help</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Legal & Social */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <FaYoutube className="text-xl" />
            <FaTwitter className="text-xl" />
            <FaFacebookF className="text-xl" />
            <FaInstagram className="text-xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
