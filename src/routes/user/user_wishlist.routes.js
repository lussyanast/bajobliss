const Joi = require('joi');

const {
  getUserWishlist,
  getUserWishlistById,
  createUserWishlist,
  updateUserWishlist,
  deleteUserWishlist,
} = require('../../handler/user/user_wishlist.handler');
const verifyToken = require('../../middleware/verifyToken');

module.exports = [
  {
    method: 'GET',
    path: '/user-wishlists',
    handler: getUserWishlist,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },  
  },
  {
    method: 'GET',
    path: '/user-wishlists/{id}',
    handler: getUserWishlistById,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },  
  },
  {
    method: 'POST',
    path: '/user-wishlists',
    handler: createUserWishlist,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string(),
          product_id: Joi.string().required(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },    
  },
  {
    method: 'PUT',
    path: '/user-wishlists/{wishlistId}',
    handler: updateUserWishlist,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string(),
          product_id: Joi.string(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },   
  },
  {
    method: 'DELETE',
    path: '/user-wishlists/{wishlistId}',
    handler: deleteUserWishlist, 
    config: {
      auth: 'jwt',
      pre: [verifyToken]
    },  
  },
]