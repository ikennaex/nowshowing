import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import movies from '../data/movies';
import { baseUrl } from '../baseUrl';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { id } = useParams(); 
  console.log('Movie ID from URL:', id);
  const [movie, setMovie] = useState(null);
  const [location, setLocation] = useState('');
  const [showtime, setShowtime] = useState('');
  const [seat, setSeat] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const found = movies.find((m) => String(m.id) === String(id));
    console.log('Movie ID changed:', id,found);
    if (found) {
      setMovie(found);
      setLocation(found.location);
      setShowtime(found.showtimes[0]);
      setSeat(found.seats.find(s => s.available)?.seat || '');
    } else {
      setError("Movie not found.");
    }
  }, [id]);
  //to get the cinema locations
  useEffect(() => {
    const location = async () => {
      try {
        const response = await axios.get(`${baseUrl}cinemalocations`); //should get the id from the id of the movie
        setLocation(response.data);
        console.log(response.data)
      } catch (err) {
        setError("Failed to fetch products");
      }
    };

    location();
  }, []);

  if (error) {
    return <div className="text-white text-center p-6">{error}</div>;
  }

  if (!movie) return null;

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6 mt-20">
        <img src={movie.image} alt={movie.title} className="w-full lg:w-1/2 rounded-xl object-cover" />
        
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
          <Link to={`/genres/${movie.genre.toLowerCase()}`} className="text-customPurple underline">
            {movie.genre}
          </Link>
          <p className="text-gray-300">{movie.body}</p>

          <div className="space-y-3">
            {/* Location Dropdown */}
            <div>
              <label className="block text-sm mb-1">Location</label>
              <select
                className="w-full p-2 rounded bg-zinc-900 text-white"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>{movie.location}</option>
              </select>
            </div>

            {/* Showtime Dropdown */}
            <div>
              <label className="block text-sm mb-1">Showtime</label>
              <select
                className="w-full p-2 rounded bg-zinc-900 text-white"
                value={showtime}
                onChange={(e) => setShowtime(e.target.value)}
              >
                {movie.showtimes.map((time, idx) => (
                  <option key={idx}>{time}</option>
                ))}
              </select>
            </div>

            {/* Seat Dropdown */}
            <div>
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

            {/* Ticket Price */}
            <p className="text-lg text-white">
              Ticket Price: <span className="text-customBlue font-semibold">₦{movie.ticketPrice}</span>
            </p>

            {/* Checkout Button */}
            <button className="w-full py-3 mt-4 bg-customPurple text-black font-semibold rounded hover:bg-customBlue transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
