const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('OrderShipment', {
    order_shipment_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'order_id',
      },
    },
    address_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user_addresses',
        key: 'address_id',
      },
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    courier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tracking_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    voucher_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'vouchers',
        key: 'voucher_id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  });
}