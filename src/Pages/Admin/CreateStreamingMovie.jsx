import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "../../Components/Admin/AdminNav";

const CreateStreamingMovie = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [streamingMovie, setStreamingMovie] = useState({
    title: "",
    synopsis: "",
    genre: "",
    duration: "",
    director: "",
    link: "",
    streamingPlatform: "",
    cast: "",
    rating: "",
    posterUrl: null,
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setStreamingMovie({
      ...streamingMovie,
      [name]: value,
    });

  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStreamingMovie({ ...streamingMovie, posterUrl: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append individual fields
    formData.append("title", streamingMovie.title);
    formData.append("synopsis", streamingMovie.synopsis);
    formData.append("duration", streamingMovie.duration);
    formData.append("link", streamingMovie.link);
    formData.append("director", streamingMovie.director);
    formData.append("releaseDate", streamingMovie.releaseDate);
    formData.append("rating", streamingMovie.rating);
    formData.append("streamingPlatform", streamingMovie.streamingPlatform);
    formData.append("posterUrl", streamingMovie.posterUrl);

    // Properly format and append genre as array (multiple values)
    streamingMovie.genre
      .split(",")
      .map((g) => g.trim())
      .forEach((g) => formData.append("genre", g));

    // Properly format and append cast as array (multiple values)
    streamingMovie.cast
      .split(",")
      .map((c) => c.trim())
      .forEach((c) => formData.append("cast", c));

    try {
      await axios.post(`${baseUrl}streaming`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Movie created successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Failed to create movie", err);
      alert("Error creating movie");
    }
  };

  return (
    <div className="bg-black text-white px-4 py-8">
      <AdminNav />

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
            value={streamingMovie.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Synopsis</span>
          <textarea
            name="synopsis"
            value={streamingMovie.synopsis}
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
            value={streamingMovie.genre}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Duration (time in mintues)</span>
          <input
            type="text"
            name="duration"
            placeholder='eg: 1hr 30m is 90m'
            value={streamingMovie.duration}
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
            value={streamingMovie.director}
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
            value={streamingMovie.cast}
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
            value={streamingMovie.releaseDate}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        {/*Poster URL field */}
        <label>
          <span className="text-sm">Movie Cover</span>
          <input
            type="file"
            accept="image/*"
            name="posterUrl"
            onChange={handleImageChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-lg"
            />
          )}
        </label>

        <label>
          <span className="text-sm">Link</span>
          <input
            type="text"
            name="link"
            placeholder="Movie link"
            value={streamingMovie.link}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
        </label>

        <label>
          <span className="text-sm">Streaming Platform</span>
          <input
            type="text"
            placeholder="eg: Netflix, Hulu"
            name="streamingPlatform"
            value={streamingMovie.streamingPlatform}
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
            value={streamingMovie.rating}
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
          />
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

export default CreateStreamingMovie;
