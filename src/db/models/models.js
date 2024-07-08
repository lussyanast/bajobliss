const associations = require('./associations');

async function syncDatabase(sequelize) {
  try {
    const models = [
      require('./feedback/feedback.model'),
      require('./order/order_item.model'),
      require('./order/order_shipment.model'),
      require('./order/order.model'),
      require('./payment/payment.model'),
      require('./product/product_category.model'),
      require('./product/product_review.model'),
      require('./product/product_review_picture.model'),
      require('./product/product_picture.model'),
      require('./product/product.model'),
      require('./user/user_address.model'),
      require('./user/user_cart.model'),
      require('./user/user_wishlist.model'),
      require('./user/user.model'),
      require('./voucher/voucher.model'),
    ];

    for (const model of models) {
      model(sequelize);
    }
    associations(sequelize);

    if (process.env.NODE_ENV.trim() === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database & tables synchronized!');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = syncDatabase;