import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Ecommerce from './pages/Ecommerce';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen backdrop-blur-md">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
