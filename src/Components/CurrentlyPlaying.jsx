import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CurrentlyPlaying = ({ movies }) => {


  return (
    <div className="px-4 py-8 bg-black text-white">
      <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        {movies.length > 0 ? 'Currently Playing' : 'No movies found'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
            <Link to={`/movie/${movie.id}`} key={index}>
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
