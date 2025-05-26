import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Spinner from './Spinner';
import DiceDual from './DiceDual'; // ✅ Import DiceDual
import CoinToss from './CoinToss';  // Import your coin flip component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spinner" element={<Spinner />} />
        <Route path="/dicedual" element={<DiceDual />} />
        <Route path="/cointoss" element={<CoinToss />} /> 
      </Routes>
    </Router>
  );
}


export default App;