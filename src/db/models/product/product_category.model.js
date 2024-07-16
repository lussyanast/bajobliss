const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ProductCategory', {
    category_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    }
  }, {
    paranoid: true,
  });
}
