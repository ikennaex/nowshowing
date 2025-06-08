import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import Loader from './Loader';

const CurrentlyPlaying = ({ movies = [], loading, error }) => {


  if (loading) return (<div className='mt-24'>
    <Loader />
  </div>) ;

  return (
    <div className="px-4 py-8 bg-black text-white">
      <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        {movies.length > 0 ? 'Currently Playing' : error || 'No movies found'}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {fetchedCinemaMovies.map((movie) => (
          <Link to={`/cinemamovie/${movie._id}`} key={movie._id}>
            <div className="cursor-pointer transform hover:scale-105 transition duration-300">
              <div className="w-full aspect-[2/3] overflow-hidden rounded-md">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-semibold mt-2 text-center">{movie.title}</h4>
              <p className="text-sm text-gray-400 text-center">{movie.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
