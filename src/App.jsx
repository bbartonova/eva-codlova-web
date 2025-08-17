import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Cenik from './pages/Cenik';
import Ecommerce from './pages/Ecommerce';
import Doucovani from './pages/Doucovani';

export default function App() {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cenik" element={<Cenik />} />
      <Route path="/ecommerce" element={<Ecommerce />} />
      <Route path="/doucovani" element={<Doucovani />} />
    </Routes>
  );
}
