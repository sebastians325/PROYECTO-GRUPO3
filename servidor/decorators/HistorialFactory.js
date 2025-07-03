class HistorialFactory {
    static crearEntrada(postulacion) {
        const publicacion = postulacion.publicacion;
        const review = publicacion?.review;

        const cliente = review?.cliente;
        const nombreCliente = cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido';


        return {
            titulo: publicacion.titulo,
            descripcion: publicacion.descripcion,
            pago: publicacion.pago,
            comentario: review?.comentario || null,
            calificacion: review?.calificacion || null,
            cliente: nombreCliente
        };
    }
}

module.exports = HistorialFactory;
