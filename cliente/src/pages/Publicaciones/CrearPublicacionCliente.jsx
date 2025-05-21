//Publicaciones/CrearPublicacionCliente.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/AuthService';
import PublicacionFactory from '../factories/PublicacionFactory';
import PublicacionService from '../services/publicacionService';

const CrearPublicacionCliente = () => {
  const navigate = useNavigate();
  const usuarioId = AuthService.getUser()?.id;
  //const clienteId = localStorage.getItem('clienteId');
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    pago: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const nuevaPublicacion = PublicacionFactory.crear(formData, usuarioId);
      await PublicacionService.crearPublicacion(nuevaPublicacion);
      setMensaje('Publicación creada exitosamente');
      setFormData({ titulo: '', descripcion: '', pago: '' });
      setTimeout(() => navigate(`/dashboard/cliente/${usuarioId}`), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Crear Publicación</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="titulo" placeholder="Título" onChange={handleChange} value={formData.titulo} required />
        <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} value={formData.descripcion} required />
        <input type="number" name="pago" placeholder="Pago" onChange={handleChange} value={formData.pago} required />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearPublicacionCliente;
