// models/ClientProfile.js
module.exports = (sequelize, DataTypes) => {
    const ClientProfile = sequelize.define('ClientProfile', {
        empresa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'client_profiles'
    });
  
    ClientProfile.associate = function(models) {
        ClientProfile.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };
  
    return ClientProfile;
};