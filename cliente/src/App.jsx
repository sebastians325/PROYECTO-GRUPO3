import './App.css';
import axios from "axios";
import { useEffect } from 'react';
import footer from '../src/ComponentesGeneral/footer'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './PaginasUsuario/LandingPage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
