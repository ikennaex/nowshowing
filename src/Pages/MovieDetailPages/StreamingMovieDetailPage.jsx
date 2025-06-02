import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import axios from 'axios';
import Loader from '../../Components/Loader';

const StreamingMovieDetailPage = () => {

    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [location, setLocation] = useState('');
    const [showtime, setShowtime] = useState('');
    const [seat, setSeat] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchMovie = async () => {
        try {
        const response = await axios.get(`${baseUrl}streaming/${id}`);
        const movieData = response.data;
        setMovie(movieData);

        // Set default dropdown values
        if (movieData.location?.length) {
            setLocation(movieData.location[0]);
        }
        if (movieData.showtimes?.length) {
            setShowtime(movieData.showtimes[0]);
        }
        const firstAvailableSeat = movieData.seats?.find(s => s.available);
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



    if (loading) return <Loader />;
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
            <Link to={`/genres/`} className="text-customPurple underline">
            {movie.genre}
            </Link>
            <p className="text-gray-300">{movie.synopsis}</p>


            {/* Cast */}
            <div>
            <h2 className="text-lg font-semibold text-white mt-4">Cast</h2>
            <ul className="list-disc list-inside text-gray-300">
                {movie.cast.map((actor, idx) => (
                <li key={idx}>{actor}</li>
                ))}
            </ul>
            </div>

            

            {/* Duration (looks like a URL in your data) */}
            <p className="text-gray-300">
            <span className="font-semibold text-white">More Info:</span>{' '}
            <a href={movie.duration} target="_blank" rel="noopener noreferrer" className="text-customBlue underline">
                {movie.duration}
            </a>
            </p>
            <div className="space-y-3">
            



            {/* Release Date (converted from number or timestamp if needed) */}
            <p className="text-gray-300">
                <span className="font-semibold text-white">Release Date:</span>{' '}
                {isNaN(movie.updatedAt)
                ? new Date(movie.updatedAt).toLocaleDateString()
                : `Day ${movie.updatedAt}`} {/* Handle numeric fallback */}
            </p>



            {/* Checkout Button */}
            <button className="w-full py-3 mt-4 bg-customPurple text-black font-semibold rounded hover:bg-customBlue transition">
                Watch now
            </button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default StreamingMovieDetailPage