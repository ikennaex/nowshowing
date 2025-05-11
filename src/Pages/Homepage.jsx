import React from 'react'
import HeroSection from '../Components/HeroSection'
import CurrentlyPlaying from '../Components/CurrentlyPlaying'
import SearchBar from '../Components/SearchBar'
import { useState, useMemo } from 'react'
import movies from '../data/movies';

const Homepage = () => {

  const [search, setSearch] = useState('');

  const filteredMovies = useMemo(() => {
    const query = search.toLowerCase();
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.body.toLowerCase().includes(query)
    );
  }, [search]);


  return (
    <div>
      <HeroSection/>
      <SearchBar search={search} setSearch={setSearch} />
      <CurrentlyPlaying movies={filteredMovies}  />
    </div>
  )
}

export default Homepage