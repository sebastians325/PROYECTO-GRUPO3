import React, { useEffect, useState } from 'react';
import './VerPublicacionesFreelancer.css'; // Importa el archivo CSS

const VerPublicacionesFreelancer = ({ usuarioId }) => {
  // ESTADO: Almacena las publicaciones obtenidas de la API.
  const [publicaciones, setPublicaciones] = useState([]);
  // ESTADO: Indica si los datos se están cargando.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postulacionFeedback, setPostulacionFeedback] = useState({});

  // EFECTO: Se ejecuta una vez cuando el componente se monta para obtener las publicaciones.
  useEffect(() => {
    const fetchPublicaciones = async () => {
      setIsLoading(true); // Inicia el estado de carga
      setError(null); // Resetea cualquier error previo
      try {
        const response = await fetch('http://localhost:3001/publicaciones');
        if (!response.ok) {
          // Si la respuesta no es exitosa (ej. 404, 500), lanza un error.
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json(); // Convierte la respuesta a JSON.
        setPublicaciones(data); // Actualiza el estado con las publicaciones.
      } catch (err) {
        console.error('Error al obtener publicaciones:', err);
        setError(err.message || 'Ocurrió un error desconocido al cargar las publicaciones.');
      } finally {
        setIsLoading(false); // Finaliza el estado de carga.
      }
    };

    fetchPublicaciones(); // Llama a la función para obtener los datos.
  }, []); 

  // FUNCIÓN: Maneja la lógica cuando un freelancer se postula a una publicación.
  const handlePostular = async (publicacionId) => {
    // Actualiza el feedback para esta publicación a "cargando".
    setPostulacionFeedback(prev => ({
      ...prev,
      [publicacionId]: { type: 'loading', message: 'Postulando...' }
    }));

    try {
      const bodyPayload = { usuarioId, publicacionId };


      if (!usuarioId) {
        console.warn("Intentando postular sin 'usuarioId'. La API podría rechazar esto.", bodyPayload);
      }

      const response = await fetch('http://localhost:3001/postulaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
        // Si la respuesta del backend no es exitosa, intenta obtener un mensaje de error del JSON.
        const errorData = await response.json().catch(() => ({ message: `Error del servidor: ${response.status}` }));
        throw new Error(errorData.message || `Error en la postulación: ${response.status}`);
      }
      
      // Si la postulación es exitosa.
      setPostulacionFeedback(prev => ({
        ...prev,
        [publicacionId]: { type: 'success', message: '¡Postulación exitosa!' }
      }));

    } catch (err) {
      // Si ocurre cualquier error durante el proceso de postulación.
      console.error('Error al postularse:', err);
      setPostulacionFeedback(prev => ({
        ...prev,
        [publicacionId]: { type: 'error', message: err.message || 'No se pudo completar la postulación.' }
      }));
    }
  };

  // RENDERIZADO CONDICIONAL: Muestra un mensaje de carga.
  if (isLoading) {
    return (
      <div className="pageContainer">
        <div className="loadingContainer">
          <p>Cargando publicaciones...</p>
          {/* Icono SVG de carga */}
          <svg width="50" height="50" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#AD1457">
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

  // RENDERIZADO CONDICIONAL: Muestra un mensaje de error si falló la carga.
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

  // RENDERIZADO PRINCIPAL: Muestra la lista de publicaciones.
  return (
    <div className="pageContainer">
      <h2 className="headerTitle">Publicaciones Disponibles</h2>

      {publicaciones.length === 0 ? (
        // Mensaje si no hay publicaciones.
        <p className="noPublications">No hay publicaciones disponibles en este momento.</p>
      ) : (
        // Cuadrícula para mostrar las tarjetas de publicaciones.
        <div className="publicationsGrid">
          {publicaciones.map((pub) => {
            const feedback = postulacionFeedback[pub.id];
            const isPostulando = feedback?.type === 'loading';
            const yaPostuladoExitosamente = feedback?.type === 'success';
            
            // Determina las clases CSS para el mensaje de feedback.
            let feedbackClasses = "feedbackMessageBase";
            if (feedback?.type === 'success') {
              feedbackClasses += " feedbackSuccess";
            } else if (feedback?.type === 'error') {
              feedbackClasses += " feedbackError";
            } else if (feedback?.type === 'loading') {
              feedbackClasses += " feedbackLoading";
            }

            return (
              // Cada tarjeta de publicación.
              <div key={pub.id} className="card">
                {/* Sección superior de la tarjeta con la información */}
                <div>
                  <h3 className="cardTitle">{pub.titulo}</h3>
                  <p className="cardDescription">{pub.descripcion}</p>
                  {/* Contenedor para los detalles de la publicación */}
                  <div style={{ marginBottom: '15px' }}> {/* Estilo en línea para un margen específico, puede moverse a CSS si se prefiere */}
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
                      {/* El badge de estado cambia de clase según el estado de la publicación */}
                      <span className={`estadoBadgeBase ${pub.estado === 'abierto' ? 'estadoAbierto' : 'estadoOtro'}`}>
                        {pub.estado}
                      </span>
                    </p>
                  </div>
                </div>

                {}
                <div>
                  {}
                  {feedback && (
                    <div className={feedbackClasses}>
                      {feedback.message}
                    </div>
                  )}
                  {/* Botón para postularse */}
                  <button
                    onClick={() => handlePostular(pub.id)}
                    // Deshabilita el botón si se está postulando o si ya se postuló exitosamente.
                    disabled={isPostulando || yaPostuladoExitosamente}
                    className="button"
                  >
                    {isPostulando ? 'Procesando...' : (yaPostuladoExitosamente ? 'Postulado ✓' : 'Postularme')}
                  </button>
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
