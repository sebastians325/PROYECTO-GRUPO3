const AuthFacade = require('../facades/AuthFacade');
const service = require('../services/usuarios.service');
const UsuarioDTO = require('../dtos/usuario.dto');

exports.obtenerTodos = async (req, res) => {
    try {
        const usuarios = await service.obtenerTodos();
        res.json(UsuarioDTO.toList(usuarios));
    } catch (err) {
        res.status(500).json({ error: "Error al obtener usuarios." });
    }
};

exports.crearGenerico = async (req, res) => {
    try {
        const userData = UsuarioDTO.fromRequest(req.body);
        const nuevo = await service.crearGenerico(userData);
        res.json(UsuarioDTO.toResponse(nuevo));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.registrarFreelancer = async (req, res) => {
    try {
        const userData = UsuarioDTO.fromRequest({ ...req.body, role: 'freelancer' });
        const user = await AuthFacade.registrarFreelancer(userData);
        res.status(201).json(UsuarioDTO.toResponse(user));
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
