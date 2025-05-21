// pages/Publicaciones/CrearPublicacionCliente.jsx
//S unica responsabilidad
import React, { useState } from 'react';
import { useServicioPublicaciones } from '../../Context/ServicioPublicacionesContext';
import { validarFormularioPublicacion } from '../../utils/ValidacionPublicacion';

const CrearPublicacionCliente = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    pago: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const publicacionesService = useServicioPublicaciones();

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

    const errores = validarFormularioPublicacion(formData);
    if (Object.keys(errores).length > 0) {
      setError(Object.values(errores).join(' '));
      return;
    }

    try {
      await publicacionesService.crearPublicacion({
        ...formData,
        pago: parseFloat(formData.pago),
        usuarioId,
      });

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
