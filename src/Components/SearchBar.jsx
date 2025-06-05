import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ search, setSearch, suggestions = [] }) => {
  return (
    <div className="w-full px-4 md:px-8 relative z-50 mt-50 mt-10">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center"
      >
        <input
          type="text"
          role="searchbox"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for movies"
          className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-12 px-4 rounded-md bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-customYellow transition"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 h-12 px-5 rounded-md bg-customPurple text-black font-medium hover:bg-customBlue transition"
        >
          <CiSearch className="text-white" size={22} />
          <span className=" sm:inline text-white">Search</span>
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {search && suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-zinc-800 rounded-md shadow-lg max-h-60 overflow-y-auto text-white">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-customBlue cursor-pointer"
              onClick={() => setSearch(item.title)}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
