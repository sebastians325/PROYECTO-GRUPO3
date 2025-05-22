const AuthFacade = require('../facades/AuthFacade');
const service = require('../services/usuarios.service');

exports.obtenerTodos = async (req, res) => {
  try {
    const usuarios = await service.obtenerTodos();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios." });
  }
};

exports.crearGenerico = async (req, res) => {
  try {
    const nuevo = await service.crearGenerico(req.body);
    res.json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registrarFreelancer = async (req, res) => {
  try {
    const user = await AuthFacade.registrarFreelancer(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.registrarCliente = async (req, res) => {
  try {
    const user = await AuthFacade.registrarCliente(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await AuthFacade.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};
