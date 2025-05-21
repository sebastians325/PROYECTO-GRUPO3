import React, { useState } from 'react';
//import { useParams } from 'react-router-dom';

const CrearPublicacionCliente = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    pago: '', // Aquí agregamos el campo pago
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // ⚠️ Reemplaza esto con el ID del cliente autenticado (puede venir de contexto o login)
  //const usuarioId = 3;
  //const { id } = useParams(); // Id del cliente desde la URL
  //const { id } = useParams(); // usuarioId dinámico
  //const usuarioId = parseInt(id, 10);
  const userStored = JSON.parse(localStorage.getItem('user'));
  const usuarioId = userStored?.id;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMensaje('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.descripcion || !formData.pago) {
      setError('Completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/publicaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          pago: parseFloat(formData.pago), // ✅ Conversión segura a número
          usuarioId 
        }),
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || 'Error al crear publicación');
      }

      setFormData({ titulo: '', descripcion: '', pago: '' });
      setMensaje('Publicación creada exitosamente.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Crear Publicación</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold">Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-semibold">Pago:</label>
          <input
            type="number"
            name="pago"
            value={formData.pago}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear
        </button>

        {mensaje && <p className="text-green-600">{mensaje}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default CrearPublicacionCliente;
