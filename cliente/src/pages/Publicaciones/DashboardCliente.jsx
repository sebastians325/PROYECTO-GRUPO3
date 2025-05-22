import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
// Se importa el archivo CSS específico para este dashboard.
// Los estilos definidos aquí son responsables de la apariencia visual de este componente.
import './DashboardCliente.css'; 

// --- Componente DashboardCliente ---
// Este componente actúa como el panel de control principal para los usuarios de tipo "Cliente".
// Sus responsabilidades incluyen la validación de la sesión del cliente, la obtención
// y muestra de las publicaciones creadas por él, la visualización de los freelancers
// que se han postulado a cada publicación, y la provisión de funcionalidades para
// que el cliente gestione estos elementos (cambiar estado de publicación, aceptar postulantes).
// Dada su naturaleza de manejar datos, lógica de negocio y presentación, se asemeja
// a un "Container Component" o "Smart Component" en arquitecturas React.
function DashboardCliente() {
  // --- Hooks de React y React Router DOM ---
  // 'useNavigate' permite la navegación programática entre las rutas de la aplicación.
  const navigate = useNavigate();
  // 'useParams' extrae parámetros dinámicos de la URL, como el 'id' del cliente.
  const { id } = useParams(); 

  // --- Declaración de Estados del Componente ---
  // Cada 'useState' inicializa una pieza del estado local del componente.
  // 'user': Almacena la información del cliente autenticado.
  const [user, setUser] = useState(null); 
  // 'publicaciones': Un array para las publicaciones del cliente.
  const [publicaciones, setPublicaciones] = useState([]); 
  // 'postulantesPorPublicacion': Un objeto para mapear publicaciones a sus postulantes.
  const [postulantesPorPublicacion, setPostulantesPorPublicacion] = useState({}); 
  // 'loading': Un booleano para controlar la visualización de indicadores de carga.
  const [loading, setLoading] = useState(true); 
  // 'error': Una cadena para almacenar mensajes de error y mostrarlos al usuario.
  const [error, setError] = useState(''); 

  // --- Hook de Efecto: Autenticación y Carga Inicial del Usuario ---
  // Este 'useEffect' se ejecuta después del primer renderizado y cada vez que 'id' o 'navigate' cambian.
  // Su propósito principal aquí es validar la sesión del usuario al cargar el dashboard.
  useEffect(() => {
    // Se recuperan los datos del usuario y el token de autenticación desde localStorage.
    // Este método de gestión de sesión es común pero podría complementarse con validación de token en el backend.
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token'); 
    
    // Se realiza una validación para asegurar que el usuario esté autenticado,
    // sea del rol 'cliente', y que el ID en la URL coincida con el ID del usuario almacenado.
    if (!token || !storedUser || storedUser.role !== 'cliente' || storedUser.id !== parseInt(id)) {
      localStorage.clear(); // Si la validación falla, se limpia localStorage por seguridad.
      setError('Acceso no autorizado o sesión inválida. Por favor, inicia sesión de nuevo.'); 
      navigate('/publicaciones/login'); // Se redirige al usuario a la página de login.
      return; // Se detiene la ejecución del efecto.
    }
    setUser(storedUser); // Si todo es correcto, se establece la información del usuario en el estado.
  }, [id, navigate]); // Las dependencias del efecto.

  // --- Hook de Efecto: Obtener Publicaciones y Postulantes del Cliente ---
  // Este 'useEffect' se activa cuando la información del 'user' está disponible o cambia.
  // Se encarga de realizar las llamadas a la API para obtener los datos necesarios para el dashboard.
  useEffect(() => {
    // Si no hay información del usuario, no se procede con la obtención de datos.
    if (!user) return;

    async function fetchPublicacionesYPostulantes() {
      setLoading(true); // Se activa el indicador de carga.
      setError(''); // Se limpian errores previos.
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`; // Se añade el token de autorización a los encabezados.
        }

        // Se obtienen las publicaciones del cliente, filtrando por 'usuarioId'.
        const resPublicaciones = await fetch(`http://localhost:3001/publicaciones?usuarioId=${user.id}`, { headers }); 
        if (!resPublicaciones.ok) { // Manejo de respuestas no exitosas de la API.
            const errData = await resPublicaciones.json().catch(() => ({message: 'Error al obtener tus publicaciones'}));
            throw new Error(errData.message);
        }
        const dataPublicaciones = await resPublicaciones.json();
        setPublicaciones(dataPublicaciones); // Se guardan las publicaciones en el estado.

        // Para cada publicación, se obtienen sus postulantes.
        const postulantesData = {};
        for (const pub of dataPublicaciones) { 
          try {
            const resPostulantes = await fetch(`http://localhost:3001/publicaciones/${pub.id}/candidatos`, { headers });
            if (resPostulantes.ok) {
              const postulantes = await resPostulantes.json();
              postulantesData[pub.id] = postulantes; 
            } else {
              console.warn(`No se pudieron obtener postulantes para la publicación ${pub.id}. Estado: ${resPostulantes.status}`);
              postulantesData[pub.id] = []; 
            }
          } catch (postulantesError) {
            console.error(`Error obteniendo postulantes para pub ${pub.id}:`, postulantesError);
            postulantesData[pub.id] = []; 
          }
        }
        setPostulantesPorPublicacion(postulantesData); // Se guardan los postulantes en el estado.

      } catch (err) { // Captura de errores durante el proceso de obtención de datos.
        console.error("Error en fetchPublicacionesYPostulantes:", err);
        setError(err.message || "Ocurrió un error al cargar los datos de tus publicaciones."); 
      } finally {
        setLoading(false); // Se desactiva el indicador de carga, independientemente del resultado.
      }
    }
    fetchPublicacionesYPostulantes(); // Se llama a la función de obtención de datos.
  }, [user]); // El efecto depende del estado 'user'.

  // --- Funciones Manejadoras de Acciones del Cliente ---
  // Estas funciones encapsulan la lógica para interactuar con el backend y actualizar el estado local.

  // Función para cambiar el estado de una publicación.
  const cambiarEstadoPublicacion = async (publicacionId, nuevoEstado) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Sesión no válida. Por favor, inicia sesión de nuevo."); 
        return;
      }

      const res = await fetch(`http://localhost:3001/publicaciones/${publicacionId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Error al actualizar estado de la publicación' }));
        throw new Error(errorData.message);
      }

      // Optimistic update: Actualiza el estado local inmediatamente para una mejor UX.
      setPublicaciones(prevPublicaciones =>
        prevPublicaciones.map(pub => 
          pub.id === publicacionId ? { ...pub, estado: nuevoEstado } : pub
        )
      );
    } catch (err) {
      console.error("Error en cambiarEstadoPublicacion:", err);
      setError(`Error al cambiar estado: ${err.message}`); 
    }
  };

  // Función para aceptar un postulante.
  const aceptarPostulante = async (postulacionId, publicacionId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Sesión no válida. Por favor, inicia sesión de nuevo."); 
        return;
      }

      const publicacionActual = publicaciones.find(p => p.id === publicacionId);
      if (!publicacionActual) {
        setError("Error interno: No se encontró la publicación asociada.");
        throw new Error("No se encontró la publicación para aceptar al postulante.");
      }

      const res = await fetch(`http://localhost:3001/postulaciones/${postulacionId}/aceptar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        }
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Error al aceptar el postulante' }));
        throw new Error(errorData.message);
      }

      // Actualización optimista de los estados locales.
      const updatedPostulantes = (postulantesPorPublicacion[publicacionId] || []).map(p => 
        p.id === postulacionId 
          ? { ...p, estado: 'aceptado' } 
          : { ...p, estado: (p.estado === 'pendiente' && publicacionActual.estado === 'abierto') ? 'rechazado' : p.estado } 
      );
      setPostulantesPorPublicacion(prev => ({
        ...prev,
        [publicacionId]: updatedPostulantes,
      }));

      setPublicaciones(prevPublicaciones =>
        prevPublicaciones.map(pub =>
          pub.id === publicacionId ? { ...pub, estado: 'en_proceso' } : pub
        )
      );
      alert('Postulante aceptado exitosamente. La publicación ahora está "en proceso".');
    } catch (err) {
      console.error("Error en aceptarPostulante:", err);
      setError(`Error al aceptar postulante: ${err.message}`); 
    }
  };

  // Función para cerrar la sesión.
  const handleLogout = () => { 
    localStorage.clear(); 
    navigate('/'); 
  };

  // --- Renderizado Condicional para Estados de Carga y Error Globales ---
  if (error && !loading && publicaciones.length === 0) { 
    return <div className="dashboard-error-container">{error}</div>;
  }
  if (!user) { // Si el usuario aún no se ha cargado/validado.
    return <div className="dashboard-loading">Cargando panel de Cliente...</div>;
  }

  // --- Renderizado Principal del Dashboard del Cliente ---
  return (
    <div className="dashboard-cliente-container">
      {/* -- Cabecera del Dashboard -- */}
      <header className="dashboard-header">
        <div className="container">
          <h1>Bienvenido, {user.nombre || 'Cliente'}</h1> 
          <p>Gestiona tus publicaciones y selecciona a los mejores freelancers para tus proyectos.</p>
        </div>
      </header>

      {/* -- Contenido Principal del Dashboard -- */}
      <main className="dashboard-content container">
        {/* -- Barra de Acciones Principales -- */}
        <div className="dashboard-actions-bar">
          <Link to={`/publicaciones/crear/${user.id}`} className="btn btn-crear-publicacion">
            Crear Nueva Publicación
          </Link>
          <button onClick={handleLogout} className="btn btn-logout-dashboard">
            Cerrar Sesión
          </button>
        </div>

        {/* -- Sección de "Mis Publicaciones" -- */}
        {/* Esta sección es donde se renderizaría el componente 'PublicacionesCliente' si se extrajera. */}
        <section className="mis-publicaciones-section">
          <h2 className="section-title">Mis Publicaciones</h2>
          
          {loading && <p className="loading-message">Cargando tus publicaciones...</p>}
          {!loading && error && <p className="error-message">{error}</p>} 
          {!loading && publicaciones.length === 0 && !error && (
            <p className="no-publications-message">Aún no has creado ninguna publicación. ¡Crea una ahora!</p>
          )}

          {!loading && publicaciones.length > 0 && (
            // Contenedor para la cuadrícula de publicaciones.
            <div className="publicaciones-grid">
              {publicaciones.map(pub => ( 
                // -- Tarjeta Individual de Publicación --
                // Cada publicación se muestra en su propia tarjeta.
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

                  {/* Sección de Postulantes para esta publicación */}
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
