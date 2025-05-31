import React from 'react'
import SearchBar from '../../Components/SearchBar'
import { useState, useMemo } from 'react'
import movies from '../../data/movies';
import AdminMovies from '../../Components/Admin/AdminMovies';
import AdminCreateMovies from '../../Components/Admin/AdminCreateMovies';


const AdminPage = () => {

    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('manage');

      const renderComponent = () => {
        switch (activeTab) {
          case 'create':
            return <AdminCreateMovies />;
          case 'manage':
          default:
            return <AdminMovies movies={filteredMovies} />;
        }
      };

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
            className={`px-4 py-2 rounded ${activeTab === 'manage' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Movies
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'create' ? 'bg-green-600' : 'bg-gray-700'} hover:bg-green-700`}
            onClick={() => setActiveTab('create')}
          >
            Create Movie
          </button>
          
        </div>

        {/* Render selected tab */}
        {renderComponent()}
      </div>
    </div>
  )
}

export default AdminPage