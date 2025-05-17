module.exports = (sequelize, DataTypes) => {
  const postulaciones = sequelize.define("postulaciones", {
    estado: {
      type: DataTypes.ENUM('pendiente', 'aceptado', 'rechazado'),
      defaultValue: 'pendiente'
    },

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
