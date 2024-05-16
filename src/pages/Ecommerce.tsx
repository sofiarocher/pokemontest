import React, { useState } from 'react'
import Search from '../components/Search'
import PokemonList from '../components/PokemonList'
import Navbar from '../components/Navbar';

function Ecommerce() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };

  return (
    <div className='min-h-screen'>
        <Navbar />
        <Search onSearch={handleSearch} />
        <PokemonList searchQuery={searchQuery} />
    </div>
  )
}

export default Ecommerce