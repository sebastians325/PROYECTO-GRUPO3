//Publicaciones/PostularseComoFreelancer.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthService from '../utils/AuthService';
import PublicacionService from '../services/publicacionService';

const PostularseComoFreelancer = () => {
  const { publicacionId } = useParams();
  const usuarioId = AuthService.getUser()?.id;

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handlePostular = async () => {
    try {
      await PublicacionService.postularse(usuarioId, publicacionId);
      setMensaje('Te has postulado exitosamente.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Postularse a la Publicación</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handlePostular}>Postularse</button>
    </div>
  );
};

export default PostularseComoFreelancer;
