// services/PublicacionesService.js
const API_URL = 'http://localhost:3001/publicaciones';

export const PublicacionesService = {
  async obtenerPublicacionesDisponibles() {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Error al cargar publicaciones (HTTP ${res.status})`);
    }
    return await res.json();
  },

  async postularse(publicacionId, usuarioId) {
    const res = await fetch('http://localhost:3001/postulaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioId, publicacionId }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al postularse.');
    }

    return await res.json();
  },

  async crearPublicacion(data) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Error al crear publicación.');
    }

    return await res.json();
  },

  async obtenerPostulacionesPorUsuario(usuarioId) {
    const res = await fetch(`http://localhost:3001/postulaciones?usuarioId=${usuarioId}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al obtener postulaciones del usuario.');
    }

    return await res.json(); // Debe incluir la publicación relacionada
  },

  async obtenerPublicacionesAceptadasPorUsuario(usuarioId) {
    const res = await fetch(`http://localhost:3001/postulaciones/aceptadas/${usuarioId}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al obtener publicaciones aceptadas.');
    }

    return await res.json(); // Debe incluir info de la publicación
  },

  // Obtener el cliente (usuario) dueño de una publicación
  async obtenerClienteDePublicacion(publicacionId) {
    const res = await fetch(`${API_URL}/${publicacionId}/cliente`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Error al obtener cliente de la publicación.');
    }
    return await res.json(); // Devuelve el objeto del usuario cliente
  }
};
