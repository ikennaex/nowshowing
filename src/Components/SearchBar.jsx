import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ search, setSearch, suggestions = [] }) => {
  return (
    <div className="w-full px-4 md:px-8 z-50 mt-50 mt-10">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center"
      >
        <div className="relative w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <input
            type="text"
            role="searchbox"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for movies"
            className="w-full h-12 pl-10 pr-12 rounded-xl bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-customYellow transition"
          />
          <button
            type="submit"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
          >
            <CiSearch size={22} />
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {search && suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-zinc-800 p-7 rounded-md shadow-lg max-h-60 overflow-y-auto text-white">
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
