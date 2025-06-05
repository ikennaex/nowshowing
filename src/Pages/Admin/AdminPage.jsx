import React from "react";
import SearchBar from "../../Components/SearchBar";
import { useState, useMemo, useEffect } from "react";
import movies from "../../data/movies";
import AdminMovies from "../../Components/Admin/AdminMovies";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import Loader from "../../Components/Loader";

const AdminPage = () => {
  const [search, setSearch] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [cinemaRes, streamingRes, youtubeRes] = await Promise.all([
          axios.get(`${baseUrl}cinema`),
          axios.get(`${baseUrl}streaming`),
          axios.get(`${baseUrl}youtube`),
        ]);

        const mergedMovies = [
          ...cinemaRes.data.map((movie) => ({ ...movie, type: "cinema" })),
          ...streamingRes.data.map((movie) => ({
            ...movie,
            type: "streaming",
          })),
          ...youtubeRes.data.map((movie) => ({ ...movie, type: "youtube" })),
        ];

        setAllMovies(mergedMovies);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    const query = search.toLowerCase();
    return allMovies.filter(
      (movie) =>
        movie.title?.toLowerCase().includes(query) ||
        movie.body?.toLowerCase().includes(query)
    );
  }, [search, allMovies]);

  if (loading) return (<div className='mt-24'>
    <Loader />
  </div>) ;

  return (
    <div>
      <div className="px-4 py-8 bg-black text-white min-h-screen">
        <SearchBar search={search} setSearch={setSearch} />
        {/* Top Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-8 mt-8 px-4">
          <button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
            Manage Movies
          </button>

          <Link to="createcinemamovie">
            <button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
              Create Cinema Movie
            </button>
          </Link>

          <Link to="createstreamingmovie">
            <button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
              Create Streaming Movie
            </button>
          </Link>

          <Link to="createyoutubemovie">
            <button className="px-4 py-2 rounded-xl border border-customBlue text-customBlue hover:bg-customBlue hover:text-white focus:bg-customBlue focus:text-white transition">
              Create Youtube Movie
            </button>
          </Link>
        </div>

        <AdminMovies movies={filteredMovies} />
      </div>
    </div>
  );
};

export default AdminPage;
