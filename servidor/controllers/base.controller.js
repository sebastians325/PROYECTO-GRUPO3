class BaseController {
    success(res, data) {
        return res.status(200).json(data);
    }

    created(res, data) {
        return res.status(201).json(data);
    }

    handleError(res, err) {
        const status = err.status || 500;
        const message = err.message || 'Error interno del servidor';
        return res.status(status).json({ error: message });
    }
}

module.exports = { BaseController };