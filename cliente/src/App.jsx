import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './PaginasUsuario/LandingPage';
import ConfirmationPage from './pages/PaginaConfirmación/ConfirmationPage';
import RegisterPageCliente from './pages/PaginaRegistroCliente/RegisterPage2';
import RegisterPageFreelancer from './pages/PaginaRegistroFreelancer/RegisterPage';
import CrearPublicacionCliente from './pages/Publicaciones/CrearPublicacionCliente';
import VerPublicacionesFreelancer from './pages/Publicaciones/VerPublicacionesFreelancer';
import LoginPage1 from './pages/Publicaciones/LoginPage1';
import DashboardCliente from './pages/Publicaciones/DashboardCliente';
import DashboardFreelancer from './pages/Publicaciones/DashboardFreelancer'; // <--- IMPORTACIÓN AÑADIDA
import PostularseComoFreelancer from './pages/Publicaciones/PostularseComoFreelancer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register/cliente" element={<RegisterPageCliente />} />
        <Route path="/register/freelancer" element={<RegisterPageFreelancer />} />
       
      </Routes>
    </div>
  );
}

export default App;
