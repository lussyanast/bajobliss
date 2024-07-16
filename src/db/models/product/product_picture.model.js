const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ProductPicture', {
    product_picture_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    paranoid: true,
  });
}