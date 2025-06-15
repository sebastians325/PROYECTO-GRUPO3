import React, { useState } from 'react';
import mensajeService from '../../services/mensajeService';
import { useNavigate } from 'react-router-dom';

const CrearMensajeDirecto = () => {
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const remitenteId = 2;     // ID fijo del remitente
  const destinatarioId = 3;  // ID fijo del destinatario

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mensajeService.enviarMensajeDirecto({
        contenido,
        remitenteId,
        destinatarioId,
      });
      setMensaje('Mensaje enviado exitosamente');
      setTimeout(() => navigate(`/mensajes`), 2000);
    } catch (err) {
      setError(err.message || 'Error al enviar el mensaje');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <h2>Enviar Mensaje Directo (2 → 3)</h2>
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
