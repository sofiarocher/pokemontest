import React, { useState } from "react";
import SearchIcon from "../../public/search.svg";
import SkeletonCard from "./SkeletonCard";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-4 sm:mb-8 pt-8 sm:pt-16 font-chakra">Busca tu Pokemon preferido.</h2>
      <div className="relative w-3/4 sm:w-2/4 m-auto">
        <input
          type="text"
          className="w-full p-2 pl-4 pr-10 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-transparent"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="absolute right-3 top-2" onClick={handleSearch}>
          <img src={SearchIcon} alt="Search Icon" className="w-6" />
        </button>
      </div>
    </>
  );
};

export default Search;
