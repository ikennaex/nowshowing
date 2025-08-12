import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import Loader from "../Components/Loader";
import AdvertDisplay from "../Components/AdvertDisplay";

const StreamingPage = () => {
  const [fetchedStreamingMovies, setFetchedStreamingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreamingMovies = async () => {
      try {
        const response = await axios.get(`${baseUrl}streaming`);
        setFetchedStreamingMovies(response.data);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchStreamingMovies();
  }, [fetchedStreamingMovies]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // duration formatter
  function formatDuration(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m`;
  }

  return (
    <div className="p-9">
      <AdvertDisplay />
      <h2 className="text-2xl font-semibold mb-4">Streaming Now</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {fetchedStreamingMovies.slice().reverse().map((movie, index) => (
          <Link
            to={`/streamingmovie/${movie._id}`}
            key={index}
            className="group"
          >
            <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                
                {formatDuration(movie.duration)}
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-semibold leading-snug group-hover:underline">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">⭐ {movie.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StreamingPage;
