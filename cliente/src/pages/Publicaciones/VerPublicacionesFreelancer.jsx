import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicacionService from '../services/publicacionService';

const VerPublicacionesFreelancer = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PublicacionService.obtenerTodas();
        setPublicaciones(data);
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Listado de Publicaciones</h2>
      {publicaciones.map(pub => (
        <div key={pub.id}>
          <h3>{pub.titulo}</h3>
          <p>{pub.descripcion}</p>
          <p><strong>Pago:</strong> ${pub.pago}</p>
          <Link to={`/postular/${pub.id}`}>Postularse</Link>
        </div>
      ))}
    </div>
  );
};

export default VerPublicacionesFreelancer;
