// App.jsx
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
import DashboardFreelancer from './pages/Publicaciones/DashboardFreelancer';
import PostularseComoFreelancer from './pages/Publicaciones/PostularseComoFreelancer';
import Pie from './ComponentesGeneral/footer'; 
import Header from './ComponentesGeneral/header';

function App() {
  return (
    <div className="App"> 
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register/cliente" element={<RegisterPageCliente />} />
          <Route path="/register/freelancer" element={<RegisterPageFreelancer />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/publicaciones/crear/:id" element={<CrearPublicacionCliente />} />
          <Route path="/publicaciones/ver/:id" element={<VerPublicacionesFreelancer />} />
          
          {/* NUEVA RUTA: Para el enlace "Ver Proyectos" del footer. 
              Esta ruta no requiere un ID y muestra todas las publicaciones disponibles. */}
          <Route path="/proyectos-disponibles" element={<VerPublicacionesFreelancer />} />

          <Route path="/publicaciones/login" element={<LoginPage1 />} />
          <Route path="/dashboard/cliente/:id" element={<DashboardCliente />} />
          <Route path="/dashboard/freelancer/:id" element={<DashboardFreelancer />} /> 
          <Route path="/postulaciones" element={<PostularseComoFreelancer />} />
        </Routes>
      </main>
      <Pie /> 
    </div>
  );
}

export default App;
