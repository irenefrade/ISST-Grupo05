import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LogIn from './components/LogIn.js';
import Home from './components/Home.js';
import Horarios from './components/Horarios.js';
import Ausencias from './components/Ausencias.js';
import SolicitudAusencia from './components/SolicitudAusencia.js';

const randomBackground = () => {
  const randomColorPart = () => Math.floor(Math.random() * 128 + 127).toString(16);
  return `#${randomColorPart()}${randomColorPart()}${randomColorPart()}`;
}

function App() {
  return (
    <div style={{backgroundColor: randomBackground()}}>
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/horarios" element={<Horarios />} />
          <Route path="/ausencias" element={<Ausencias />} />
          <Route path="/solicitud" element={<SolicitudAusencia />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
