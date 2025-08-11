import React, { useState, useMemo, useEffect } from "react";
import HeroSection from "../Components/HeroSection";
import CurrentlyPlaying from "../Components/CurrentlyPlaying";
import SearchBar from "../Components/SearchBar";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import AdvertDisplay from "../Components/AdvertDisplay";

const Homepage = () => {
  const [search, setSearch] = useState("");
  // movie types
  const [fetchedCinemaMovies, setFetchedCinemaMovies] = useState([]);
  const [fetchedStreamingMovies, setFetchedStreamingMovies] = useState([]);
  const [fetchedYoutubeMovies, setFetchedYoutubeMovies] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchAllMovies = async () => {
    try {
      const [cinemaRes, streamingRes, youtubeRes] = await Promise.all([
        axios.get(`${baseUrl}cinema`),
        axios.get(`${baseUrl}streaming`),
        axios.get(`${baseUrl}youtube`)
      ]);

      setFetchedCinemaMovies(cinemaRes.data);
      setFetchedStreamingMovies(streamingRes.data);
      setFetchedYoutubeMovies(youtubeRes.data);
    } catch (err) {
      setError("Failed to fetch one or more movie types");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchAllMovies();
}, []);

  // come back to this later
const allMovies = useMemo(() => {
  return [
    ...fetchedCinemaMovies.map(movie => ({ ...movie, type: 'cinema' })),
    ...fetchedStreamingMovies.map(movie => ({ ...movie, type: 'streaming' })),
    ...fetchedYoutubeMovies.map(movie => ({ ...movie, type: 'youtube' }))
  ];
}, [fetchedCinemaMovies, fetchedStreamingMovies, fetchedYoutubeMovies]);

const filteredMovies = useMemo(() => {
  const query = search.toLowerCase();
  return allMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.body?.toLowerCase().includes(query) ||
      movie.location?.some((loc) => loc.toLowerCase().includes(query))
  );
}, [search, allMovies]);

  return (
    <div>
      <HeroSection />
      <AdvertDisplay />
      <SearchBar search={search} setSearch={setSearch} />
      <CurrentlyPlaying
        movies={filteredMovies}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Homepage;
