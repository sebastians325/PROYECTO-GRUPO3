const facade = require('../facades/PostulacionFacade');

exports.crearPostulacion = async (req, res) => {
  try {
    const nueva = await facade.crear(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.aceptarPostulante = async (req, res) => {
  try {
    const result = await facade.aceptar(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
