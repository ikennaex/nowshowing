import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../Components/Loader";

const EditYoutubeMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    genre: '',
    duration: '',
    releaseDate: '',
    director: '',
    cast: '',
    language: '',
    isNowShowing: true,
    posterUrl: '',
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "posterUrl" ? files[0] : value,
    }));
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${baseUrl}youtube/${id}`);
        const movieData = response.data;
        setFormData({
          title: movieData.title || '',
          desc: movieData.desc || '',
          genre: movieData.genre ? movieData.genre.join(", ") : '',
          duration: movieData.duration || '',
          releaseDate: movieData.releaseDate || '',
          director: movieData.director || '',
          cast: movieData.cast ? movieData.cast.join(", ") : '',
          language: movieData.language || '',
          isNowShowing: movieData.isNowShowing ?? true,
          posterUrl: '', 
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
    setSubmitting(true);
    const payload = {
      ...formData,
      genre: formData.genre.split(',').map((g) => g.trim()),
      cast: formData.cast.split(',').map((c) => c.trim()),
      releaseDate: Number(formData.releaseDate),
    };

    console.log(payload);

    try {
      await axios.put(`${baseUrl}youtube/${id}`, payload);
      alert('Movie updated successfully!');
      navigate("/admin/youtube"); // optional redirect
    } catch (err) {
      console.error('Failed to update movie', err);
      alert('Error updating movie');
    }
  };

  if (loading || submitting) return <Loader />;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="bg-black text-white px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Edit YouTube Movie
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
          <span className="text-sm">Desc</span>
          <textarea
            name="desc"
            value={formData.desc}
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
          <span className="text-sm">Release Date (year)</span>
          <input
            type="date"
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
          Edit Movie
        </button>
      </form>
    </div>
  );
};

export default EditYoutubeMovie;
