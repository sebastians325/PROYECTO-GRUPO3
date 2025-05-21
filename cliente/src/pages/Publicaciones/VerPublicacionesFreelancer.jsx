import React, { useEffect, useState } from 'react';
import './VerPublicacionesFreelancer.css';
import { Link } from 'react-router-dom';
import { PublicacionesService } from '../../services/PublicacionesService';

const VerPublicacionesFreelancer = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postulacionFeedback, setPostulacionFeedback] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await PublicacionesService.obtenerPublicacionesDisponibles();
        setPublicaciones(data);
      } catch (err) {
        setError(err.message || 'Ocurrió un error desconocido al cargar las publicaciones.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handlePostular = async (publicacionId) => {
    if (!currentUser || currentUser.role !== 'freelancer') {
      setPostulacionFeedback(prev => ({
        ...prev,
        [publicacionId]: { type: 'error', message: 'Debes iniciar sesión como freelancer para postularte.' }
      }));
      return;
    }

    setPostulacionFeedback(prev => ({
      ...prev,
      [publicacionId]: { type: 'loading', message: 'Postulando...' }
    }));

    try {
      await PublicacionesService.postularse(publicacionId, currentUser.id);
      setPostulacionFeedback(prev => ({
        ...prev,
        [publicacionId]: { type: 'success', message: '¡Postulación exitosa!' }
      }));
    } catch (err) {
      setPostulacionFeedback(prev => ({
        ...prev,
        [publicacionId]: { type: 'error', message: err.message || 'Error al postularse.' }
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="pageContainer">
        <div className="loadingContainer">
          <p>Cargando publicaciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pageContainer">
        <div className="errorContainer">
          <p><strong>Error:</strong> {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pageContainer">
      <h2 className="headerTitle">Publicaciones Disponibles</h2>

      {publicaciones.length === 0 ? (
        <p className="noPublications">No hay publicaciones disponibles.</p>
      ) : (
        <div className="publicationsGrid">
          {publicaciones.map((pub) => {
            const feedback = postulacionFeedback[pub.id];
            const isPostulando = feedback?.type === 'loading';
            const yaPostulado = feedback?.type === 'success';

            return (
              <div key={pub.id} className="card">
                <div>
                  <h3 className="cardTitle">{pub.titulo}</h3>
                  <p className="cardDescription">{pub.descripcion}</p>
                  <p className="cardInfoItem"><strong>Cliente:</strong> {pub.cliente?.nombre} {pub.cliente?.apellido}</p>
                  <p className="cardInfoItem"><strong>Pago:</strong> ${pub.pago}</p>
                  <p className="cardInfoItem"><strong>Estado:</strong> <span className={`estadoBadgeBase ${pub.estado === 'abierto' ? 'estadoAbierto' : 'estadoOtro'}`}>{pub.estado}</span></p>
                </div>

                {feedback && (
                  <div className={`feedbackMessageBase ${feedback.type === 'success' ? 'feedbackSuccess' : feedback.type === 'error' ? 'feedbackError' : 'feedbackLoading'}`}>
                    {feedback.message}
                  </div>
                )}

                {currentUser ? (
                  <button
                    onClick={() => handlePostular(pub.id)}
                    className="button"
                    disabled={isPostulando || yaPostulado}
                  >
                    {isPostulando ? 'Procesando...' : yaPostulado ? 'Postulado ✓' : 'Postularme'}
                  </button>
                ) : (
                  <Link to="/publicaciones/login" className="button button-login-prompt">
                    Inicia sesión como Freelancer
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VerPublicacionesFreelancer;