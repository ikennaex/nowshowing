import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CurrentlyPlaying = ({ movies }) => {
  const navigate = useNavigate();

  const handleClick = (movie) => {
    navigate(`/movies/${movie.title.toLowerCase().replace(/\s+/g, '-')}`, { state: movie });
  };

  return (
    <div className="px-4 py-8 bg-black text-white">
      <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        {movies.length > 0 ? 'Currently Playing' : 'No movies found'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
            <Link to={`/movie/${movie.id}`} >
          <div
            key={index}
            //onClick={() => handleClick(movie)}
            className="cursor-pointer transform hover:scale-105 transition duration-300"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-auto rounded-md"
            />
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
