const repo = require('../repositories/usuarios.repository');

exports.crearConRol = async ({ nombre, apellido, correo, password, especialidad }, rol) => {
  if (!nombre || !apellido || !correo || !password) {
    throw { status: 400, message: "Faltan campos requeridos." };
  }

  const usuario = await repo.create({
    nombre,
    apellido,
    correo,
    password,
    role: rol,
    especialidad
  });

  const result = usuario.toJSON();
  delete result.password;
  return result;
};

exports.crearGenerico = async (data) => {
  return await repo.create(data);
};

exports.buscarPorCorreo = async (correo) => {
  return await repo.findByEmail(correo);
};

exports.obtenerTodos = async () => {
  return await repo.findAll();
};
