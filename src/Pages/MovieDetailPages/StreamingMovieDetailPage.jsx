import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import Loader from "../../Components/Loader";

const StreamingMovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [location, setLocation] = useState("");
  const [showtime, setShowtime] = useState("");
  const [seat, setSeat] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${baseUrl}streaming/${id}`);
        const movieData = response.data;
        setMovie(movieData);

        // Set default dropdown values
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // duration formatter
  function formatDuration(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m`;
  }

  if (loading) return <Loader />;
  if (error) {
    return <div className="text-white text-center p-6">{error}</div>;
  }

  if (!movie) return null;
  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6 mt-20">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full lg:w-1/2 rounded-xl object-cover"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
          <div>
            <h2 className="font-semibold text-white mt-4 uppercase text-sm">
              Genre
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {(Array.isArray(movie.genre)
                ? movie.genre
                : (movie.genre || "").split(",")
              ).map((g, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-white px-4 py-3 rounded-full text-m"
                >
                  {g.trim()}
                </span>
              ))}
            </div>
          </div>

          <h2 className="font-semibold text-white mt-4 uppercase text-sm">
            Synopsis
          </h2>
          <p className="text-gray-300">{movie.synopsis}</p>

          {/* Cast */}
          <div>
            <h2 className="text-lg font-semibold text-white mt-4 uppercase text-sm">
              Cast
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {(Array.isArray(movie.cast)
                ? movie.cast
                : (movie.cast || "").split(",")
              ).map((g, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-white px-4 py-3 rounded-full text-m"
                >
                  {g.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Duration (looks like a URL in your data) */}
          <p className="text-gray-300">
            <span className="font-semibold text-white uppercase text-sm">
              Duration:
            </span>{" "}
            {formatDuration(movie.duration)}
          </p>
          <div className="space-y-3">
            <p className="text-gray-300">
              <span className="font-semibold text-white uppercase text-sm">
                Release Date:
              </span>{" "}
              {isNaN(movie.updatedAt)
                ? new Date(movie.updatedAt).toLocaleDateString()
                : `Day ${movie.updatedAt}`}{" "}
              {/* Handle numeric fallback */}
            </p>

            <p className="text-gray-300">
              <span className="font-semibold text-white uppercase text-sm">
                Rating:
              </span>{" "}
              {movie.rating}
            </p>

            <p className="text-gray-300">
              <span className="font-semibold text-white uppercase text-sm">
                Streaming Platform:
              </span>{" "}
              {movie.streamingPlatform}
            </p>

            {/* Checkout Button */}
            <button className="rounded-xl w-full py-3 mt-4 bg-customPurple text-black font-semibold  hover:bg-purple-500 transition">
              <Link target="_blank" to={movie.link}>Watch now</Link>
            </button>
            {console.log(movie.link)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingMovieDetailPage;
