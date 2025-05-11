import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-4xl bg-[#111111] rounded-xl shadow-lg p-8 md:p-14 flex flex-col lg:flex-row gap-10 items-center">
        {/* Left Side Text */}
        <div className="text-center lg:text-left lg:max-w-md flex-1">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-customBlue">
            Join Now Showing
          </h1>
          <p className="mt-4 text-gray-300">
            Create your account to enjoy all features of{' '}
            <span className="text-customBlue font-semibold">Now Showing</span>
          </p>
        </div>

        {/* Register Form */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl text-center mb-6 font-semibold text-white">Create an Account</h2>
          <form className="flex flex-col gap-5">
            <input
              className="h-14 border border-gray-700 p-4 bg-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue placeholder-gray-400"
              type="text"
              required
              placeholder="Full Name"
            />
            <input
              className="h-14 border border-gray-700 p-4 bg-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue placeholder-gray-400"
              type="email"
              required
              placeholder="Email Address"
            />
            <input
              className="h-14 border border-gray-700 p-4 bg-[#222222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue placeholder-gray-400"
              type="password"
              required
              placeholder="Password"
            />
            <button
              className="bg-customBlue h-14 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
              type="submit"
            >
              Register
            </button>
          </form>

          {/* Google Login */}
          <button className="mt-5 h-14 w-full bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition duration-300">
            Continue with Google
          </button>

          <p className="pt-6 text-center text-gray-300">
            Already have an account?{' '}
            <Link className="text-customBlue font-bold hover:underline" to="/login">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
