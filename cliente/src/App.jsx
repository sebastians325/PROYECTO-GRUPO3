import './App.css';
import axios from "axios";
import { useEffect } from 'react';
import footer from '../src/ComponentesGeneral/footer'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './PaginasUsuario/LandingPage';
import ConfirmationPage from './pages/PaginaConfirmación/ConfirmationPage';
import RegisterPageCliente from './pages/PaginaRegistroCliente/RegisterPage2';
import RegisterPageFreelancer from './pages/PaginaRegistroFreelancer/RegisterPage';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register/cliente" element={<RegisterPageCliente />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/register/freelancer" element={<RegisterPageFreelancer />} />
       
      </Routes>
    </div>
  );
}

export default App;
