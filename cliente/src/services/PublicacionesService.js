const API_URL = 'http://localhost:3001/publicaciones';
//FACADE servicio centralizado
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
  }
};
