import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import AdminNav from '../../Components/Admin/AdminNav';
import { useNavigate } from 'react-router-dom';

const CreateCinemaMovie = () => {
  const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cinemaMovie, setCinemaMovie] = useState({
    title: '',
    synopsis: '',
    genre: '',
    duration: '',
    releaseDate: '',
    director: '',
    cast: '',
    language: '',
    // location: '',
    isNowShowing: true,
    posterUrl: null, // 
    // showtimes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCinemaMovie({
        ...cinemaMovie,
        [name]: value,
        });
    };

    // Handle Image Upload
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setCinemaMovie({ ...cinemaMovie, posterUrl: file });
        setPreview(URL.createObjectURL(file));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();

      // Convert strings to actual arrays
      const genreArray = cinemaMovie.genre.split(',').map(g => g.trim());
      const castArray = cinemaMovie.cast.split(',').map(c => c.trim());
      const languageArray = cinemaMovie.language.split(',').map(l => l.trim());

      formData.append("title", cinemaMovie.title);
      formData.append("synopsis", cinemaMovie.synopsis);
      formData.append("duration", parseInt(cinemaMovie.duration));
      formData.append("releaseDate", cinemaMovie.releaseDate);
      formData.append("director", cinemaMovie.director);
      formData.append("posterUrl", cinemaMovie.posterUrl);
      formData.append("isNowShowing", cinemaMovie.isNowShowing ? "true" : "false");

      // Append arrays correctly
      genreArray.forEach(g => formData.append("genre[]", g));
      castArray.forEach(c => formData.append("cast[]", c));
      languageArray.forEach(l => formData.append("language[]", l));

      try {
        setLoading(true);
        const response = await axios.post(`${baseUrl}cinema`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const cinemaMovieId = response.data._id; // Assuming the response contains the created movie ID
        alert('Movie created successfully!');
        navigate(`/admin/setshowtime/${cinemaMovieId}`);
      } catch (err) {
        if (err.response) {
          console.error('Server error:', err.response.status, err.response.data);
        } else {
          console.error('Request error:', err.message);
        }
        alert('Error creating movie');
      } finally {
        setLoading(false);
      }

      // For debugging
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
    };


   

  return (
    <div className="bg-black text-white px-4 py-8">

        <AdminNav/>


      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Create New Cinema Movie
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
            value={cinemaMovie.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Synopsis</span>
          <textarea
            name="synopsis"
            value={cinemaMovie.synopsis}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Genre (comma-separated)</span>
          <input
            type="text"
            placeholder='eg: Action, Thriller'
            name="genre"
            value={cinemaMovie.genre}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Duration (time in minutes)</span>
          <input
            type="number"
            placeholder='eg: 1hr 30m is 90m'
            name="duration"
            value={cinemaMovie.duration}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Release Date (number)</span>
          <input
            type="date"
            name="releaseDate"
            value={cinemaMovie.releaseDate}
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
            value={cinemaMovie.director}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Cast (comma-separated)</span>
          <input
            type="text"
            placeholder='eg: Mercy Johnson, Sam Loco'
            name="cast"
            value={cinemaMovie.cast}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Language(s) (comma separated)</span>
          <input
            type="text"
            placeholder='eg: English'
            name="language"
            value={cinemaMovie.language}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        {/*Poster URL field */}
        <label>
          <span className="text-sm">Image Cover</span>
          <input
            type="file"
            accept="image/*"
            name="posterUrl"
            onChange={handleImageChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
          {preview && <img src={preview} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg" />}
        </label>

        <button
          type="submit"
          className="bg-customBlue hover:bg-blue-800 transition-colors py-2 px-4 rounded-xl text-white font-semibold"
        >
          {loading ? 'Creating Cinema Movie...' : 'Create Movie'}
        </button>
      </form>
    </div>
  )
}   

export default CreateCinemaMovie