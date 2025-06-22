import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import AdminNav from '../../Components/Admin/AdminNav';

const CreateCinemaMovie = () => {

    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [preview, setPreview] = useState(null);
    const [cinemaMovie, setCinemaMovie] = useState({
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
    posterUrl: null, // 
    showtimes: '',
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

        setCinemaMovie({
        ...cinemaMovie,
        [name]: value,
        });
    };

    const handleLocationSelect = (name) => {
    setCinemaMovie({ ...cinemaMovie, location: name });
    setFilteredLocations([]);
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
      const showtimesArray = [cinemaMovie.showtimes]; // wrap in array!

      formData.append("title", cinemaMovie.title);
      formData.append("synopsis", cinemaMovie.synopsis);
      formData.append("duration", parseInt(cinemaMovie.duration));
      formData.append("releaseDate", cinemaMovie.releaseDate);
      formData.append("director", cinemaMovie.director);
      formData.append("language", cinemaMovie.language);
      formData.append("location", cinemaMovie.location?.trim() || '');
      formData.append("posterUrl", cinemaMovie.posterUrl);
      formData.append("isNowShowing", cinemaMovie.isNowShowing ? "true" : "false");

      // Append arrays correctly
      genreArray.forEach(g => formData.append("genre[]", g));
      castArray.forEach(c => formData.append("cast[]", c));
      showtimesArray.forEach(s => formData.append("showtimes[]", s));

      try {
        await axios.post(`${baseUrl}cinema`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert('Movie created successfully!');
        navigate('/admin');
      } catch (err) {
        if (err.response) {
          console.error('Server error:', err.response.status, err.response.data);
        } else {
          console.error('Request error:', err.message);
        }
        alert('Error creating movie');
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
          <span className="text-sm">Language</span>
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

        <label>
          <span className="text-sm">Showtimes</span>
          <input
            type="time"
            name="showtimes"
            value={cinemaMovie.showtimes}
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
            placeholder='eg: Filmworld Cinema, Lekki'
            name="location"
            value={cinemaMovie.location}
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
          className="bg-customBlue hover:bg-blue-800 transition-colors py-2 px-4 rounded-xl text-white font-semibold"
        >
          Create Movie
        </button>
      </form>
    </div>
  )
}   

export default CreateCinemaMovie