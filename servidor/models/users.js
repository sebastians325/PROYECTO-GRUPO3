const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const usuarios = sequelize.define("usuarios", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })

    return usuarios
}