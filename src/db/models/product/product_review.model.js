const { Sequelize, DataTypes } = require('sequelize');

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
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    picture: {
      type: DataTypes.BLOB('long'),
      allowNull: true
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
