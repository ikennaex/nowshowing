import { Link } from "react-router-dom";
import Loader from "./Loader";
import { Clapperboard } from "lucide-react";

const CurrentlyPlaying = ({ movies = [], loading, error }) => {
  // duration formatter
  function formatDuration(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? `${hrs}h ` : ""}${mins}m`;
  }

  if (loading)
    return (
      <div className="mt-24">
        <Loader />
      </div>
    );

  return (
    <div className="px-4 py-8 bg-black text-white">
      <h3 className="text-2xl md:text-3xl font-semibold text-center mb-6">
        {movies.length > 0 ? "Currently Playing" : error || "No movies found"}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies
          .slice()
          .reverse()
          .map((movie) => (
            <Link to={`/cinemamovie/${movie._id}`} key={movie._id}>
              <div className="cursor-pointer transform hover:scale-105 transition duration-300">
                <div className="relative w-full aspect-[2/3] overflow-hidden rounded-md">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />

                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(movie.duration)}
                  </span>

                  {movie.isNowShowing && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow inline-flex items-center gap-1">
                      <Clapperboard className="w-3 h-3" />
                      Now Showing
                    </span>
                  )}
                </div>
                
                <h4 className="text-lg font-semibold mt-2 text-center">
                  {movie.title}
                </h4>
                {/* <p className="text-sm text-gray-400 text-center">{movie.movie.body}</p> */}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CurrentlyPlaying;
