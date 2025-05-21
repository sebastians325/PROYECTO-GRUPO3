import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css'; 

function Header() {
  const location = useLocation(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container px-4">
        {/* Marca/Logo de la empresa */}
        <Link className="navbar-brand-custom" to="/">
          LaboraPe 
        </Link>
        
        <button
          className="navbar-toggler-custom"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavContentHeader" // ID único para este navbar
          aria-controls="navbarNavContentHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon-custom" />
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNavContentHeader">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> 
            
            <li className="nav-item-custom">
              <Link 
                className={`nav-link-custom ${location.pathname === '/publicaciones/login' ? 'active' : ''}`} 
                to="/publicaciones/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
