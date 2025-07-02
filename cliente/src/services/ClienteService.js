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

  async enviarReseña(publicacionId, comentario, calificacion) {
    try {
      const response = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicacionId,
          comentario,
          calificacion,
          usuarioId: JSON.parse(localStorage.getItem('user')).id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar la reseña');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async createReview(reviewData) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(reviewData),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Error al crear reseña' }));
      throw new Error(errData.message);
    }
    return await res.json();
  },

  async getReviews() {
    const res = await fetch(`${API_BASE}/reviews`, {
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Error al obtener reseñas' }));
      throw new Error(errData.message);
    }
    return await res.json();
  },

  async obtenerCVUrl(filename) {
    const res = await fetch(`${API_BASE}/postulaciones/ver-cv/${filename}`, {
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ message: 'Error al obtener URL del CV' }));
      throw new Error(errData.message);
    }

    return await res.json();
  }
};