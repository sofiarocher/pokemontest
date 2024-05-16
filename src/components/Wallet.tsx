import { useStore } from '../context/StoreContext';

const Wallet: React.FC = () => {
  const { state, dispatch } = useStore();

  const handleAddFunds = (amount: number) => {
    dispatch({ type: 'ADD_FUNDS', amount });
  };

  return (
    <div className='flex gap-2 items-center'>
      <p className='border rounded-md p-1 text-sm sm:text-md border-primary'>{state.wallet.currency} ${state.wallet.balance.toFixed(1)} </p>
      <button className='border border-primary bg-primary text-sm sm:text-md text-white px-4 py-1 rounded-md' onClick={() => handleAddFunds(Math.random() * (1000 - 500) + 500)}>Añadir Fondos</button>
    </div>
  );
};

export default Wallet;
