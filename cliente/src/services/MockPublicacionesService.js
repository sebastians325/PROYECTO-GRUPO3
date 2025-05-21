// Simula respuestas exitosas del backend sin hacer llamadas reales
// i
export const MockPublicacionesService = {
  async crearPublicacion(data) {
    console.log('Mock: creando publicación con datos:', data);
    return Promise.resolve({
      id: 123,
      titulo: data.titulo,
      descripcion: data.descripcion,
      pago: data.pago,
      usuarioId: data.usuarioId,
      mensaje: 'Publicación mock creada exitosamente.'
    });
  },

  async obtenerPublicacionesDisponibles() {
    console.log('🔧 Mock: obteniendo publicaciones disponibles...');
    return Promise.resolve([
      {
        id: 1,
        titulo: 'Mock Proyecto 1',
        descripcion: 'Descripción de prueba',
        pago: 200,
      },
      {
        id: 2,
        titulo: 'Mock Proyecto 2',
        descripcion: 'Otro proyecto falso',
        pago: 500,
      }
    ]);
  },

  async postularse(publicacionId, usuarioId) {
    console.log(` Mock: postulando a publicación ${publicacionId} como usuario ${usuarioId}`);
    return Promise.resolve({
      id: 999,
      publicacionId,
      usuarioId,
      mensaje: 'Postulación mock exitosa.'
    });
  }
};
