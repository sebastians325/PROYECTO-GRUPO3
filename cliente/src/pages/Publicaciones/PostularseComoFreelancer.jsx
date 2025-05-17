import React, { useState } from 'react';

const PostularseComoFreelancer = ({ publicacionId }) => {
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // ⚠️ Reemplaza esto con el ID del freelancer autenticado (puede venir de contexto o token)
  const usuarioId = 1;

  const handlePostular = async () => {
    try {
      const response = await fetch('http://localhost:3001/postulaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuarioId, publicacionId }),
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || 'Error al postularse');
      }

      setMensaje('Te has postulado exitosamente.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Postúlate a esta publicación</h2>

      <button
        onClick={handlePostular}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Postularme
      </button>

      {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default PostularseComoFreelancer;
