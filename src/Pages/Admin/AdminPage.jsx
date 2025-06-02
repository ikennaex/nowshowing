import React from 'react'
import SearchBar from '../../Components/SearchBar'
import { useState, useMemo } from 'react'
import movies from '../../data/movies';
import AdminMovies from '../../Components/Admin/AdminMovies';
import { Link } from 'react-router-dom';


const AdminPage = () => {

    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('manage');

      

    const filteredMovies = useMemo(() => {
        const query = search.toLowerCase();
        return movies.filter(
        (movie) =>
            movie.title.toLowerCase().includes(query) ||
            movie.body.toLowerCase().includes(query)
        );
    }, [search]);

  return (
    <div>
      <div className="px-4 py-8 bg-black text-white min-h-screen">
        
        <SearchBar search={search} setSearch={setSearch} />
        {/* Top Buttons */}
        <div className="flex justify-center gap-4 mb-8 mt-8">
          <button
            className={`px-4 py-2 rounded hover:bg-blue-700`}>
            Manage Movies
          </button>

          <Link to='createcinemamovie'><button
            className={`px-4 py-2 rounded bg-customBlue`} >
            Create Cinema Movie
          </button></Link>

          <Link to='createstreamingmovie'><button
            className={`px-4 py-2 rounded bg-customBlue`} >
            Create Streaming Movie
          </button></Link>

          <Link to='createyoutubemovie'><button
            className={`px-4 py-2 rounded bg-customBlue`} >
            Create Youtube Movie
          </button></Link>
          
        </div>

        <AdminMovies movies={filteredMovies} />
      </div>
    </div>
  )
}

export default AdminPage