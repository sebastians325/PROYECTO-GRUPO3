import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mensajeService from '../../services/mensajeService';

const clienteId = 6;      // Cliente logueado (constante)
const freelancerId = 1;   // Freelancer asignado a esta publicación

const VerMensajeCliente = () => {
  const { publicacionId } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [error, setError] = useState('');

  const cargarMensajes = async () => {
    try {
      const datos = await mensajeService.obtenerMensajesPorPublicacion(publicacionId, clienteId);
      setMensajes(datos);
    } catch (err) {
      console.error('Error detallado:', err);
      setError(err.message || 'Error al cargar mensajes');
    }
  };

  useEffect(() => {
    cargarMensajes();
  }, [publicacionId]);

  useEffect(() => {
    const div = document.getElementById('contenedor-mensajes');
    if (div) div.scrollTop = div.scrollHeight;
  }, [mensajes]);

  const handleEnviar = async () => {
    if (!nuevoMensaje.trim()) return;

    const ultimoMensaje = mensajes[mensajes.length - 1];
    const destinatarioId = mensajes.length === 0
      ? freelancerId
      : (clienteId === ultimoMensaje?.remitenteId
          ? ultimoMensaje.destinatarioId
          : ultimoMensaje.remitenteId);

    const data = {
      publicacionId,
      remitenteId: clienteId,
      destinatarioId,
      contenido: nuevoMensaje.trim()
    };

    try {
      // Intentar crear mensaje
      await mensajeService.crearMensaje(data);
      setNuevoMensaje('');
      setError('');
      cargarMensajes();
    } catch (err) {
      const msg = err.response?.data?.error;

      // Si ya existe conversación, intentar responder
      if (err.response?.status === 400 && msg?.includes('Ya existe una conversación')) {
        try {
          await mensajeService.responderMensaje(data);
          setNuevoMensaje('');
          setError('');
          cargarMensajes();
        } catch (err2) {
          console.error('Error al responder:', err2);
          setError(err2.response?.data?.error || 'No se pudo responder el mensaje');
        }
      } else {
        console.error('Error al enviar:', err);
        setError(msg || 'No se pudo enviar el mensaje');
      }
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
        {mensajes.length === 0 ? (
          <p style={{ color: '#777' }}>No hay mensajes aún.</p>
        ) : (
          mensajes.map((msg) => (
            <div key={msg.id} style={{ marginBottom: '10px' }}>
              <strong>{msg.remitente?.nombre} {msg.remitente?.apellido}</strong><br />
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
              <p>{msg.contenido}</p>
            </div>
          ))
        )}
      </div>

      <textarea
        placeholder="Escribe una respuesta..."
        value={nuevoMensaje}
        onChange={e => setNuevoMensaje(e.target.value)}
        style={{ width: '100%', height: '80px', marginBottom: '10px' }}
      />
      <button onClick={handleEnviar}>Enviar</button>
    </div>
  );
};

export default VerMensajeCliente;
