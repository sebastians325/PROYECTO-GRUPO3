// src/pages/clientes/DashboardMensajesCliente.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClienteService } from '../../services/ClienteService';

function DashboardMensajesCliente() {
  const { id } = useParams(); // userId del cliente desde la URL
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarPublicacionesCliente() {
      try {
        setLoading(true);
        const data = await ClienteService.fetchPublicaciones(id);
        setPublicaciones(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar tus publicaciones.');
      } finally {
        setLoading(false);
      }
    }
    cargarPublicacionesCliente();
  }, [id]);

  const publicacionesFiltradas = publicaciones.filter(pub =>
    pub.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleCrearMensaje = (idPublicacion) => {
    navigate(`/mensajes/crear/${idPublicacion}`);
  };

  const handleVerMensaje = (idPublicacion) => {
    navigate(`/mensajes/ver/${idPublicacion}`);
  };

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Mis Publicaciones - Mensajes</h1>

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
        {publicacionesFiltradas.length === 0 ? (
          <li>No tienes publicaciones coincidentes.</li>
        ) : (
          publicacionesFiltradas.map(pub => (
            <li
              key={pub.id}
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
              <span>{pub.titulo}</span>
              <div>
                <button
                  onClick={() => handleCrearMensaje(pub.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginRight: '8px',
                  }}
                >
                  Crear mensaje
                </button>
                <button
                  onClick={() => handleVerMensaje(pub.id)}
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
                  Ver mensaje
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default DashboardMensajesCliente;
