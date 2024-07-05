const {
  getUserWishlist,
  getUserWishlistById,
  createUserWishlist,
  updateUserWishlist,
  deleteUserWishlist,
} = require('../../handler/user/user_wishlist.handler');

module.exports = [
  {
    method: 'GET',
    path: '/user-wishlists',
    handler: getUserWishlist, 
  },
  {
    method: 'GET',
    path: '/user-wishlists/{wishlistId}',
    handler: getUserWishlistById, 
  },
  {
    method: 'POST',
    path: '/user-wishlists',
    handler: createUserWishlist, 
  },
  {
    method: 'PUT',
    path: '/user-wishlists/{wishlistId}',
    handler: updateUserWishlist, 
  },
  {
    method: 'DELETE',
    path: '/user-wishlists/{wishlistId}',
    handler: deleteUserWishlist, 
  },
]