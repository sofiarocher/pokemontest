import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '../context/StoreContext';
import Wallet from './Wallet';
import Pokeball from '../../public/pokeball.png';

interface CartProps {
  onCancel: () => void;
}

const Cart: React.FC<CartProps> = ({ onCancel }) => {
  const { state, dispatch } = useStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [state.cart]);

  const calculateTotal = async () => {
    let sum = 0;
    for (const pokemon of state.cart) {
      const conversionRate = await fetchConversionRate(pokemon.price.currency, state.wallet.currency);
      sum += pokemon.price.amount * conversionRate;
    }
    setTotal(sum);
  };

  const fetchConversionRate = async (fromCurrency: string, toCurrency: string) => {
    const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    return res.data.rates[toCurrency];
  };

  const handleConfirm = () => {
    dispatch({ type: 'CONFIRM_CART', total });
    onCancel();  // Close the modal after confirming the purchase
  };

  const hasInsufficientFunds = total > state.wallet.balance;

  return (
    <div className='flex flex-col items-start gap-2'>
      <Wallet />
      {state.cart.map(pokemon => (
        <div key={pokemon.name} className="mb-2 capitalize flex items-end justify-start gap-6 w-full py-2">
          <img src={Pokeball} alt="Pokemon Card" className='w-6' />
          <p className='text-xl font-semibold font-chakra'>{pokemon.name}</p>
          <p>{pokemon.price.currency} ${pokemon.price.amount.toFixed(2)}</p>
        </div>
      ))}
      <p className="">Total: {state.wallet.currency} ${total.toFixed(2)}</p>
      {hasInsufficientFunds && (
        <p className="text-red-500">Fondos insuficientes para completar la compra.</p>
      )}
      <div className="flex gap-4">
        <button
          className="bg-green-500 text-white py-2 px-16 rounded shadow-md font-bold font-chakra"
          onClick={handleConfirm}
          disabled={hasInsufficientFunds}
        >
          Comprar
        </button>
        <button
          className="bg-primary text-white py-2 px-8 rounded shadow-md font-bold font-chakra"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Cart;
