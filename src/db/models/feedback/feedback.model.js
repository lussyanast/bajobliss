const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Feedback', {
    feedback_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    paranoid: true,
  });
};