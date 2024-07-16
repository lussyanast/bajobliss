const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Product', {
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'product_categories',
        key: 'category_id',
      },
    }
  },
  {
    paranoid: true,
  });
};