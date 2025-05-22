class PostulacionDTO {
    static toResponse(postulacion) {
        return {
            id: postulacion.id,
            estado: postulacion.estado,
            mensaje: postulacion.mensaje,
            usuarioId: postulacion.usuarioId,
            publicacionId: postulacion.publicacionId,
            createdAt: postulacion.createdAt
        };
    }

    static fromRequest(data) {
        return {
            usuarioId: data.usuarioId,
            publicacionId: data.publicacionId,
            mensaje: data.mensaje || null,
            estado: 'pendiente'
        };
    }
}

module.exports = PostulacionDTO;