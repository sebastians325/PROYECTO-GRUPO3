import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mensajeService from '../../services/mensajeService';
import { ClienteService } from '../../services/ClienteService';

const CrearMensaje = () => {
  const { publicacionId } = useParams();
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [postulantes, setPostulantes] = useState([]);
  const [destinatarioId, setDestinatarioId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPostulantes = async () => {
      try {
        const lista = await ClienteService.fetchPostulantes(publicacionId);
        const aceptados = lista.filter(p => p.estado.toLowerCase() === 'aceptado');
        setPostulantes(aceptados);
        if (aceptados.length > 0) setDestinatarioId(aceptados[0].usuarioId);
      } catch (err) {
        setError('Error al cargar postulantes');
      }
    };
    cargarPostulantes();
  }, [publicacionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mensajeService.crearMensaje({
        publicacionId,
        destinatarioId,
        contenido,
      });
      setMensaje('Mensaje enviado exitosamente');
      setTimeout(() => navigate(`/mensajes`), 2000);
    } catch (err) {
      setError(err.message || 'Error al enviar el mensaje');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <h2>Crear Mensaje para Publicación #{publicacionId}</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Destinatario:
          <select
            value={destinatarioId}
            onChange={(e) => setDestinatarioId(e.target.value)}
            required
            style={{ display: 'block', marginBottom: '10px', marginTop: '5px' }}
          >
            {postulantes.map((postulante) => (
              <option key={postulante.id} value={postulante.usuarioId}>
                {postulante.freelancer?.nombre} {postulante.freelancer?.apellido}
              </option>
            ))}
          </select>
        </label>

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

export default CrearMensaje;
