const { usuarios } = require('../models');

exports.create = async (data) => {
  return await usuarios.create(data);
};

exports.findByEmail = async (correo) => {
  return await usuarios.findOne({ where: { correo } });
};

exports.findAll = async () => {
  return await usuarios.findAll({ attributes: { exclude: ['password'] } });
};
