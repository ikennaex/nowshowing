import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import Loader from '../Loader';

const AdminMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // Fetch all movies from all categories
  const fetchMovies = async () => {
    try {
      const [cinema, streaming, youtube] = await Promise.all([
        axios.get(`${baseUrl}cinema`),
        axios.get(`${baseUrl}streaming`),
        axios.get(`${baseUrl}youtube`)
      ]);

      const allMovies = [
        ...cinema.data.map(m => ({ ...m, type: 'cinema' })),
        ...streaming.data.map(m => ({ ...m, type: 'streaming' })),
        ...youtube.data.map(m => ({ ...m, type: 'youtube' }))
      ];

      setMovies(allMovies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Delete function
  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`${baseUrl}${type}/${id}`);
      alert('Movie deleted');
      fetchMovies(); // Re-fetch to update UI
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete movie');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      handleDelete(type, id);
    }
  };
  if (loading) return <Loader />;

  return (
    <div className="px-4 py-8 bg-black text-white">
      <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        {movies.length > 0 ? 'Manage Movies' : 'No movies found'}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.slice().reverse().map((movie, index) => (
          <div
            key={index}
            className="bg-gray-900 p-4 rounded-md shadow-md flex flex-col items-center"
          >
            <div className="w-full aspect-[2/3] overflow-hidden rounded-md">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-lg font-semibold mt-2 text-center">{movie.title}</h4>
            <p className="text-sm text-white m-3 bg-gray-600 px-3 py-1 rounded-full capitalize">
              {movie.type}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/admin/edit${movie.type}movie/${movie._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(movie.type, movie._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-xl text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMovies;
