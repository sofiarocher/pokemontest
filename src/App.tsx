import { StoreProvider } from './context/StoreContext';
import Ecommerce from './pages/Ecommerce';
import Home from './pages/Home';

const App: React.FC = () => {

  return (
    <StoreProvider>
      <div className="min-h-screenbackdrop-blur-md">
        <Home></Home>
          <Ecommerce />
      </div>
    </StoreProvider>
  );
};

export default App;
