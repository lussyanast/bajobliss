const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ProductReviewImage', {
    review_picture_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    review_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'product_reviews', 
        key: 'review_id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
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
};