import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicacionesService } from '../../services/PublicacionesService';

function CrearMensajeF() {
  const [postulacionesAceptadas, setPostulacionesAceptadas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  const usuarioId = 6; // Este es el ID actual del usuario autenticado

  useEffect(() => {
    const cargarPostulaciones = async () => {
      try {
        const todas = await PublicacionesService.obtenerPostulacionesPorUsuario(usuarioId);
        const aceptadas = todas.filter(p => p.estado === 'aceptado');
        setPostulacionesAceptadas(aceptadas);
      } catch (err) {
        console.error(err);
      }
    };

    cargarPostulaciones();
  }, [usuarioId]);

  const filtradas = postulacionesAceptadas.filter(p =>
    p.publicacion?.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleCrearMensaje = (publicacionId) => navigate(`/mensajes/crear/${publicacionId}`);
  const handleVerMensaje = (publicacionId) => navigate(`/mensajes/ver/${publicacionId}`);

  return (
    <div>
      <h2>Mensajes</h2>
      <input
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        placeholder="Buscar publicación"
      />
      <ul>
        {filtradas.map(p => (
          <li key={p.id}>
            {p.publicacion?.titulo}
            <button onClick={() => handleCrearMensaje(p.publicacion.id)}>Crear mensaje</button>
            <button onClick={() => handleVerMensaje(p.publicacion.id)}>Ver mensaje</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrearMensajeF;
