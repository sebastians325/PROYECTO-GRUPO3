const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
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
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role : {
            type: DataTypes.ENUM('frelancer', 'cliente'),
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    });

    User.prototype.validPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    return usuarios
};
