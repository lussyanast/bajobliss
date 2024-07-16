const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('UserWishlist', {
    wishlist_id: {
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
    product_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'products',
        key: 'product_id',
      },
    },
  }, {
    paranoid: true,
  });
}