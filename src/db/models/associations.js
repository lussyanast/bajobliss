function associations(sequelize) {
  const {
    Feedback,
    OrderItem,
    OrderShipment,
    Order,
    Payment,
    ProductCategory,
    ProductReview,
    ProductPicture,
    ProductReviewImage,
    Product,
    UserAddress,
    UserCart,
    UserWishlist,
    User,
    Voucher,
  } = sequelize.models;

  // One-to-many: User has many user addresses
  User.hasMany(UserAddress, { foreignKey: 'user_id', as: 'addresses' });
  UserAddress.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

  // One-to-many: User has many orders
  User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
  Order.belongsTo(User, { foreignKey: 'user_id', onDelete: 'SET NULL' }); 

  // One-to-many: User has many user wishlists
  User.hasMany(UserWishlist, { foreignKey: 'user_id', as: 'wishlists' });
  UserWishlist.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

  // One-to-many: User has many user carts
  User.hasMany(UserCart, { foreignKey: 'user_id', as: 'carts' });
  UserCart.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

  // One-to-many: User has many feedbacks
  User.hasMany(Feedback, { foreignKey: 'user_id', as: 'feedbacks' });
  Feedback.belongsTo(User, { foreignKey: 'user_id', onDelete: 'SET NULL' });

  // Many-to-one: User wishlist item belongs to one product
  UserWishlist.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'SET NULL' });
  Product.hasMany(UserWishlist, { foreignKey: 'product_id' });

  // Many-to-one: User cart item belongs to one product
  UserCart.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'SET NULL' });
  Product.hasMany(UserCart, { foreignKey: 'product_id' });

  // One-to-one: Order has one payment
  Order.hasOne(Payment, { foreignKey: 'order_id' });
  Payment.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'SET NULL' });

  // One-to-one: Order has one order shipment
  Order.hasOne(OrderShipment, { foreignKey: 'order_id' });
  OrderShipment.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'SET NULL' });

  // Many-to-one: Product belongs to one product category
  Product.belongsTo(ProductCategory, { foreignKey: 'category_id', onDelete: 'SET NULL' });
  ProductCategory.hasMany(Product, { foreignKey: 'category_id', as: 'products' });

  // Many-to-one: Product picture belongs to one product
  ProductPicture.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
  Product.hasMany(ProductPicture, { foreignKey: 'product_id', as: 'pictures' });

  // One-to-many: Product has many product reviews
  Product.hasMany(ProductReview, { foreignKey: 'product_id', as: 'reviews' });
  ProductReview.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });

  // Many-to-one: Product review picture belongs to one product review
  ProductReviewImage.belongsTo(ProductReview, { foreignKey: 'product_review_id', onDelete: 'CASCADE' });
  ProductReview.hasMany(ProductReviewImage, { foreignKey: 'product_review_id', as: 'pictures' });

  // One-to-many: Order has many order items
  Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
  OrderItem.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'SET NULL' });

  // One-to-one: Order has one product review
  Order.hasOne(ProductReview, { foreignKey: 'order_id', as: 'review' });
  ProductReview.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'SET NULL' });  

  // Many-to-one: Order belongs to one voucher
  Order.belongsTo(Voucher, { foreignKey: 'voucher_id', as: 'voucher', onDelete: 'SET NULL' });
  Voucher.hasMany(Order, { foreignKey: 'voucher_id', as: 'orders' });

  // One-to-one: Order has one order shipment
  Order.hasOne(OrderShipment, { foreignKey: 'order_id', as: 'shipment' });
  OrderShipment.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'SET NULL' });

  // One-to-one: Order has one payment
  Order.hasOne(Payment, { foreignKey: 'order_id', as: 'payment'});
  Payment.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'SET NULL' });

  // Many-to-one: Order item belongs to one product
  OrderItem.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'SET NULL' });
  Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'products'});

  // One-to-one: Order shipment has one user address
  OrderShipment.hasOne(UserAddress, { foreignKey: 'address_id' });
  UserAddress.belongsTo(OrderShipment, { foreignKey: 'address_id', onDelete: 'SET NULL' });

// One-to-one: OrderShipment belongs to one voucher
  OrderShipment.belongsTo(Voucher, { foreignKey: 'voucher_id', as: 'voucher', onDelete: 'SET NULL' });
  Voucher.hasMany(OrderShipment, { foreignKey: 'voucher_id', as: 'shipments' });
}

module.exports = associations;