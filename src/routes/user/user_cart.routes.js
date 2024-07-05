const {
  getUserCart,
  getUserCartById,
  createUserCart,
  updateUserCart,
  deleteUserCart,
} = require('../../handler/user/user_cart.handler');

module.exports = [
  {
    method: 'GET',
    path: '/user-carts',
    handler: getUserCart, 
  },
  {
    method: 'GET',
    path: '/user-carts/{cartId}',
    handler: getUserCartById, 
  },
  {
    method: 'POST',
    path: '/user-carts',
    handler: createUserCart, 
  },
  {
    method: 'PUT',
    path: '/user-carts/{cartId}',
    handler: updateUserCart, 
  },
  {
    method: 'DELETE',
    path: '/user-carts/{cartId}',
    handler: deleteUserCart, 
  },
]