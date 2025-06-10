import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import AdminNav from '../../Components/Admin/AdminNav';

const CreateYoutubeMovie = () => {
  const [preview, setPreview] = useState(null);
  const [youtubeMovie, setYoutubeMovie] = useState({
    title: '',
    desc: '',
    genre: '',
    duration: '',
    releaseDate: '',
    director: '',
    cast: '',
    language: '',
    link: '',
    rating: '',
    posterUrl: null, // File object
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setYoutubeMovie({
      ...youtubeMovie,
      [name]: value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setYoutubeMovie({ ...youtubeMovie, posterUrl: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', youtubeMovie.title);
    formData.append('desc', youtubeMovie.desc);
    formData.append('genre', JSON.stringify(youtubeMovie.genre.split(',').map(g => g.trim())));
    formData.append('duration', youtubeMovie.duration);
    formData.append('releaseDate', youtubeMovie.releaseDate);
    formData.append('director', youtubeMovie.director);
    formData.append('rating', youtubeMovie.rating);
    formData.append('link', youtubeMovie.link);
    formData.append('cast', JSON.stringify(youtubeMovie.cast.split(',').map(c => c.trim())));
    formData.append('language', youtubeMovie.language);
    formData.append('posterUrl', youtubeMovie.posterUrl); // File

    try {
      await axios.post(`${baseUrl}youtube`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Movie created successfully!');
    } catch (err) {
      console.error('Failed to create movie', err);
      alert('Error creating movie');
    }
  };

  return (
    <div className="bg-black text-white px-4 py-8">
      <AdminNav />
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
            value={youtubeMovie.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Synopsis</span>
          <textarea
            name="desc"
            value={youtubeMovie.desc}
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
            placeholder="e.g., Action, Drama"
            value={youtubeMovie.genre}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Duration</span>
          <input
            type="text"
            name="duration"
            placeholder="e.g., 90m"
            value={youtubeMovie.duration}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Release Date</span>
          <input
            type="date"
            name="releaseDate"
            value={youtubeMovie.releaseDate}
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
            value={youtubeMovie.director}
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
            placeholder="e.g., Mercy Johnson, Sam Loco"
            value={youtubeMovie.cast}
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
            value={youtubeMovie.language}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Youtube Link</span>
          <input
            type="text"
            name="link"
            placeholder='Link to youtube video'
            value={youtubeMovie.link}
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
            placeholder='eg: 7.5/10'
            value={youtubeMovie.rating}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Poster Image</span>
          <input
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
          {preview && (
            <img
              src={preview}
              alt="Poster Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg"
            />
          )}
        </label>

        <button
          type="submit"
          className="bg-customBlue hover:bg-blue-800 transition-colors py-2 px-4 rounded-xl text-white font-semibold"
        >
          Create Movie
        </button>
      </form>
    </div>
  );
};

export default CreateYoutubeMovie;
