import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <form className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white mb-1">Full name</label>
            <input
              type="text"
              placeholder="enter your full name"
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Phone number</label>
            <input
              type="text"
              placeholder="enter your phone number"
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white mb-1">Email address</label>
            <input
              type="email"
              placeholder="enter your address"
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Subject</label>
            <input
              type="text"
              placeholder="enter subject"
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-white mb-1">Message</label>
          <textarea
            rows="5"
            placeholder=""
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
  );
};

export default ContactPage;
