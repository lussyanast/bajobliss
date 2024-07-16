const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('OrderItem', {
    order_item_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id'
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    total_weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    paranoid: true,
  });
}
