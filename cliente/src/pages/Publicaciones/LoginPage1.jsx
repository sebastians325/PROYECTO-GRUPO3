import React, { useState } from 'react'; // Asegúrate de importar React si no lo haces globalmente
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link para "Olvidaste tu contraseña"
import './LoginPage1.css'; // Crearemos este archivo CSS

// Opcional: Iconos para los campos de entrada
// import { FaEnvelope, FaLock } from 'react-icons/fa';

function LoginPage1() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Iniciar estado de carga
    setError(''); // Limpiar errores previos

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
      setIsLoading(false); // Finalizar estado de carga en caso de error
      setError(err.response?.data?.error || 'Error al iniciar sesión. Verifica tus credenciales.');
      console.error("Error en el login:", err.response || err.message || err);
    }
  };

  return (
    // Contenedor principal de la página de login, para aplicar el fondo gradiente
    <div className="login-page-container">
      {/* Tarjeta o contenedor del formulario */}
      <div className="login-form-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        {error && <p className="login-error-message">{error}</p>}
        
        <form onSubmit={handleLogin} className="login-form">
          {/* Campo de Correo Electrónico */}
          <div className="form-group">
            {/* <FaEnvelope className="input-icon" /> Opcional: Icono */}
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              id="correo"
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
            {/* <FaLock className="input-icon" /> Opcional: Icono */}
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
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

          {/* Enlaces adicionales */}
          <div className="login-links">
            <Link to="/recuperar-password">¿Olvidaste tu contraseña?</Link>
            <span>|</span>
            <Link to="/register/cliente">Crear cuenta nueva</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage1;