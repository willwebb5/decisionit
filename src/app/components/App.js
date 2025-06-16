import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SpinTheWheel from './spinthewheel';
import DiceDual from './dicedual';
import CoinToss from './CoinToss';
import HorseRace from './horserace';
import Plinko from './plinko';
import { SpeedInsights } from "@vercel/speed-insights/react";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SpinTheWheel" element={<SpinTheWheel />} />
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