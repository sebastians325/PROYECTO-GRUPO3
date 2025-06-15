// src/services/ClienteService.js

const API_BASE = 'http://localhost:3001';

export const ClienteService = {
  getToken() {
    return localStorage.getItem('token');
  },

  getHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  },

  async fetchPublicaciones(usuarioId) {
    const res = await fetch(`${API_BASE}/publicaciones?usuarioId=${usuarioId}`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Error al obtener publicaciones' }));
      throw new Error(errData.message);
    }
    return await res.json();
  },

  async fetchPostulantes(publicacionId) {
    const res = await fetch(`${API_BASE}/publicaciones/${publicacionId}/candidatos`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`Error al obtener postulantes para publicación ${publicacionId}`);
    return await res.json();
  },

  async cambiarEstadoPublicacion(publicacionId, nuevoEstado) {
    const res = await fetch(`${API_BASE}/publicaciones/${publicacionId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Error al cambiar estado' }));
      throw new Error(errData.message);
    }
  },

  async aceptarPostulante(postulacionId) {
    const res = await fetch(`${API_BASE}/postulaciones/${postulacionId}/aceptar`, {
      method: 'PUT',
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Error al aceptar postulante' }));
      throw new Error(errData.message);
    }
  },
};