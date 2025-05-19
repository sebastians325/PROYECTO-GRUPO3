export default class PublicacionFactory {
  static crear(data, usuarioId) {
    return {
      titulo: data.titulo,
      descripcion: data.descripcion,
      pago: parseFloat(data.pago),
      usuarioId: usuarioId
    };
  }
}
