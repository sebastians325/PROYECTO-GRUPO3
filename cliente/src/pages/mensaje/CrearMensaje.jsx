import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mensajeService from '../../services/mensajeService';
import { ClienteService } from '../../services/ClienteService';

const CrearMensajeDirecto = () => {
  const { publicacionId } = useParams();
  const navigate = useNavigate();

  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [postulantes, setPostulantes] = useState([]);
  const [destinatarioId, setDestinatarioId] = useState('');

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const remitenteId = storedUser?.id;

  useEffect(() => {
    const cargarPostulantes = async () => {
      try {
        const lista = await ClienteService.fetchPostulantes(publicacionId);
        const aceptados = lista.filter(p => p.estado.toLowerCase() === 'aceptado');
        setPostulantes(aceptados);
        if (aceptados.length > 0) setDestinatarioId(aceptados[0].usuarioId);
      } catch (err) {
        setError('Error al cargar postulantes aceptados');
      }
    };

    if (publicacionId) {
      cargarPostulantes();
    }
  }, [publicacionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!remitenteId || !destinatarioId) {
      setError('Faltan datos del remitente o destinatario');
      return;
    }

    try {
      await mensajeService.enviarMensajeDirecto({
        contenido,
        remitenteId,
        destinatarioId,
        publicacionId,
      });
      setMensaje('Mensaje enviado exitosamente');
      setTimeout(() => navigate(`/mensajes`), 2000);
    } catch (err) {
      setError(err.message || 'Error al enviar el mensaje');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <h2>Enviar Mensaje Directo ({remitenteId} → {destinatarioId || '?'})</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Escribe tu mensaje..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
          style={{ width: '100%', height: '100px', marginBottom: '10px' }}
        />
        <button type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default CrearMensajeDirecto;
