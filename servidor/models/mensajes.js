module.exports = (sequelize, DataTypes) => {
  const Mensajes = sequelize.define('mensajes', {
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'aceptado', 'rechazado'),
      defaultValue: 'pendiente'
    }
  });

  Mensajes.associate = models => {
    Mensajes.belongsTo(models.postulaciones, {
      foreignKey: 'postulacionId',
      onDelete: 'CASCADE'
    });
  };

  return Mensajes;
};
