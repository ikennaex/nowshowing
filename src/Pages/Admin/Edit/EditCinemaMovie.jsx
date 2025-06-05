import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import Loader from "../../../Components/Loader";
import { Link } from "react-router-dom";

const EditCinemaMovie = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    genre: '',
    duration: '',
    releaseDate: '',
    director: '',
    cast: '',
    language: '',
    location: '',
    isNowShowing: true,
    posterUrl: '',
    showtimes: '',
  });
  const [error, setError] = useState(null);
//for fetching the movie data
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${baseUrl}cinema/${id}`);
        setMovie(response.data);
        setFormData({
          title: '',
          synopsis: '',
          genre: '',
          duration: '',
          releaseDate: '',
          director: '',
          cast: '',
          language: '',
          location: '',
          isNowShowing: true,
          posterUrl: '',
          showtimes: '',
        });
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);
  //fetching the locaiton and formatting the data
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

    //checking location
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
    //setting location
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
          location: formData.location?.trim() || '',
          // releaseDate: Number(formData.releaseDate),
      };

      console.log(payload)

      try {
          await axios.put(`${baseUrl}cinema/${id}`, payload);
          alert('Movie updated successfully!');
      } catch (err) {
          console.error('Failed to update movie', err);
          alert('Error updating movie');
      }
      
  }

  if (loading) return <Loader />;
  if (error) {
  return <div className="text-white text-center p-6">{error}</div>;
  }

  if (!movie) return null;


  return (
    <div className="bg-black text-white px-4 py-8">


      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Edit Cinema Movie
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
          <span className="text-sm">Showtimes</span>
          <input
            type="date"
            name="showtimes"
            value={formData.showtimes}
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
          Update Movie
        </button>
      </form>
    </div>
  )
}

export default EditCinemaMovie