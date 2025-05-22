const facade = require('../facades/PublicacionFacade');
const PublicacionDTO = require('../dtos/publicacion.dto');

exports.crear = async (req, res) => {
    try {
        const publicacionData = PublicacionDTO.fromRequest(req.body);
        const nueva = await facade.crearPublicacion(publicacionData);
        res.status(201).json(PublicacionDTO.toResponse(nueva));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listar = async (req, res) => {
    try {
        const publicaciones = await facade.listarPublicaciones(req.query);
        res.json(PublicacionDTO.toList(publicaciones));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verCandidatos = async (req, res) => {
  try {
    const lista = await facade.obtenerCandidatos(req.params.id);
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const resultado = await facade.actualizarEstado(req.params.id, req.body.estado);
    res.json(resultado);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

exports.cerrar = async (req, res) => {
  try {
    const resultado = await facade.cerrarPublicacion(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.enviarMensaje = async (req, res) => {
  try {
    const resultado = await facade.responderPostulacion(req.params.id, req.body.mensaje);
    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
