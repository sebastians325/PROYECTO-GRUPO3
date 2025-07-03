import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HistorialTrabajos.css'; // crea este CSS para estilos personalizados
import { useParams } from 'react-router-dom';

function Estrellas({ calificacion }) {
  const max = 5;
  return (
    <div className="estrellas">
      {[...Array(max)].map((_, i) => (
        <span key={i} className={i < calificacion ? 'estrella llena' : 'estrella'}>★</span>
      ))}
    </div>
  );
}

function HistorialTrabajos() {
  const { freelancerId } = useParams();
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/freelancers/${freelancerId}/historial`);
        setHistorial(res.data);
      } catch (err) {
        setError('Error al obtener historial');
      } finally {
        setLoading(false);
      }
    };
    fetchHistorial();
  }, [freelancerId]);

  if (loading) return <p className="cargando">Cargando historial...</p>;
  if (error) return <p className="error">{error}</p>;
  if (historial.length === 0) return <p className="vacio">Aún no has realizado trabajos.</p>;

  return (
    <div className="historial-container">
      <h2>Historial de Trabajos</h2>
      <div className="historial-grid">
        {historial.map((item, index) => (
          <div key={index} className="historial-card">
            <h3>{item.titulo}</h3>
            <p className="descripcion">{item.descripcion}</p>
            <p><strong>Pago:</strong> S/ {item.pago}</p>
            <p><strong>Cliente:</strong> {item.cliente ? `${item.cliente.nombre} ${item.cliente.apellido}` : 'Desconocido'}</p>
            <p><strong>Comentario:</strong> {item.comentario || 'Sin comentarios'}</p>
            <Estrellas calificacion={item.calificacion || 0} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistorialTrabajos;
