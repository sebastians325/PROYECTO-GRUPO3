import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import mensajeService from '../../services/mensajeService';

const usuarioActualId = 1; // Simula usuario logueado (cliente o freelancer)

const VerMensaje = () => {
  const { publicacionId } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [error, setError] = useState('');

  const cargarMensajes = async () => {
    try {
      const datos = await mensajeService.obtenerMensajesPorPublicacion(publicacionId, usuarioActualId);
      setMensajes(datos);
    } catch (err) {
      setError('Error al cargar mensajes');
    }
  };

  useEffect(() => {
    cargarMensajes();
  }, [publicacionId]);

  useEffect(() => {
    const div = document.getElementById('contenedor-mensajes');
    if (div) div.scrollTop = div.scrollHeight;
  }, [mensajes]);

  const obtenerDestinatarioId = () => {
    const ultimo = mensajes[mensajes.length - 1];
    if (!ultimo) return null;
    return usuarioActualId === ultimo.remitenteId
      ? ultimo.destinatarioId
      : ultimo.remitenteId;
  };

  const handleEnviar = async () => {
    const destinatarioId = obtenerDestinatarioId();

    if (!destinatarioId) {
      setError('No se puede identificar destinatario.');
      return;
    }

    const data = {
      publicacionId,
      remitenteId: usuarioActualId,
      destinatarioId,
      contenido: nuevoMensaje
    };

    try {
      // Si no hay mensajes aún, se usa crearMensaje (inicia conversación)
      if (mensajes.length === 0) {
        await mensajeService.crearMensaje(data);
      } else {
        await mensajeService.responderMensaje(data);
      }

      setNuevoMensaje('');
      setError('');
      cargarMensajes();
    } catch (err) {
      setError(err.message || 'No se pudo enviar el mensaje');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: 700, margin: 'auto' }}>
      <h2>Conversación de Publicación #{publicacionId}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        id="contenedor-mensajes"
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '15px',
          maxHeight: '400px',
          overflowY: 'auto',
          background: '#f9f9f9'
        }}
      >
        {mensajes.map((msg) => (
          <div key={msg.id} style={{ marginBottom: '10px' }}>
            <strong>{msg.remitente.nombre} {msg.remitente.apellido}</strong><br />
            <small>{new Date(msg.createdAt).toLocaleString()}</small>
            <p>{msg.contenido}</p>
          </div>
        ))}
      </div>

      <textarea
        placeholder="Escribe una respuesta..."
        value={nuevoMensaje}
        onChange={e => setNuevoMensaje(e.target.value)}
        style={{ width: '100%', height: '80px', marginBottom: '10px' }}
      />
      <button onClick={handleEnviar}>Responder</button>
    </div>
  );
};

export default VerMensaje;