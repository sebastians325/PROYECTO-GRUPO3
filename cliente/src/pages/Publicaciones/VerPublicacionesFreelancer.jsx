import React, { useEffect, useState } from 'react';

const VerPublicacionesFreelancer = ({ usuarioId }) => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch('http://localhost:3001/publicaciones');
        const data = await response.json();
        setPublicaciones(data);
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };
    fetchPublicaciones();
  }, []);

  const handlePostular = async (publicacionId) => {
    try {
      const response = await fetch('http://localhost:3001/postulaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, publicacionId }),
      });

      if (!response.ok) {
        throw new Error('Error al postularse');
      }

      alert('Postulación realizada exitosamente');
    } catch (error) {
      alert('Error al postularse: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Publicaciones Disponibles</h2>
      {publicaciones.map((pub) => (
        <div key={pub.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>{pub.titulo}</h3>
          <p>{pub.descripcion}</p>
          <p>Estado: {pub.estado}</p>
          <p>Pago: {pub.pago}</p>
          <p>Publicado por: {pub.cliente?.nombre} {pub.cliente?.apellido}</p>         
          <button
            onClick={() => handlePostular(pub.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Postularme
          </button>
        </div>
      ))}
    </div>
  );
};

export default VerPublicacionesFreelancer;
