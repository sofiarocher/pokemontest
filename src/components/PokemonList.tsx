import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStore } from '../context/StoreContext';
import PokemonCard from './PokemonCard';
import SkeletonCard from './SkeletonCard';

interface Pokemon {
  id: number;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
}

interface PokemonListProps {
  searchQuery: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ searchQuery }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const { state } = useStore();

  useEffect(() => {
    const fetchInitialPokemons = async () => {
      setLoading(true);
      await fetchPokemons(true);
      setLoading(false);
    };

    fetchInitialPokemons();
  }, [searchQuery]);

  const fetchPokemons = async (isNewQuery = false) => {
    try {
      if (isNewQuery) {
        setPokemons([]);
        setPage(1);
        setHasMore(true);
      }

      const offset = isNewQuery ? 0 : (page - 1) * 20;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const data = await Promise.all(
        res.data.results.map(async (pokemon: any) => {
          const details = await axios.get(pokemon.url);
          return { ...details.data, price: generateRandomPrice() };
        })
      );

      setPokemons(prev => isNewQuery ? data : [...prev, ...data]);
      setPage(prev => isNewQuery ? 2 : prev + 1);
      if (data.length < 10) setHasMore(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setHasMore(false);
      setLoading(false);
    }
  };

  const generateRandomPrice = () => {
    const currencies = ['MXN', 'USD', 'EUR', 'AUD', 'CAD'];
    const price = Math.random() * (100 - 10) + 10;
    const roundedPrice = Math.round(price * 10) / 10;
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    return { amount: roundedPrice, currency };
  };

  return (
    <div id="scrollableDiv" className='overflow-auto max-h-[600px] pl-6 sm:p-0 lg:w-2/4 mt-4 sm:mt-12 mx-auto'>
      <InfiniteScroll
        dataLength={pokemons.length}
        next={() => fetchPokemons(false)}
        hasMore={hasMore}
        loader={
          loading ? (
            <div className='flex flex-wrap'>
              {Array(6).fill(null).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : null
        }
        scrollableTarget="scrollableDiv"
      >
        <div className='flex flex-wrap'>
          {loading ? (
            <div className='flex flex-wrap'>
              {Array(6).fill(null).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            pokemons.filter(pokemon => pokemon.name.includes(searchQuery)).map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;
