const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Order', {
    order_id: {
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
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    order_shipment_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'order_shipments',
        key: 'order_shipment_id'
      }
    },
    voucher_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'vouchers',
        key: 'voucher_id',
      },
    },
    item_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'payments',
        key: 'payment_id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    }
  });
}