// services/mensajeService.js
// services/mensajeService.js
const API_URL = 'http://localhost:3001/mensajes';

const mensajeService = {
  getToken() {
    return localStorage.getItem('token');
  },

  getHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  },

  async handleResponse(res, defaultMessage) {
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: defaultMessage }));
      throw new Error(error.message);
    }
    return res.json();
  },

  // Cliente inicia conversación con freelancer aceptado en publicación
  async crearMensaje(data) {
    // data: { contenido, publicacionId, remitenteId, destinatarioId }
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(res, 'Error al crear el mensaje.');
  },

  // Obtener mensajes (historial) de una publicación para un usuario dado
  async obtenerMensajesPorPublicacion(publicacionId, usuarioId) {
    // usuarioId en query para validar acceso
    const res = await fetch(`${API_URL}/publicacion/${publicacionId}?usuarioId=${usuarioId}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res, 'Error al obtener mensajes por publicación.');
  },

  // Freelancer o cliente responde en conversación existente
  async responderMensaje(data) {
    // data: { contenido, publicacionId, remitenteId, destinatarioId }
    const res = await fetch(`${API_URL}/responder`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(res, 'Error al responder el mensaje.');
  },

  // Cliente ve sus publicaciones (para mostrar botones nuevoMensaje y verMensajes)
  async obtenerPublicacionesCliente(clienteId) {
    const res = await fetch(`${API_URL}/cliente/${clienteId}/publicaciones`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res, 'Error al obtener publicaciones del cliente.');
  },

  // Freelancer ve sus postulaciones aceptadas (para mostrar botón verMensajes)
  async obtenerPostulacionesAceptadas(freelancerId) {
    const res = await fetch(`${API_URL}/freelancer/${freelancerId}/postulaciones`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res, 'Error al obtener postulaciones aceptadas.');
  },

  // Obtener freelancer aceptado para una publicación
  async obtenerFreelancerAceptado(publicacionId) {
    const res = await fetch(`${API_URL}/publicacion/${publicacionId}/freelancer`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res, 'Error al obtener freelancer aceptado.');
  },

  // Obtener cliente dueño de la publicación
  async obtenerClienteDePublicacion(publicacionId) {
    const res = await fetch(`${API_URL}/publicacion/${publicacionId}/cliente`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res, 'Error al obtener cliente de la publicación.');
  },
};
import axios from 'axios';

export const obtenerMensajesPorPublicacion = async (publicacionId, usuarioId) => {
  const response = await axios.get(`/api/mensajes/publicacion/${publicacionId}`, {
    params: { usuarioId }
  });
  return response.data;
};
export default mensajeService;

