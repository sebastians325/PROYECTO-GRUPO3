const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'tu_clave_secreta'; // Reemplaza con process.env.JWT_SECRET en producción

exports.registerUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, password, role } = req.body;
    const exists = await User.findOne({ where: { correo } });
    if (exists) return res.status(400).json({ error: 'Usuario ya registrado' });

    const newUser = await User.create({ nombre, apellido, correo, password, role });
    res.status(201).json({ message: 'Usuario creado con éxito', id: newUser.id });
  } catch (err) {
    res.status(500).json({ error: 'Error en registro', details: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const user = await User.findOne({ where: { correo } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await user.validPassword(password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, nombre: user.nombre, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Error en login', details: err.message });
  }
};