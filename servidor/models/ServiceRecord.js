// models/ServiceRecord.js
module.exports = (sequelize, DataTypes) => {
    const ServiceRecord = sequelize.define('ServiceRecord', {
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      estado: {
        type: DataTypes.ENUM('pendiente', 'en_progreso', 'completado', 'cancelado'),
        defaultValue: 'pendiente'
      },
      fechaInicio: {
        type: DataTypes.DATE,
        allowNull: true
      },
      fechaFin: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'service_records'
    });
  
    ServiceRecord.associate = (models) => {
      ServiceRecord.belongsTo(models.User, {
        as: 'freelancer',
        foreignKey: 'freelancerId',
        allowNull: false
      });
      ServiceRecord.belongsTo(models.User, {
        as: 'cliente',
        foreignKey: 'clienteId',
        allowNull: false
      });
    };
  
    return ServiceRecord;
  };
  