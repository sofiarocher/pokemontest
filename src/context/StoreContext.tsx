// src/context/StoreContext.tsx
import { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

interface Pokemon {
  name: string;
  price: {
    amount: number;
    currency: string;
  };
}

interface State {
  wallet: {
    currency: string;
    balance: number;
  };
  cart: Pokemon[];
  purchased: string[];
}

interface Action {
  type: string;
  pokemon?: Pokemon;
  total?: number;
  amount?: number;
}

const initialState: State = {
  wallet: {
    currency: 'MXN',
    balance: Math.random() * (2000 - 500) + 200 
  },
  cart: [],
  purchased: []
};

const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (action.pokemon && state.cart.some(item => item.name === action.pokemon!.name)) {
        return state; 
      }
      return { ...state, cart: [...state.cart, action.pokemon!] };
    case 'CONFIRM_CART':
      const total = action.total!;
      return {
        ...state,
        wallet: { ...state.wallet, balance: state.wallet.balance - total },
        purchased: [...state.purchased, ...state.cart.map(pokemon => pokemon.name)],
        cart: []
      };
    case 'ADD_FUNDS':
      return { ...state, wallet: { ...state.wallet, balance: state.wallet.balance + (action.amount || 0) } };
    default:
      return state;
  }
}
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
