import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './DashboardFreelancer.css';

function DashboardFreelancer() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el ID de la URL, que debería ser el ID del freelancer
  const [freelancer, setFreelancer] = useState(null);
  const [error, setError] = useState(''); // Para manejar y mostrar errores

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token'); // Es buena práctica verificar también el token

    if (!token || !storedUser || storedUser.role !== 'freelancer' || storedUser.id !== parseInt(id)) {
      localStorage.clear();
      setError('Acceso no autorizado o sesión inválida. Por favor, inicia sesión de nuevo.'); // Establecer mensaje de error
      navigate('/publicaciones/login');
    } else {
      setFreelancer(storedUser);
    }
  }, [navigate, id]); // Dependencias del efecto

  const handleLogout = () => {
    localStorage.clear(); // Limpia todo el localStorage
    navigate('/'); // Redirige a la página de inicio
  };

  if (error) {
    return <div className="dashboard-error-container">{error}</div>;
  }

  // Muestra un mensaje de carga mientras se establecen los datos del freelancer
  if (!freelancer) {
    return <div className="dashboard-loading">Cargando tu panel de Freelancer...</div>;
  }

  return (
    // Contenedor principal para la página del dashboard (para estilos de fondo, etc.)
    <div className="dashboard-freelancer-container">
      {/* Cabecera del Dashboard */}
      <header className="dashboard-header">
        <div className="container">
          <h1>Bienvenido, {freelancer.nombre || 'Freelancer'}!</h1>
          <p>Este es tu panel de freelancer. Desde aquí puedes ver las publicaciones disponibles.</p>
        </div>
      </header>

      {/* Contenido Principal del Dashboard */}
      <main className="dashboard-content container">
        {/* Sección para la Acción Principal */}
        <section className="main-action-section">
          <div className="actions-grid">
            {/* Tarjeta para Ver Publicaciones */}
            <Link
              to={`/publicaciones/ver/${freelancer.id}`}
              className="action-card prominent-action-card"
            >
              <h3>Ver Publicaciones Disponibles</h3>
              <p>Explora todas las oportunidades y postúlate a los proyectos que te interesen.</p>
            </Link>

            {/* NUEVA tarjeta para Historial */}
            <Link
              to={`/freelancer/historial/${freelancer.id}`}
              className="action-card"
            >
              <h3>Historial de Trabajos</h3>
              <p>Consulta tus trabajos completados y las valoraciones recibidas.</p>
            </Link>
          </div>
        </section>

        {/* Sección para el Botón de Cerrar Sesión */}
        <div className="dashboard-logout-section">
          <button onClick={handleLogout} className="btn btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </main>
    </div>
  );
}

export default DashboardFreelancer;
