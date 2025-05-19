//Publicaciones/LoginPage1.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage1() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/usuarios/login', {
        correo,
        password,
      });

      const { token, user } = res.data;

      // Guardar sesión
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir según el rol
      if (user.role === 'cliente') {
        navigate(`/dashboard/cliente/${user.id}`);
      } else if (user.role === 'freelancer') {
        navigate(`/dashboard/freelancer/${user.id}`);
      } else {
        setError('Rol no reconocido.');
      }

    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage1;

