import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../Components/Loader";
import { Link } from "react-router-dom";


const EditStreamingMovie = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
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
  const [error, setError] = useState(null);


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


  //for fetching the movie data
  useEffect(() => {
  const fetchMovie = async () => {
    try {
      const response = await axios.get(`${baseUrl}streaming/${id}`);
      const movieData = response.data;

      setMovie(movieData);
      setFormData({
        title: movieData.title || '',
        synopsis: movieData.synopsis || '',
        genre: Array.isArray(movieData.genre) ? movieData.genre.join(', ') : movieData.genre || '',
        duration: movieData.duration || '',
        link: movieData.link || '',
        cast: Array.isArray(movieData.cast) ? movieData.cast.join(', ') : movieData.cast || '',
        rating: movieData.rating || '',
        posterUrl: movieData.posterUrl || '',
      });
    } catch (err) {
      setError("Failed to fetch movie");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchMovie();
  }
}, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {//  for formating the data in the correct format
        ...formData,
        genre: formData.genre.split(',').map((g) => g.trim()),
        cast: formData.cast.split(',').map((c) => c.trim()),
    };

    console.log(payload)

    try {
        await axios.put(`${baseUrl}streaming/${id}`, payload);
        alert('Movie updated successfully!');
    } catch (err) {
        console.error('Failed to update movie', err);
        alert('Error updating movie');
    }
  }

  return (
    <div className="bg-black text-white px-4 py-8">

    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
      Edit Streaming Movie
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

      <label>
        <span className="text-sm">Poster URL</span>
        <input
          type="file"
          name="posterUrl"
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
        />
      </label>


      <button
        type="submit"
        className="bg-customBlue hover:bg-blue-800 transition-colors py-2 px-4 rounded-xl text-white font-semibold"
      >
        Update Movie
      </button>
    </form>
  </div>
  )
}

export default EditStreamingMovie