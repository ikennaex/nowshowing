import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { Link } from 'react-router-dom';

const CreateStreamingMovie = () => {

    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    genre: '',
    duration: '',
    link: '',
    cast: '',
    rating: '',
    posterUrl: '',
    });

    useEffect(() => {
    const fetchLocations = async () => {
        try {
        const res = await axios.get(`${baseUrl}cinemalocations`);
        setLocations(res.data);
        } catch (err) {
        console.error('Failed to fetch locations', err);
        }
    };
    fetchLocations();
    }, []);

    
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

    const handleLocationSelect = (name) => {
    setFormData({ ...formData, location: name });
    setFilteredLocations([]);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {//  for formating the data in the correct format
        ...formData,
        genre: formData.genre.split(',').map((g) => g.trim()),
        cast: formData.cast.split(',').map((c) => c.trim()),
    };

    

    try {
        await axios.post(`${baseUrl}streaming`, payload);
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

          <Link to='#'><button
            className={`px-4 py-2 rounded bg-customBlue`} >
            Create Streaming Movie
          </button></Link>

          <Link to='/admin/createyoutubemovie'><button
            className={`px-4 py-2 rounded bg-customBlue`} >
            Create Youtube Movie
          </button></Link>
          
        </div>

      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Create New Streaming Movie
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


        {/*Poster URL field */}
        <label>
          <span className="text-sm">Poster URL</span>
          <input
            type="text"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>
        
        <label>
          <span className="text-sm">Link</span>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>
        
        
        <label>
          <span className="text-sm">Rating</span>
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
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

export default CreateStreamingMovie