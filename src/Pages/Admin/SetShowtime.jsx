import axios from "axios";
import React from "react";
import { baseUrl } from "../../baseUrl";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Clapperboard } from "lucide-react";
import { compareAsc, format } from "date-fns";

const SetShowtime = () => {
  const [movie, setmovie] = useState("");
  const [location, setLocation] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [existingShowtimes, setExistingShowtimes] = useState([]); // to store existing showtimes
  const [showDate, setShowDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${baseUrl}cinema/${id}`);
        setmovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, []);

  // fetching cinema locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${baseUrl}cinemalocations`);
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching cinema locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // fetch existing showtimes
  useEffect(() => {
    const fetchExistingShowtimes = async () => {
      try {
        const response = await axios.get(`${baseUrl}showtimes/${id}`);
        setExistingShowtimes(response.data);
        console.log("Existing Showtimes:", response);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    };

    fetchExistingShowtimes();
  }, [existingShowtimes]);

  //   time formatter to AM and PM
  function formatTo12Hour(time24) {
    const [hour, minute] = time24.split(":");
    const h = parseInt(hour);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  }

  const handleChange = (e) => {
    // Destructure name and value from the event target
    const { name, value } = e.target;
    if (name === "cinemaLocation") {
      setSelectedLocation(value);
    } else if (name === "showDate") {
      setShowDate(value);
    } else if (name === "showtimes") {
      setShowtimes(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // for showtime format
    const showtime12hrs = formatTo12Hour(showtimes);
    console.log(showtime12hrs);
    console.log(selectedLocation);
    try {
      setLoading(true);
      await axios.post(`${baseUrl}showtimes`, {
        movie: id,
        cinemaLocation: selectedLocation,
        showDate: showDate,
        times: showtime12hrs,
      });
      //   setLocation("");
      setShowDate("");
      setShowtimes("");
      console.log("Showtime set successfully");
    } catch (error) {
      console.error("Error setting showtime:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 px-4">

      
      <div className="flex gap-6 items-start mb-8 bg-gray-800 rounded-lg p-4 shadow-lg">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            className="w-28 h-40 object-cover rounded-md shadow-md"
            src={movie.posterUrl}
            alt={movie.title}
          />
        </div>

        {/* Movie Info */}
        <div className="flex flex-col gap-2 text-white">
          <h1 className="text-2xl font-extrabold text-white">{movie.title}</h1>
          <p className="text-sm text-gray-300">{movie.synopsis}</p>

          {movie.rating && (
            <span className="mt-2 inline-block px-3 py-1 bg-blue-600 text-xs rounded-full font-semibold w-fit">
              Rating: {movie.rating}
            </span>
          )}
        </div>
      </div>

      <div>
        <p className="pb-4">Showtimes for {movie.title}</p>

        <div className="flex flex-wrap gap-4">
          {existingShowtimes.map((showtime) => {
            return (
              <div className="bg-gray-800 p-5 rounded-lg" key={showtime._id}>
                <Clapperboard className="w-8 h-8 text-customBlue mb-2" />
                <h1 className="font-semibold text-lg">
                  {showtime.cinemaLocation.name}, {showtime.cinemaLocation.city}{" "}
                  <br /> {showtime.showDate} <br /> {showtime.times}
                </h1>
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-7">
        <p className="pb-4">
          Set showtimes for{" "}
          <span className="text-customBlue">{movie.title}</span>
        </p>

        <form className="flex flex-col gap-2" action="">
          <select
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            name="cinemaLocation"
            id=""
            onChange={handleChange}
          >
            <option value="">Select Cinema</option>
            {location.map((location) => (
              <option key={location._id} value={location._id}>
                {location.name}, {location.city}, {location.state}
              </option>
            ))}
          </select>
          <input
            name="showDate"
            value={showDate}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            type="date"
            onChange={handleChange}
          />
          <input
            name="showtimes"
            value={showtimes}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-600 mt-1"
            type="time"
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            className="bg-customBlue hover:bg-blue-800 transition-colors py-2 px-4 rounded-xl text-white font-semibold w-1/3 mt-5"
          >
            {loading ? "Setting Showtime..." : "Set Showtime"}
          </button>
      <Link
        to="/admin"
        className="inline-flex mt-4 items-center gap-2 text-customBlue hover:text-blue-400 transition font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Admin
      </Link>
        </form>
      </div>
    </div>
  );
};

export default SetShowtime;
