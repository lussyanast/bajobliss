const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ProductReview', {
    review_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    paranoid: true,
  });
}
