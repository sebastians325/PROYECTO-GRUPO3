// src/hooks/usePublicacionesCliente.js
import { useState, useEffect } from 'react';

export function usePublicacionesCliente(usuarioId) {
  const [publicaciones, setPublicaciones] = useState([]);
  const [postulantesPorPublicacion, setPostulantesPorPublicacion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!usuarioId) return;

    async function fetchData() {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:3001/publicaciones?usuarioId=${usuarioId}`);
        if (!res.ok) throw new Error('Error al obtener publicaciones');
        const data = await res.json();
        setPublicaciones(data);

        const postulantesData = {};
        for (const pub of data) {
          const resPostulantes = await fetch(`http://localhost:3001/publicaciones/${pub.id}/candidatos`);
          if (!resPostulantes.ok) throw new Error('Error al obtener postulantes');
          const postulantes = await resPostulantes.json();
          postulantesData[pub.id] = postulantes;
        }

        setPostulantesPorPublicacion(postulantesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [usuarioId]);

  return {
    publicaciones,
    setPublicaciones,
    postulantesPorPublicacion,
    setPostulantesPorPublicacion,
    loading,
    error
  };
}
