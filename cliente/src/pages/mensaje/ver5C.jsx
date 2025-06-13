import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mensajeService from '../../services/mensajeService';
import { ClienteService } from '../../services/ClienteService';

const VerMensajeCliente = () => {
  const { publicacionId } = useParams();
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [error, setError] = useState('');
  const [freelancerId, setFreelancerId] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const clienteId = storedUser?.id;

  useEffect(() => {
    const cargarPostulantes = async () => {
      try {
        const lista = await ClienteService.fetchPostulantes(publicacionId);
        const aceptados = lista.filter(p => p.estado.toLowerCase() === 'aceptado');
        if (aceptados.length > 0) {
          setFreelancerId(aceptados[0].usuarioId);
        } else {
          setError('No hay postulantes aceptados para esta publicación.');
        }
      } catch (err) {
        setError('Error al cargar postulantes aceptados');
        console.error(err);
      }
    };

    if (publicacionId) {
      cargarPostulantes();
    }
  }, [publicacionId]);

  const cargarMensajes = async () => {
    try {
      const datos = await mensajeService.obtenerMensajesPorPublicacion(publicacionId, freelancerId);
      setMensajes(datos);
    } catch (err) {
      console.error('Error al obtener mensajes:', err);
      setError(err.message || 'Error al cargar mensajes');
    }
  };

  useEffect(() => {
    if (clienteId && freelancerId) {
      cargarMensajes();
    }
  }, [publicacionId, clienteId, freelancerId]);

  useEffect(() => {
    const div = document.getElementById('contenedor-mensajes');
    if (div) div.scrollTop = div.scrollHeight;
  }, [mensajes]);

  const handleEnviar = async () => {
    if (!nuevoMensaje.trim() || !freelancerId) return;

    const data = {
      publicacionId,
      remitenteId: clienteId,
      destinatarioId: freelancerId,
      contenido: nuevoMensaje.trim()
    };

    try {
      await mensajeService.enviarMensajeDirecto(data); // ✅ la que funciona
      setNuevoMensaje('');
      setError('');
      await cargarMensajes();
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
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
        disabled={!freelancerId}
      />
      <button onClick={handleEnviar} disabled={!freelancerId}>Enviar</button>
    </div>
  );
};

export default VerMensajeCliente;
