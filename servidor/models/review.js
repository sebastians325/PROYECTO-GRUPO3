module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        comentario: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        calificacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        }
    }, {
        tableName: 'reviews',
        timestamps: true
    });

    Review.associate = (models) => {
        Review.belongsTo(models.usuarios, {
            foreignKey: "usuarioId",
            as: "cliente"
        });
        Review.belongsTo(models.publicaciones, {
            foreignKey: "publicacionId"
        });
    };

    return Review;
};