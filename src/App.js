import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Spinner from './Spinner';
import DiceDual from './DiceDual'; // ✅ Import DiceDual
import CoinToss from './CoinToss';  // Import your coin flip component
import HorseRace from './HorseRace';
import Plinko from './Plinko';
import { SpeedInsights } from "@vercel/speed-insights/react";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spinner" element={<Spinner />} />
        <Route path="/dicedual" element={<DiceDual />} />
        <Route path="/cointoss" element={<CoinToss />} /> 
        <Route path="/HorseRace" element={<HorseRace />} /> 
        <Route path="/Plinko" element={<Plinko />} /> 
      </Routes>
      <SpeedInsights />
    </Router>
  );
}


export default App;