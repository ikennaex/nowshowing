import React, { useContext } from "react";
import SearchBar from "../../Components/SearchBar";
import { useState, useMemo, useEffect } from "react";
import AdminMovies from "../../Components/Admin/AdminMovies";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import Loader from "../../Components/Loader";
import AdminNav from "../../Components/Admin/AdminNav";
import { AdminContext } from "../../Context/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [search, setSearch] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const {admin} = useContext(AdminContext);
  const navigate = useNavigate();

  // checking if user is admin
    useEffect(() => {
    if (!admin) {
      navigate("/admin/login"); 
    }
  }, [admin, navigate]); // Only re-run when user or navigate changes

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
        <AdminNav/>

        <AdminMovies movies={filteredMovies} />
      </div>
    </div>
  );
};

export default AdminPage;
