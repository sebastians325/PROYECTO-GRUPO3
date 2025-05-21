import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage1.css'; 


function LoginPage1() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Manejador para el envío del formulario de login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    setError(''); 

    try {
      const res = await axios.post('http://localhost:3001/usuarios/login', {
        correo,
        password,
      });

      const { token, user } = res.data;

      // Guardar sesión
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoading(false); // Finalizar estado de carga

      // Redirigir según el rol
      if (user.role === 'cliente') {
        navigate(`/dashboard/cliente/${user.id}`);
      } else if (user.role === 'freelancer') {
        navigate(`/dashboard/freelancer/${user.id}`);
      } else {
        setError('Rol no reconocido. Por favor, contacta a soporte.');
      }

    } catch (err) {
      setIsLoading(false); 
      setError(err.response?.data?.error || 'Error al iniciar sesión. Verifica tus credenciales.');
      console.error("Error en el login:", err.response || err.message || err);
    }
  };

  return (
    // Contenedor principal de la página de login
    <div className="login-page-container">
      {/* Tarjeta o contenedor del formulario */}
      <div className="login-form-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        {/* Muestra el mensaje de error si existe */}
        {error && <p className="login-error-message">{error}</p>}
        
        <form onSubmit={handleLogin} className="login-form">
          {/* Campo de Correo Electrónico */}
          <div className="form-group">
            <label htmlFor="login-correo">Correo Electrónico</label>
            <input
              id="login-correo" 
              type="email"
              placeholder="tu@email.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              aria-label="Correo Electrónico"
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="form-group">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password" 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Contraseña"
            />
          </div>

          {/* Botón de Iniciar Sesión */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>

          <div className="login-links">
            <Link to="/recuperar-password" className="link-button">¿Olvidaste tu contraseña?</Link>
            <span>|</span>
            <Link to="/register/cliente" className="link-button">Crear cuenta nueva</Link> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage1;
