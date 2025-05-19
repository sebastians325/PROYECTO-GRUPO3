import React from "react";
import './footer.css'; 
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() { 
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      
      <div className="footer-content"> 
        
        {/* Columna 1: Información de la Marca y Redes Sociales */}
        <div className="footer-section footer-brand-info">
          <h3 className="brand-name">LaboraPe</h3> 
          <p className="brand-tagline">Conectando talento con oportunidades.</p>
          
          {/* Iconos de Redes Sociales */}
          <div className="footer-social-media">
            {/* Reemplaza "#" o las URLs de ejemplo con las URLs reales de tus perfiles */}
            <a href="https://facebook.com/tuLaboraPe" aria-label="Facebook de LaboraPe" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/tuLaboraPe" aria-label="Twitter de LaboraPe" target="_blank" rel="noopener noreferrer" title="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/tuLaboraPe" aria-label="Instagram de LaboraPe" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com/company/tuLaboraPe" aria-label="LinkedIn de LaboraPe" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Columna 2: Cuenta */}
        <div className="footer-section">
          <h4>Cuenta</h4> 
          <ul>
            <li><Link to="/publicaciones/login">Login</Link></li>
            <li><Link to="/register/cliente">Registro Cliente</Link></li>
            <li><Link to="/register/freelancer">Registro Freelancer</Link></li>
          </ul>
        </div>

        {/* Columna 3: Explorar */}
        <div className="footer-section">
          <h4>Explorar</h4>
          <ul>
            <li><Link to="/proyectos-disponibles">Ver Proyectos</Link></li>
            <li><Link to="/como-funciona">¿Cómo Funciona?</Link></li>
            <li><Link to="/blog">Nuestro Blog</Link></li> 
          </ul>
        </div>

        {/* Columna 4: Ayuda */}
        <div className="footer-section">
          <h4>Ayuda</h4>
          <ul>
            <li><Link to="/acerca-de">Acerca de Nosotros</Link></li>
            <li><Link to="/politica-de-uso">Política de Uso</Link></li> 
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contacto">Contáctanos</Link></li>
          </ul>
        </div>
      </div> {/* Fin de .footer-content */}

      {/* Sección inferior del footer para copyright y enlaces legales */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} LaboraPe. Todos los derechos reservados.</p>
        <p>
          <Link to="/politica-privacidad">Privacy</Link> - <Link to="/terminos-condiciones">Terms</Link>
        </p>
      </div> {/* Fin de .footer-bottom */}

    </footer> /* Fin de .footer-container */
  );
}

export default Footer;
