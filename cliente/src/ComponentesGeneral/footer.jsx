import React from "react";
// Asegúrate que el nombre del archivo CSS coincida exactamente.
// Si tu archivo es 'footer.css' (minúsculas), la importación debe ser así:
import './footer.css'; 
import { Link } from 'react-router-dom';
// Opcional: Para iconos de redes sociales
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() { 
  const currentYear = new Date().getFullYear();

  return (
    // 1. Este es el contenedor principal del footer. TODO el contenido del footer,
    //    incluyendo el copyright, DEBE estar DENTRO de esta etiqueta <footer>.
    <footer className="footer-container">
      
      {/* 2. Este div agrupa las columnas principales de enlaces e información. */}
      <div className="footer-content">
        
        {/* Columna 1: Información de la Marca */}
        <div className="footer-section footer-brand-info">
          <h3 className="brand-name">LaboraPe</h3> 
          <p style={{ fontSize: '0.9rem', color: '#A1887F', marginTop: '10px' }}> 
            © {currentYear} LaboraPe
          </p>
          <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>
            <Link to="/politica-privacidad">Privacy</Link> - <Link to="/terminos-condiciones">Terms</Link>
          </p>
          <div className="footer-social-media">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
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
            <li><Link to="/carrito">Carrito</Link></li>
          </ul>
        </div>

        {/* Columna 3: Productos/LaboraPe */}
        <div className="footer-section">
          <h4>Productos</h4> 
          <ul>
            <li><Link to="/productos/mas-vendidos">Más vendidos</Link></li>
            <li><Link to="/productos/nuevos">Nuevos</Link></li>
            <li><Link to="/productos/ofertas">Ofertas</Link></li>
          </ul>
        </div>

        {/* Columna 4: Ayuda */}
        <div className="footer-section">
          <h4>Ayuda</h4>
          <ul>
            <li><Link to="/acerca-de">Acerca de Nosotros</Link></li>
            <li><Link to="/politica-envio">Política de Envío</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
      </div> {/* Fin de .footer-content */}

      {/* 3. Esta es la sección del copyright. DEBE estar DENTRO de <footer className="footer-container">
             y DESPUÉS de <div className="footer-content">. */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} LaboraPe. Todos los derechos reservados.</p>
        {/* Si quieres repetir los enlaces de privacidad y términos aquí también, puedes hacerlo */}
        {/* <p>
          <Link to="/politica-privacidad">Privacy</Link> | <Link to="/terminos-condiciones">Terms</Link>
        </p> */}
      </div> {/* Fin de .footer-bottom */}

    </footer> /* Fin de .footer-container */
  );
}

export default Footer; 
