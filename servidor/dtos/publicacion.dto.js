class PublicacionDTO {
    static toResponse(publicacion) {
        if (!publicacion) return null;

        const response = {
            id: publicacion.id,
            titulo: publicacion.titulo,
            descripcion: publicacion.descripcion,
            estado: publicacion.estado,
            pago: publicacion.pago,
            usuarioId: publicacion.usuarioId,
            createdAt: publicacion.createdAt
        };

        if (publicacion.cliente) {
            response.cliente = {
                id: publicacion.cliente.id,
                nombre: publicacion.cliente.nombre,
                apellido: publicacion.cliente.apellido
            };
        }

        if (publicacion.postulaciones) {
            response.postulaciones = publicacion.postulaciones.map(p => ({
                id: p.id,
                estado: p.estado,
                mensaje: p.mensaje,
                usuarioId: p.usuarioId
            }));
        }

        return response;
    }

    static fromRequest(data) {
        const errors = this.validate(data);
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        return {
            titulo: data.titulo,
            descripcion: data.descripcion,
            pago: parseFloat(data.pago),
            usuarioId: data.usuarioId,
            estado: 'abierto'
        };
    }

    static toList(publicaciones) {
        return publicaciones.map(this.toResponse);
    }

    static validate(data) {
        const errors = [];

        if (!data.titulo || data.titulo.trim().length === 0) {
            errors.push('El título es requerido');
        }

        if (!data.descripcion || data.descripcion.trim().length === 0) {
            errors.push('La descripción es requerida');
        }

        if (!data.pago || isNaN(parseFloat(data.pago)) || parseFloat(data.pago) <= 0) {
            errors.push('El pago debe ser un número mayor a 0');
        }

        if (!data.usuarioId) {
            errors.push('El ID del usuario es requerido');
        }

        return errors;
    }
}

module.exports = PublicacionDTO;