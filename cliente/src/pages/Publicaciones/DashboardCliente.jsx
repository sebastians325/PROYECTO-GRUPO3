// ✅ cliente/src/pages/Publicaciones/DashboardCliente.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ClienteService } from '../../services/ClienteService';
import './DashboardCliente.css';

function DashboardCliente() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [postulantesPorPublicacion, setPostulantesPorPublicacion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !storedUser || storedUser.role !== 'cliente' || storedUser.id !== parseInt(id)) {
      localStorage.clear();
      setError('Acceso no autorizado o sesión inválida. Por favor, inicia sesión de nuevo.');
      navigate('/publicaciones/login');
      return;
    }
    setUser(storedUser);
  }, [id, navigate]);

  useEffect(() => {
    if (!user) return;
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const publicacionesData = await ClienteService.fetchPublicaciones(user.id);
        setPublicaciones(publicacionesData);

        const postulantesData = {};
        for (const pub of publicacionesData) {
          try {
            const postulantes = await ClienteService.fetchPostulantes(pub.id);
            postulantesData[pub.id] = postulantes;
          } catch (err) {
            console.warn(err.message);
            postulantesData[pub.id] = [];
          }
        }
        setPostulantesPorPublicacion(postulantesData);
      } catch (err) {
        setError(err.message || 'Error al cargar datos.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  const cambiarEstadoPublicacion = async (publicacionId, nuevoEstado) => {
    try {
      await ClienteService.cambiarEstadoPublicacion(publicacionId, nuevoEstado);
      setPublicaciones(prev => prev.map(pub =>
        pub.id === publicacionId ? { ...pub, estado: nuevoEstado } : pub
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const aceptarPostulante = async (postulacionId, publicacionId) => {
    try {
      const publicacion = publicaciones.find(p => p.id === publicacionId);
      if (!publicacion) throw new Error('Publicación no encontrada.');

      await ClienteService.aceptarPostulante(postulacionId);

      const updatedPostulantes = (postulantesPorPublicacion[publicacionId] || []).map(p =>
        p.id === postulacionId
          ? { ...p, estado: 'aceptado' }
          : { ...p, estado: (p.estado === 'pendiente' && publicacion.estado === 'abierto') ? 'rechazado' : p.estado }
      );

      setPostulantesPorPublicacion(prev => ({
        ...prev,
        [publicacionId]: updatedPostulantes,
      }));

      setPublicaciones(prev => prev.map(pub =>
        pub.id === publicacionId ? { ...pub, estado: 'en_proceso' } : pub
      ));

      alert('Postulante aceptado exitosamente.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const verCV = async (cvUrl) => {
    try {
      const filename = cvUrl.split('/').pop();
      const res = await fetch(`http://localhost:3001/postulaciones/ver-cv/${filename}`);
      const data = await res.json();
      if (data.url) window.open(data.url, '_blank');
      else alert("No se pudo abrir el CV");
    } catch (err) {
      alert("Error al intentar acceder al CV");
      console.error(err);
    }
  };

  if (error && !loading && publicaciones.length === 0) {
    return <div className="dashboard-error-container">{error}</div>;
  }
  if (!user) {
    return <div className="dashboard-loading">Cargando panel de Cliente...</div>;
  }

  return (
    <div className="dashboard-cliente-container">
      <header className="dashboard-header">
        <div className="container">
          <h1>Bienvenido, {user.nombre || 'Cliente'}</h1>
          <p>Gestiona tus publicaciones y selecciona a los mejores freelancers para tus proyectos.</p>
        </div>
      </header>

      <main className="dashboard-content container">
        <div className="dashboard-actions-bar">
          <Link to={`/publicaciones/crear/${user.id}`} className="btn btn-crear-publicacion">
            Crear Nueva Publicación
          </Link>
          <button onClick={handleLogout} className="btn btn-logout-dashboard">
            Cerrar Sesión
          </button>
        </div>

        <section className="mis-publicaciones-section">
          <h2 className="section-title">Mis Publicaciones</h2>
          {loading && <p className="loading-message">Cargando tus publicaciones...</p>}
          {!loading && error && <p className="error-message">{error}</p>}
          {!loading && publicaciones.length === 0 && !error && (
            <p className="no-publications-message">Aún no has creado ninguna publicación. ¡Crea una ahora!</p>
          )}

          {!loading && publicaciones.length > 0 && (
            <div className="publicaciones-grid">
              {publicaciones.map(pub => (
                <div key={pub.id} className="publication-card">
                  <div className="publication-card-header">
                    <h3 className="publication-title">{pub.titulo}</h3>
                    <span className={`publication-status status-${pub.estado?.toLowerCase().replace('_', '-') || 'desconocido'}`}>
                      {pub.estado?.replace('_', ' ') || 'Desconocido'}
                    </span>
                  </div>
                  <p className="publication-description">{pub.descripcion}</p>
                  <p className="publication-pago">Presupuesto: <strong>${pub.pago}</strong></p>

                  <div className="publication-actions">
                    <label htmlFor={`estado-select-${pub.id}`} className="estado-label">Cambiar estado:</label>
                    <select
                      id={`estado-select-${pub.id}`}
                      value={pub.estado}
                      onChange={e => cambiarEstadoPublicacion(pub.id, e.target.value)}
                      className="estado-select"
                      disabled={pub.estado === 'cerrado'}
                    >
                      <option value="abierto">Abierto</option>
                      <option value="en_proceso">En Proceso</option>
                      <option value="cerrado">Cerrado</option>
                    </select>
                  </div>

                  <div className="postulantes-section">
                    <h4 className="postulantes-title">Postulantes ({postulantesPorPublicacion[pub.id]?.length || 0}):</h4>
                    {(postulantesPorPublicacion[pub.id]?.length || 0) === 0 ? (
                      <p className="no-postulantes-message">Aún no hay postulantes para este proyecto.</p>
                    ) : (
                      <ul className="postulantes-list">
                        {(postulantesPorPublicacion[pub.id] || []).map(post => (
                          <li key={post.id} className="postulante-item">
                            <div className="postulante-info">
                              <span>{post.freelancer?.nombre || 'Freelancer'} {post.freelancer?.apellido || ''}</span>
                              <span className={`postulante-status status-${post.estado?.toLowerCase()}`}>
                                (Estado: {post.estado})
                              </span>
                              {post.cvUrl && (
                                <button onClick={() => verCV(post.cvUrl)} className="btn btn-ver-cv">
                                  Ver CV
                                </button>
                              )}
                            </div>
                            {post.estado === 'pendiente' && pub.estado === 'abierto' && (
                              <button
                                onClick={() => aceptarPostulante(post.id, pub.id)}
                                className="btn btn-aceptar-postulante"
                              >
                                Aceptar Freelancer
                              </button>
                            )}
                             {post.estado === 'aceptado' && pub.estado === 'en_proceso' && (
                                <span className="postulante-aceptado-badge">¡Contratado!</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardCliente;
