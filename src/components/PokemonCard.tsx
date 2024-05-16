
import { useStore } from '../context/StoreContext';
import Pokeball from "../../public/pokeball.png";

interface PokemonCardProps {
  pokemon: {
    name: string;
    price: {
      amount: number;
      currency: string;
    };
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { state, dispatch } = useStore();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', pokemon });
  };

  const isPurchased = state.purchased.includes(pokemon.name);

  return (
    <div className='bg-white shadow-xl m-4 py-2 px-4 sm:w-52 sm:h-32 rounded-lg flex flex-col justify-center items-start gap-3 relative'>
      <img src={Pokeball} alt="Pokemon Ball" className='absolute w-4 sm:w-10 top-2 right-1 sm:right-3' />
      <h3 className='capitalize font-bold text-lg'>{pokemon.name}</h3>
      <p className=''>{pokemon.price.currency} ${pokemon.price.amount}</p>
      <button onClick={handleAddToCart} disabled={isPurchased} className='bg-[#BE5649] py-1 px-2 rounded-sm text-white text-sm'>
        {isPurchased ? 'Comprado' : 'Añadir al Carrito'}
      </button>
    </div>
  );
};

export default PokemonCard;
