import api from './config.api';

export const userAPI = {
  getUsers: () => api.get('/users'),
  getUser: (userId) => api.get(`/users/${userId}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (userId, userData) => api.put(`/users/${userId}`, userData),
  deleteUser: (userId) => api.delete(`/users/${userId}`),
};

export const userAddressAPI = {
  getUserAddresses: () => api.get('/user-addresses'),
  getUserAddress: (id) => api.get(`/user-addresses/${id}`),
  createUserAddress: (addressData) => api.post('/user-addresses', addressData),
  updateUserAddress: (addressId, addressData) => api.put(`/user-addresses/${addressId}`, addressData),
  deleteUserAddress: (addressId) => api.delete(`/user-addresses/${addressId}`),
};

export const userWishlistAPI = {
  getUserWishlists: () => api.get('/user-wishlists'),
  getUserWishlist: (id) => api.get(`/user-wishlists/${id}`),
  createUserWishlist: (wishlistData) => api.post('/user-wishlists', wishlistData),
  updateUserWishlist: (wishlistId, wishlistData) => api.put(`/user-wishlists/${wishlistId}`, wishlistData),
  deleteUserWishlist: (wishlistId) => api.delete(`/user-wishlists/${wishlistId}`),
};

export const userCartAPI = {
  getUserCarts: () => api.get('/user-carts'),
  getUserCart: (id) => api.get(`/user-carts/${id}`),
  createUserCart: (cartData) => api.post('/user-carts', cartData),
  updateUserCart: (cartId, cartData) => api.put(`/user-carts/${cartId}`, cartData),
  deleteUserCart: (cartId) => api.delete(`/user-carts/${cartId}`),
};

export const productAPI = {
  getProducts: () => api.get('/products'),
  searchProducts: (query) => api.get(`/products?name=${query}`),
  createProduct: (productData) => api.post('/products', productData),
  getProduct: (id) => api.get(`/products/${id}`),
  updateProduct: (productId, productData) => api.put(`/products/${productId}`, productData),
  deleteProduct: (productId) => api.delete(`/products/${productId}`),
};

export const productCategoryAPI = {
  getCategories: () => api.get('/product-categories'),
  createCategory: (categoryData) => api.post('/product-categories', categoryData),
  getCategory: (categoryId) => api.get(`/product-categories/${categoryId}`),
  updateCategory: (categoryId, categoryData) => api.put(`/product-categories/${categoryId}`, categoryData),
  deleteCategory: (categoryId) => api.delete(`/product-categories/${categoryId}`),
};

export const productReviewAPI = {
  getReviews: () => api.get('/product-reviews'),
  getReview: (id) => api.get(`/product-reviews/${id}`),
  createReview: (reviewData) => api.post('/product-reviews', reviewData),
  updateReview: (reviewId, reviewData) => api.put(`/product-reviews/${reviewId}`, reviewData),
  deleteReview: (reviewId) => api.delete(`/product-reviews/${reviewId}`),
};

export const authAPI = {
  login: (credentials) => api.post('/auth', credentials),
};

export const orderAPI = {
  getOrders: () => api.get('/orders'),
  getOrder: (orderId) => api.get(`/orders/${orderId}`),
  createOrder: (orderData) => api.post('/orders', orderData),
  updateOrder: (orderId, orderData) => api.put(`/orders/${orderId}`, orderData),
  deleteOrder: (orderId) => api.delete(`/orders/${orderId}`),
};

export const orderItemAPI = {
  getOrderItems: () => api.get('/order-items'),
  getOrderItem: (orderItemId) => api.get(`/order-items/${orderItemId}`),
  createOrderItem: (orderItemData) => api.post('/order-items', orderItemData),
  updateOrderItem: (orderItemId, orderItemData) => api.put(`/order-items/${orderItemId}`, orderItemData),
  deleteOrderItem: (orderItemId) => api.delete(`/order-items/${orderItemId}`),
};

export const orderShipmentAPI = {
  getOrderShipments: () => api.get('/order-shipments'),
  getOrderShipment: (shipmentId) => api.get(`/order-shipments/${shipmentId}`),
  createOrderShipment: (shipmentData) => api.post('/order-shipments', shipmentData),
  updateOrderShipment: (shipmentId, shipmentData) => api.put(`/order-shipments/${shipmentId}`, shipmentData),
  deleteOrderShipment: (shipmentId) => api.delete(`/order-shipments/${shipmentId}`),
};

export const paymentAPI = {
  getPayments: () => api.get('/payments'),
  getPayment: (paymentId) => api.get(`/payments/${paymentId}`),
  createPayment: (paymentData) => api.post('/payments', paymentData),
  updatePayment: (paymentId, paymentData) => api.put(`/payments/${paymentId}`, paymentData),
  deletePayment: (paymentId) => api.delete(`/payments/${paymentId}`),
};

export const feedbackAPI = {
  getFeedbacks: () => api.get('/feedbacks'),
  getFeedback: (id) => api.get(`/feedbacks/${id}`),
  createFeedback: (feedbackData) => api.post('/feedbacks', feedbackData),
  updateFeedback: (feedbackId, feedbackData) => api.put(`/feedbacks/${feedbackId}`, feedbackData),
  deleteFeedback: (feedbackId) => api.delete(`/feedbacks/${feedbackId}`),
};

export const voucherAPI = {
  getVouchers: () => api.get('/vouchers'),
  getVoucher: (voucherId) => api.get(`/vouchers/${voucherId}`),
  createVoucher: (voucherData) => api.post('/vouchers', voucherData),
  updateVoucher: (voucherId, voucherData) => api.put(`/vouchers/${voucherId}`, voucherData),
  deleteVoucher: (voucherId) => api.delete(`/vouchers/${voucherId}`),
};
