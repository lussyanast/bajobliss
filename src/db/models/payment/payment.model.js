const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Payment', {
    payment_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id',
      },
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    merchant_id: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    paranoid: true,
  });
}