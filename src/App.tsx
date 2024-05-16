import { StoreProvider } from './context/StoreContext';
import Ecommerce from './pages/Ecommerce';

const App: React.FC = () => {

  return (
    <StoreProvider>
      <div className="min-h-screenbackdrop-blur-md">
          <Ecommerce />
      </div>
    </StoreProvider>
  );
};

export default App;
