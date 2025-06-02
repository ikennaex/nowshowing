import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { Link } from 'react-router-dom';


const CreateYoutubeMovie = () => {

    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [movieType, setMovieType] = useState('');
    const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    genre: '',
    duration: '',
    releaseDate: '',
    director: '',
    cast: '',
    language: '',
    isNowShowing: true,
    posterUrl: '', // ✅ Added this
    });


    
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'location') {
        const suggestions = locations.filter((loc) =>
            loc.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredLocations(suggestions);
        }

        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {//  for formating the data in the correct format
        ...formData,
        genre: formData.genre.split(',').map((g) => g.trim()),
        cast: formData.cast.split(',').map((c) => c.trim()),
        releaseDate: Number(formData.releaseDate),
    };

    

    try {
        await axios.post(`${baseUrl}youtube`, payload);//appends the endpoint to baseUrls
        alert('Movie created successfully!');
    } catch (err) {
        console.error('Failed to create movie', err);
        alert('Error creating movie');
    }
    };


  return (
    <div className="bg-black text-white px-4 py-8">

        <div className="flex justify-center gap-4 mb-8 mt-8">
            <Link to='/admin'><button
            className={`px-4 py-2 rounded hover:bg-blue-700`}>
            Manage Movies
            </button></Link>

            <Link to='/admin/createcinemamovie'><button
            className={`px-4 py-2 rounded bg-customBlue`} >
            Create Cinema Movie
            </button></Link>

            <Link to='/admin/createstreamingmovie'><button
            className={`px-4 py-2 rounded bg-customBlue`} >
            Create Streaming Movie
            </button></Link>

            <Link to='#'><button
            className={`px-4 py-2 rounded bg-customBlue`} >
            Create Youtube Movie
            </button></Link>
            
        </div>


        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Create New YouTube Movie
        </h2>
        <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto grid grid-cols-1 gap-4"
        >
        

        <label>
            <span className="text-sm">Title</span>
            <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
        </label>

        <label>
            <span className="text-sm">Synopsis</span>
            <textarea
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
        </label>

        <label>
            <span className="text-sm">Genre (comma-separated)</span>
            <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
        </label>

        <label>
            <span className="text-sm">Duration (time or format)</span>
            <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
        </label>

        <label>
            <span className="text-sm">Release Date (number)</span>
            <input
            type="number"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
        </label>

        <label>
            <span className="text-sm">Director</span>
            <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
        </label>

        <label>
            <span className="text-sm">Cast (comma-separated)</span>
            <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
        </label>

        <label>
            <span className="text-sm">Language</span>
            <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
        </label>

        {/*Poster URL field */}
        <label>
            <span className="text-sm">Poster URL</span>
            <input
            type="file"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
        </label>

        {/* Location with Autosuggest */}
        <label>
            <span className="text-sm">Cinema Location</span>
            <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            autoComplete="off"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            />
            {filteredLocations.length > 0 && (
            <ul className="bg-gray-700 border mt-1 rounded-md">
                {filteredLocations.map((loc) => (
                <li
                    key={loc.id}
                    onClick={() => handleLocationSelect(loc.name + ", " + loc.city)}
                    className="cursor-pointer px-2 py-1 hover:bg-gray-600"
                >
                    {loc.name + ", " + loc.city}
                </li>
                ))}
            </ul>
            )}
        </label>


        <button
            type="submit"
            className="bg-customBlue hover:bg-blue-800 transition-colors py-2 px-4 rounded-md text-white font-semibold"
        >
            Create Movie
        </button>
        </form>
    </div>
  )
}

export default CreateYoutubeMovie