/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import Allevard from './pages/communes/Allevard';
import LeCollet from './pages/communes/LeCollet';
import CretsEnBelledonne from './pages/communes/CretsEnBelledonne';
import Pontcharra from './pages/communes/Pontcharra';
import Goncelin from './pages/communes/Goncelin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/immobilier-allevard" element={<Allevard />} />
        <Route path="/immobilier-le-collet-allevard" element={<LeCollet />} />
        <Route path="/immobilier-crets-en-belledonne" element={<CretsEnBelledonne />} />
        <Route path="/immobilier-pontcharra" element={<Pontcharra />} />
        <Route path="/immobilier-goncelin" element={<Goncelin />} />
      </Routes>
    </BrowserRouter>
  );
}
