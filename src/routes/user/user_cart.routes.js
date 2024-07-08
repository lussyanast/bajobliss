const Joi = require('joi');

const {
  getUserCart,
  getUserCartById,
  createUserCart,
  updateUserCart,
  deleteUserCart,
} = require('../../handler/user/user_cart.handler');
const verifyToken = require('../../middleware/verifyToken');

module.exports = [
  {
    method: 'GET',
    path: '/user-carts',
    handler: getUserCart, 
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },  
  },
  {
    method: 'GET',
    path: '/user-carts/{cartId}',
    handler: getUserCartById, 
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },  
  },
  {
    method: 'POST',
    path: '/user-carts',
    handler: createUserCart, 
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string().required(),
          product_id: Joi.string().required(),
          quantity: Joi.number().required(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },   
  },
  {
    method: 'PUT',
    path: '/user-carts/{cartId}',
    handler: updateUserCart, 
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string(),
          product_id: Joi.string(),
          quantity: Joi.number(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },  
  },
  {
    method: 'DELETE',
    path: '/user-carts/{cartId}',
    handler: deleteUserCart, 
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },  
  },
]