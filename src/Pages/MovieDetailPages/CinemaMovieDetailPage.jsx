import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import Loader from "../../Components/Loader";

const CinemaMovieDetailPage = () => {
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
        const response = await axios.get(`${baseUrl}cinema/${id}`);
        const movieData = response.data;
        setMovie(movieData);

        // Set default dropdown values
        if (movieData.location?.length) {
          setLocation(movieData.location[0]);
        }
        if (movieData.showtimes?.length) {
          setShowtime(movieData.showtimes[0]);
        }
        const firstAvailableSeat = movieData.seats?.find((s) => s.available);
        if (firstAvailableSeat) {
          setSeat(firstAvailableSeat.seat);
        }
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
            <h2 className="font-semibold text-white mt-4 uppercase text-sm">Genre</h2>
           <div className="flex flex-wrap gap-2 mt-2">
            
            {(Array.isArray(movie.genre) ? movie.genre : (movie.genre || '').split(',')).map((g, index) => (
              <span
                key={index}
                className="bg-gray-700 text-white px-4 py-2 rounded-full text-m"
              >
                {g.trim()}
              </span>
            ))}
          </div>
          </div>
          
          <p className="text-gray-300">{movie.synopsis}</p>

          {/* Director */}
          <p className="text-gray-300">
            <span className="font-semibold text-white uppercase text-sm">Director:</span>{" "}
            {movie.director}
          </p>

          {/* Cast */}
          <div>
            <h2 className="font-semibold text-white mt-4 uppercase text-sm">Cast</h2>
            <div className="flex flex-wrap gap-2 mt-2">
            {(Array.isArray(movie.cast) ? movie.cast : (movie.cast || '').split(',')).map((g, index) => (
              <span
                key={index}
                className="bg-gray-700 text-white px-4 py-2 rounded-full text-m"
              >
                {g.trim()}
              </span>
            ))}
          </div>
          </div>

          {/* Language */}
          <p className="text-gray-300">
            <span className="font-semibold text-white uppercase text-sm">Language:</span>{" "}
            {movie.language}
          </p>

          {/* Duration (looks like a URL in your data) */}
          <p className="text-gray-300">
            <span className="font-semibold text-white uppercase text-sm">Duration:</span>{" "}
            {formatDuration(movie.duration)}
          </p>
          <div className="space-y-3">
            {/* Location Dropdown */}
            <div>
              <label className="block font-semibold mb-1 uppercase text-sm">Location</label>
              <div className="w-full p-2 rounded bg-zinc-900 text-white">
                {movie.location}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Showtime</label>
              <div className="w-full p-2 rounded bg-zinc-900 text-white">
                {movie.showtimes}
              </div>
            </div>

            {/* Release Date (converted from number or timestamp if needed) */}
            <p className="text-gray-300">
              <span className="font-semibold text-white uppercase text-sm">Release Date:</span>{" "}
              {isNaN(movie.releaseDate)
                ? new Date(movie.releaseDate).toLocaleDateString()
                : `Day ${movie.releaseDate}`}{" "}
              {/* Handle numeric fallback */}
            </p>

            <p className="text-gray-300">
              <span className="font-semibold text-white uppercase text-sm">Rating:</span>{" "}
              {movie.rating}
            </p>

            {/* Is Now Showing */}
            <p className="text-gray-300">
              <span className="font-semibold text-white uppercase text-sm">Now Showing:</span>{" "}
              {movie.isNowShowing ? "Yes" : "No"}
            </p>

            {/* Seat Dropdown */}
            {/* <div>
              <label className="block text-sm mb-1">Seat</label>
              <select
                className="w-full p-2 rounded bg-zinc-900 text-white"
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
                >
                {movie.seats
                    .filter((s) => s.available)
                    .map((s, idx) => (
                    <option key={idx} value={s.seat}>
                        {s.seat}
                    </option>
                    ))}
                </select>
            </div>

            <p className="text-lg text-white">
              Ticket Price:{" "}
              <span className="text-customBlue font-semibold">
                ₦{movie.ticketPrice}
              </span>
            </p> */}

            {/* Checkout Button */}
            <button className="rounded-xl w-full py-3 mt-4 bg-customPurple text-black font-semibold  hover:bg-purple-500 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaMovieDetailPage;
