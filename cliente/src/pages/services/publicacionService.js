const API = 'http://localhost:3001';

const PublicacionService = {
  async crearPublicacion(data) {
    const response = await fetch(`${API}/publicaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const resData = await response.json();
      throw new Error(resData.error || 'Error al crear publicación');
    }

    return await response.json();
  },

  async obtenerTodas() {
    const response = await fetch(`${API}/publicaciones`);
    return await response.json();
  },

  async postularse(usuarioId, publicacionId) {
    const response = await fetch(`${API}/postulaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioId, publicacionId }),
    });

    if (!response.ok) {
      const resData = await response.json();
      throw new Error(resData.error || 'Error al postularse');
    }

    return await response.json();
  },

  async cambiarEstadoPublicacionAPI(publicacionId, nuevoEstado) {
    const response = await fetch(`${API}/publicaciones/${publicacionId}/estado`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
    });

    if (!response.ok) {
      const resData = await response.json();
      throw new Error(resData.error || 'Error al cambiar el estado');
    }

    return await response.json();
  }
};

export default PublicacionService;
