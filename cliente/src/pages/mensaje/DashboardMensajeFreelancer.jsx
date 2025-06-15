// src/pages/freelancers/DashboardMensajesFreelancer.jsx
// src/pages/freelancer/DashboardMensajesFreelancer.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import mensajeService from '../../services/mensajeService';

function DashboardMensajesFreelancer() {
  const { id } = useParams(); // userId del freelancer desde la URL
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarPostulaciones() {
      try {
        setLoading(true);
        const data = await mensajeService.obtenerPostulacionesAceptadas(id);
        setPostulaciones(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar tus postulaciones aceptadas.');
      } finally {
        setLoading(false);
      }
    }
    cargarPostulaciones();
  }, [id]);

  const postulacionesFiltradas = postulaciones.filter(post =>
    post.publicacion.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleVerMensaje = (publicacionId) => {
    navigate(`/mensajes/verF/${publicacionId}`);
  };

  if (loading) return <p>Cargando postulaciones aceptadas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Mis Postulaciones Aceptadas - Mensajes</h1>

      <input
        type="text"
        placeholder="Buscar publicación..."
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          marginBottom: '16px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {postulacionesFiltradas.length === 0 ? (
          <li>No tienes postulaciones aceptadas coincidentes.</li>
        ) : (
          postulacionesFiltradas.map(post => (
            <li
              key={post.id}
              style={{
                padding: '10px',
                marginBottom: '8px',
                backgroundColor: '#f9f9f9',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #ddd',
              }}
            >
              <span>{post.publicacion.titulo}</span>
              <button
                onClick={() => handleVerMensaje(post.publicacion.id)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Ver mensajes
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default DashboardMensajesFreelancer;
