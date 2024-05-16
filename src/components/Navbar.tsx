import React, { useState } from 'react';
import Wallet from './Wallet';
import CartIcon from '../../public/cart.svg';
import HomeIcon from '../../public/home.svg';
import Cart from './Cart';
import { useStore } from '../context/StoreContext';

function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useStore();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLDivElement).id === 'cart-modal') {
      setIsCartOpen(false);
    }
  };

  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <p></p>
        <Wallet />
        <div className="relative">
          <img src={CartIcon} alt="Cart Icon" className="sm:w-8 w-6 cursor-pointer" onClick={toggleCart} />
          {state.cart.length > 0 && (
            <div className="absolute bottom-0 left-0 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
              {state.cart.length}
            </div>
          )}
        </div>
      </div>
      {isCartOpen && (
        <div id="cart-modal" className="fixed inset-0 backdrop-blur-sm bg-gray-900 bg-opacity-50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
          <div className="bg-white p-4 rounded shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
            <Cart onCancel={toggleCart} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
