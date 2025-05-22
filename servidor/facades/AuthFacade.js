const service = require('../services/usuarios.service');
const { generateToken } = require('../middleware/utils/jwt');
const { comparePassword } = require('../middleware/utils/password');

class AuthFacade {

  async registrarFreelancer(data) {
    return await service.crearConRol(data, "freelancer");
  }


  async registrarCliente(data) {
    return await service.crearConRol(data, "cliente");
  }

  async login({ correo, password }) {
    if (!correo || !password) {
      throw { status: 400, message: 'Correo y contraseña requeridos.' };
    }

    const user = await service.buscarPorCorreo(correo);
    if (!user) throw { status: 401, message: 'Usuario no encontrado.' };

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw { status: 401, message: 'Contraseña incorrecta.' };

    const token = generateToken({
      id: user.id,
      role: user.role,
      correo: user.correo,
      nombre: user.nombre,
    });

    const userData = user.toJSON();
    delete userData.password;

    return { mensaje: 'Login exitoso', token, user: userData };
  }
}

module.exports = new AuthFacade();

