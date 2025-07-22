import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Contact Info */}
        <div className="text-center text-white mb-10">
          <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-400">We’d love to hear from you.</p>
          <div className="mt-4 space-y-1">
            <p>
              📞{' '}
              <a
                href="tel:+2349116241758"
                className="text-blue-400 hover:underline"
              >
                +234 911 624 1758
              </a>
            </p>
            <p>
              📧{' '}
              <a
                href="mailto:nowshowingng@gmail.com"
                className="text-blue-400 hover:underline"
              >
                nowshowingng@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-[#111] p-6 rounded-2xl shadow-md">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white mb-1">Full name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Phone number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-white mb-1">Email address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-medium py-3 rounded-full hover:bg-gray-200 transition"
          >
            Submit ↗
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
