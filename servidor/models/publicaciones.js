module.exports = (sequelize, DataTypes) => {
    const publicaciones = sequelize.define("publicaciones", {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('abierto', 'en_proceso', 'cerrado'),
            defaultValue: 'abierto'
        },
        pago: {
             type: DataTypes.FLOAT, // o DECIMAL, según tu caso
            allowNull: false,
        },    
    });

    publicaciones.associate = (models) => {
        publicaciones.belongsTo(models.usuarios, {
            foreignKey: "usuarioId", // el cliente que publica
            as: "cliente"
        });
        publicaciones.hasMany(models.postulaciones, {
            foreignKey: "publicacionId"
        });
    };

    return publicaciones;
};
