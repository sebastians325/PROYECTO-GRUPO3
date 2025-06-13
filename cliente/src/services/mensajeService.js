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

  // Crear mensaje (cliente inicia conversación)
  async crearMensaje(data) {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(res, 'Error al crear el mensaje.');
  },

  // Responder mensaje existente
  async responderMensaje(data) {
    const res = await fetch(`${API_URL}/responder`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(res, 'Error al responder el mensaje.');
  },

  // Obtener historial de mensajes por publicación
  async obtenerMensajesPorPublicacion(publicacionId, usuarioId) {
    const res = await fetch(`${API_URL}/publicacion/${publicacionId}?usuarioId=${usuarioId}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res, 'Error al obtener mensajes por publicación.');
  },

  // Obtener publicaciones del cliente
  async obtenerPublicacionesCliente(clienteId) {
    const res = await fetch(`${API_URL}/cliente/${clienteId}/publicaciones`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(res, 'Error al obtener publicaciones del cliente.');
  },

  // Obtener postulaciones aceptadas del freelancer
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

  // Enviar mensaje directo entre usuarios (sin publicación)
  async enviarMensajeDirecto(data) {
    const res = await fetch(`${API_URL}/directo`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(res, 'Error al enviar mensaje directo.');
  },
};

export default mensajeService;
