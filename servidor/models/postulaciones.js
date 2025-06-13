module.exports = (sequelize, DataTypes) => {
  const postulaciones = sequelize.define("postulaciones", {
    estado: {
      type: DataTypes.ENUM('pendiente', 'aceptado', 'rechazado'),
      defaultValue: 'pendiente'
    },
    cvUrl: {
      type: DataTypes.STRING,
      allowNull: true // URL del archivo PDF subido a S3
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['usuarioId', 'publicacionId']
      }
    ]
  });

  postulaciones.associate = (models) => {
    postulaciones.belongsTo(models.usuarios, {
      foreignKey: "usuarioId", // freelancer
      as: "freelancer"
    });
    postulaciones.belongsTo(models.publicaciones, {
      foreignKey: "publicacionId"
    });
  };

  return postulaciones;
};