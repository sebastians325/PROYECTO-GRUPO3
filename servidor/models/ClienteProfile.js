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
      }
    }, {
      tableName: 'client_profiles'
    });
  
    ClientProfile.associate = (models) => {
      ClientProfile.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    };
  
    return ClientProfile;
  };  