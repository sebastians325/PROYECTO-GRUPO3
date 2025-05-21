import React, { useEffect, useState } from 'react';
import './VerPublicacionesFreelancer.css'; 
import { Link } from 'react-router-dom'; 

const VerPublicacionesFreelancer = () => {
const VerPublicacionesFreelancer = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postulacionFeedback, setPostulacionFeedback] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      setIsLoading(true); 
      setError(null); 
      try {
        const response = await fetch('http://localhost:3001/publicaciones');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json(); 
        setPublicaciones(data); 
      } catch (err) {
        console.error('Error al obtener publicaciones:', err);
        setError(err.message || 'Ocurrió un error desconocido al cargar las publicaciones.');
      } finally {
        setIsLoading(false); 
      }
    };

    fetchPublicaciones(); 

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
      const bodyPayload = { usuarioId: currentUser.id, publicacionId };

      const response = await fetch('http://localhost:3001/postulaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Error del servidor: ${response.status}` }));
        throw new Error(errorData.message || `Error en la postulación: ${response.status}`);
      }
      
      setPostulacionFeedback(prev => ({
        ...prev,
        [publicacionId]: { type: 'success', message: '¡Postulación exitosa!' }
      }));

    } catch (err) {
      console.error('Error al postularse:', err);
      setPostulacionFeedback(prev => ({
        ...prev,
        [publicacionId]: { type: 'error', message: err.message || 'No se pudo completar la postulación.' }
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="pageContainer"> 
        <div className="loadingContainer">
          <p>Cargando publicaciones...</p>
          <svg width="50" height="50" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"> 
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
                </path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pageContainer">
        <div className="errorContainer">
          <p><strong>Error al cargar:</strong> {error}</p>
          <p>Por favor, intenta recargar la página o contacta a soporte.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pageContainer">
      <h2 className="headerTitle">Publicaciones Disponibles</h2>

      {publicaciones.length === 0 ? (
        <p className="noPublications">No hay publicaciones disponibles en este momento.</p>
      ) : (
        <div className="publicationsGrid">
          {publicaciones.map((pub) => {
            const feedback = postulacionFeedback[pub.id];
            const isPostulando = feedback?.type === 'loading';
            const yaPostuladoExitosamente = feedback?.type === 'success';
            const puedePostular = currentUser && currentUser.role === 'freelancer';

            let feedbackClasses = "feedbackMessageBase";
            if (feedback?.type === 'success') {
              feedbackClasses += " feedbackSuccess";
            } else if (feedback?.type === 'error') {
              feedbackClasses += " feedbackError";
            } else if (feedback?.type === 'loading') {
              feedbackClasses += " feedbackLoading";
            }

            return (
              <div key={pub.id} className="card">
                <div>
                  <h3 className="cardTitle">{pub.titulo}</h3>
                  <p className="cardDescription">{pub.descripcion}</p>
                  <div style={{ marginBottom: '15px' }}> 
                    <p className="cardInfoItem">
                      <span className="cardInfoLabel">Publicado por: </span>
                      {pub.cliente?.nombre || 'N/A'} {pub.cliente?.apellido || ''}
                    </p>
                    <p className="cardInfoItem">
                      <span className="cardInfoLabel">Pago: </span>
                      ${pub.pago}
                    </p>
                    <p className="cardInfoItem">
                      <span className="cardInfoLabel">Estado: </span>
                      <span className={`estadoBadgeBase ${pub.estado === 'abierto' ? 'estadoAbierto' : 'estadoOtro'}`}>
                        {pub.estado}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="card-actions-footer"> 
                  {feedback && (
                    <div className={feedbackClasses}>
                      {feedback.message}
                    </div>
                  )}

                  {puedePostular ? (
                    <button
                      onClick={() => handlePostular(pub.id)}
                      disabled={isPostulando || yaPostuladoExitosamente}
                      className="button" 
                    >
                      {isPostulando ? 'Procesando...' : (yaPostuladoExitosamente ? 'Postulado ✓' : 'Postularme')}
                    </button>
                  ) : (
                    <Link to="/publicaciones/login" className="button button-login-prompt">
                      Inicia sesión como Freelancer para postularte
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VerPublicacionesFreelancer;
