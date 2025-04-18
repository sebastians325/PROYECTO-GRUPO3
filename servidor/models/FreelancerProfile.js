module.exports = (sequelize, DataTypes) => {
    const FreelancerProfile = sequelize.define('FreelancerProfile', {
      profesion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      experiencia: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      habilidades: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    }, {
      tableName: 'freelancer_profiles'
    });
  
    FreelancerProfile.associate = (models) => {
      FreelancerProfile.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'CASCADE'
      });
    };
  
    return FreelancerProfile;
  };