const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('ProductReviewPicture', {
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
  }, 
  {
    paranoid: true,
  });
};