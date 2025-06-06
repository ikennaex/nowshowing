import React, { useState, useMemo, useEffect } from 'react';
import HeroSection from '../Components/HeroSection';
import CurrentlyPlaying from '../Components/CurrentlyPlaying';
import SearchBar from '../Components/SearchBar';
import axios from 'axios';
import { baseUrl } from '../baseUrl';

const Homepage = () => {
  const [search, setSearch] = useState('');
  const [fetchedCinemaMovies, setFetchedCinemaMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCinemaMovies = async () => {
      try {
        const response = await axios.get(`${baseUrl}cinema`);
        setFetchedCinemaMovies(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCinemaMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    const query = search.toLowerCase();
    return fetchedCinemaMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.body?.toLowerCase().includes(query) ||
      movie.location?.some((loc) => loc.toLowerCase().includes(query))
    );
  }, [search, fetchedCinemaMovies]);

  return (
    <div>
      <HeroSection />
      <SearchBar search={search} setSearch={setSearch} />
      <CurrentlyPlaying movies={filteredMovies} loading={loading} error={error} />
    </div>
  );
};

export default Homepage;
