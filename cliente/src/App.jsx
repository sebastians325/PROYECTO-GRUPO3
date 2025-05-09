import './App.css'; 
//import axios from "axios";
//import { useEffect } from 'react';
//import footer from '../src/ComponentesGeneral/footer'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './PaginasUsuario/LandingPage';
import ConfirmationPage from './pages/PaginaConfirmación/ConfirmationPage';
import RegisterPageCliente from './pages/PaginaRegistroCliente/RegisterPage2';
import RegisterPageFreelancer from './pages/PaginaRegistroFreelancer/RegisterPage';
import CrearPublicacionCliente from './pages/Publicaciones/CrearPublicacionCliente';
import VerPublicacionesFreelancer from './pages/Publicaciones/VerPublicacionesFreelancer';
import CandidatosPorPublicacion from './pages/Publicaciones/CandidatosPorPublicacion';
import LoginPage1 from './pages/Publicaciones/LoginPage1';
import DashboardCliente from './pages/Publicaciones/DashboardCliente';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register/cliente" element={<RegisterPageCliente />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/register/freelancer" element={<RegisterPageFreelancer />} />
        <Route path="/publicaciones/crear" element={<CrearPublicacionCliente />} />
        <Route path="/publicaciones/ver" element={<VerPublicacionesFreelancer />} />
        <Route path="/publicaciones/candidatos" element={<CandidatosPorPublicacion />} />
        <Route path="/publicaciones/login" element={<LoginPage1 />} />
        <Route path="/dashboard/cliente/:id" element={<DashboardCliente />} />             
        </Routes>
    </div>
  )
}

export default App;
