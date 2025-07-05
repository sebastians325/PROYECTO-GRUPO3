class PostulacionDTO {
    static toResponse(postulacion) {
        if (!postulacion) return null;

        const response = {
            id: postulacion.id,
            estado: postulacion.estado,
            mensaje: postulacion.mensaje,
            usuarioId: postulacion.usuarioId,
            publicacionId: postulacion.publicacionId,
            createdAt: postulacion.createdAt,
            cvUrl: postulacion.cvUrl //AGREGA ESTA LÍNEA
        };

        if (postulacion.freelancer) {
            response.freelancer = {
                id: postulacion.freelancer.id,
                nombre: postulacion.freelancer.nombre,
                apellido: postulacion.freelancer.apellido,
                especialidad: postulacion.freelancer.especialidad
            };
        }

        return response;
    }

    static fromRequest(data) {
        const errors = this.validate(data);
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        return {
            usuarioId: data.usuarioId,
            publicacionId: data.publicacionId,
            mensaje: data.mensaje || null,
            estado: 'pendiente'
        };
    }

    static toList(postulaciones) {
        return postulaciones.map(this.toResponse);
    }

    static validate(data) {
        const errors = [];

        if (!data.usuarioId) {
            errors.push('El ID del usuario es requerido');
        }

        if (!data.publicacionId) {
            errors.push('El ID de la publicación es requerido');
        }

        if (data.mensaje && typeof data.mensaje !== 'string') {
            errors.push('El mensaje debe ser texto');
        }

        return errors;
    }
}

module.exports = PostulacionDTO;
