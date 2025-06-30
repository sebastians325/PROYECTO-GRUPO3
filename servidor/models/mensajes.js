//models/mensajes.js
module.exports = (sequelize, DataTypes) => {
  const Mensajes = sequelize.define('mensajes', {
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'aceptado', 'rechazado'),
      defaultValue: 'pendiente',
    }
  });

  Mensajes.associate = models => {
    Mensajes.belongsTo(models.publicaciones, {
      foreignKey: 'publicacionId',
      onDelete: 'CASCADE',
    });

    Mensajes.belongsTo(models.usuarios, {
      foreignKey: 'remitenteId',
      as: 'remitente',
    });

    Mensajes.belongsTo(models.usuarios, {
      foreignKey: 'destinatarioId',
      as: 'destinatario',
    });
  };

  return Mensajes;
};
