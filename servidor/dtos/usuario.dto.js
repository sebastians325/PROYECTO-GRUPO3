class UsuarioDTO {
    static toResponse(usuario) {
        if (!usuario) return null;

        const response = {
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            correo: usuario.correo,
            role: usuario.role,
            especialidad: usuario.especialidad,
            createdAt: usuario.createdAt
        };

        delete response.password;

        if (usuario.publicaciones) {
            response.publicaciones = usuario.publicaciones.map(p => ({
                id: p.id,
                titulo: p.titulo,
                estado: p.estado
            }));
        }

        if (usuario.postulaciones) {
            response.postulaciones = usuario.postulaciones.map(p => ({
                id: p.id,
                estado: p.estado,
                publicacionId: p.publicacionId
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
            nombre: data.nombre.trim(),
            apellido: data.apellido.trim(),
            correo: data.correo.toLowerCase().trim(),
            password: data.password,
            role: data.role,
            especialidad: data.especialidad?.trim() || null
        };
    }

    static toList(usuarios) {
        return usuarios.map(this.toResponse);
    }

    static validate(data) {
        const errors = [];

        if (!data.nombre || data.nombre.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }

        if (!data.apellido || data.apellido.trim().length < 2) {
            errors.push('El apellido debe tener al menos 2 caracteres');
        }

        if (!data.correo || !this.validateEmail(data.correo)) {
            errors.push('El correo electrónico no es válido');
        }

        if (!data.password || data.password.length < 6) {
            errors.push('La contraseña debe tener al menos 6 caracteres');
        }

        if (!['freelancer', 'cliente'].includes(data.role)) {
            errors.push('El rol debe ser freelancer o cliente');
        }

        return errors;
    }

    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

module.exports = UsuarioDTO;