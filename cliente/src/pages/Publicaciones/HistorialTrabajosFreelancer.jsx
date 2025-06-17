import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HistorialTrabajosFreelancer.css';

const HistorialTrabajosFreelancer = () => {
  const { id } = useParams();
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerHistorial = async () => {
      try {
        const res = await fetch(`http://localhost:3001/historial/${id}`);
        const data = await res.json();
        setHistorial(data);
      } catch (error) {
        console.error('Error al obtener historial:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerHistorial();
  }, [id]);

  if (loading) return <p className="loading-message">Cargando historial...</p>;

  if (historial.length === 0) return <p className="no-results">No tienes trabajos finalizados aún.</p>;

  return (
    <div className="historial-container">
      <h2>Historial de Trabajos Finalizados</h2>
      <table className="historial-table">
        <thead>
          <tr>
            <th>Proyecto</th>
            <th>Cliente</th>
            <th>Presupuesto</th>
            <th>Comentario</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((pub) => (
            <tr key={pub.id}>
              <td>{pub.titulo}</td>
              <td>{pub.cliente?.nombre} {pub.cliente?.apellido}</td>
              <td>${pub.pago}</td>
              <td>{pub.Reviews?.[0]?.comentario || 'Sin reseña'}</td>
              <td>{pub.Reviews?.[0]?.calificacion || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialTrabajosFreelancer;
