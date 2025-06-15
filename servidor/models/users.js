const bcrypt = require('bcrypt');

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
    role: {
      type: DataTypes.ENUM('freelancer', 'cliente'),
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    tableName: 'usuarios'
  });

  usuarios.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


  usuarios.associate = (models) => {
    usuarios.hasMany(models.publicaciones, {
      foreignKey: 'usuarioId',
      as: 'publicaciones'
    });

    usuarios.hasMany(models.postulaciones, {
      foreignKey: 'usuarioId',
      as: 'postulaciones' 
    });
    
    usuarios.hasMany(models.mensajes, {
      foreignKey: 'remitenteId',
      as: 'mensajesEnviados'
    });

    usuarios.hasMany(models.mensajes, {
      foreignKey: 'destinatarioId',
      as: 'mensajesRecibidos'
    });
  };

  return usuarios;
};

