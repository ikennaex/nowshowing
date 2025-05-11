import React from 'react';
import { FaYoutube, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Top Section: Logo and App Buttons */}
        <div className="space-y-4">
          <img src="/images/logo.png" alt="Nowshowing" className="w-32" />
          
        </div>

        {/* Link Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3">Profile</h3>
            <ul className="space-y-2">
              <li>FAQ's</li>
              <li>Pricing Plans</li>
              <li>Gossip/News</li>
              <li>Order Tracking</li>
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
              <li>Self help</li>
              <li>Contact us</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>Privacy policy</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-6">
          <FaYoutube className="text-xl" />
          <FaTwitter className="text-xl" />
          <FaFacebookF className="text-xl" />
          <FaInstagram className="text-xl" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
