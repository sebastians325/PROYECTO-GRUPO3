import React from 'react';

function PublicacionesCliente({
  publicaciones, 
  postulantesPorPublicacion, 
  cambiarEstadoPublicacion,
  aceptarPostulante,
  loading, 
  error,
}) {
  // --- Manejo de Estados de Carga y Error ---
  // Se gestionan los estados iniciales antes de renderizar la lista principal.
  // Si 'loading' es true, se informa al usuario que los datos están en proceso de carga.
  if (loading) return <p className="loading-message">Cargando publicaciones...</p>;
  if (error) return <p className="error-message">{error}</p>;
  // se presenta un mensaje indicado.
  if (publicaciones.length === 0) return <p className="no-publications-message">No has creado publicaciones todavía.</p>;

  return (
    // Contenedor para la lista de tarjetas de publicación.
    <div className="publicaciones-cliente-list">
      {publicaciones.map(pub => (
        <div key={pub.id} className="publication-card">
          
          {/* -- Cabecera de la Tarjeta de Publicación -- */}
          {/* Muestra información clave como el título y el estado actual. */}
          <div className="publication-card-header">
            <h4 className="publication-title">{pub.titulo}</h4>
            {/* El estado se muestra con una clase dinámica para permitir estilos visuales diferentes. */}
            <span className={`publication-status status-${pub.estado?.toLowerCase().replace('_', '-') || 'desconocido'}`}>
              {pub.estado?.replace('_', ' ') || 'Desconocido'}
            </span>
          </div>

          {/* -- Detalles de la Publicación -- */}
          {/* Muestra la descripción y el monto de pago ofrecido. */}
          <p className="publication-description">{pub.descripcion}</p>
          <p className="publication-pago">Pago: <strong>${pub.pago}</strong></p>

          {/* -- Acciones para la Publicación: Cambiar Estado -- */}
          {/* Esta sección permite al cliente interactuar y cambiar el estado de su publicación. */}
          <div className="publication-actions">
            <label htmlFor={`estado-select-${pub.id}`} className="estado-label">Cambiar estado:</label>
            <select
              id={`estado-select-${pub.id}`}
              value={pub.estado} // El valor del select está controlado por el estado actual de la publicación.
              onChange={e => cambiarEstadoPublicacion(pub.id, e.target.value)}
              className="estado-select"
              // El selector se deshabilita si la publicación está 'cerrado',
              // permitiendo al cliente reabrirla o cambiarla si está 'abierto' o 'en_proceso'.
              disabled={pub.estado === 'cerrado'}
            >
              <option value="abierto">Abierto</option>
              <option value="en_proceso">En Proceso</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </div>

          {/* -- Sección de Postulantes -- */}
          {/* Muestra la lista de freelancers que se han postulado a esta publicación específica. */}
          <div className="postulantes-section">
            <h5 className="postulantes-title">Postulantes: ({postulantesPorPublicacion[pub.id]?.length || 0})</h5>
            {/* Se verifica si hay postulantes para esta publicación. */}
            {(postulantesPorPublicacion[pub.id]?.length || 0) === 0 ? (
              <p className="no-postulantes-message">No hay postulantes aún.</p>
            ) : (
              // Si hay postulantes, se renderiza una lista no ordenada.
              <ul className="postulantes-list">
                {(postulantesPorPublicacion[pub.id] || []).map(post => (
                  // Cada 'post' es un objeto que representa una postulación individual.
                  <li key={post.id} className="postulante-item">
                    <div className="postulante-info">
                      <span>{post.freelancer?.nombre || 'Freelancer'} {post.freelancer?.apellido || ''}</span>
                      <span className={`postulante-status status-${post.estado?.toLowerCase()}`}>
                         - Estado: {post.estado}
                      </span>
                    </div>
                    {/* Botón para "Aceptar Freelancer".
                        Este botón se muestra condicionalmente, solo si el estado de la postulación
                        es 'pendiente' y el estado de la publicación principal es 'abierto'.
                        Esta lógica visual implementa parte de los criterios de aceptación de la HU03.
                    */}
                    {post.estado === 'pendiente' && pub.estado === 'abierto' && (
                      <button
                        onClick={() => aceptarPostulante(post.id, pub.id)} 
                        className="btn btn-aceptar-postulante"
                      >
                        Aceptar
                      </button>
                    )}
                     {/* Badge para indicar si el postulante fue contratado. */}
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
  );
}

export default PublicacionesCliente;