const { body, param } = require('express-validator');
const { validateResult } = require('../utils/validator');

const validatePostulacion = [
    body('usuarioId').isInt().withMessage('ID de usuario inválido'),
    body('publicacionId').isInt().withMessage('ID de publicación inválido'),
    body('mensaje').optional().isString().withMessage('Mensaje inválido'),
    validateResult
];

module.exports = {
    validatePostulacion
};