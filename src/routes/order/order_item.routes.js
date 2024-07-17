const Joi = require('joi')

const {
  getOrderItem,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require('../../handler/order/order_item.handler')
const verifyToken = require('../../middleware/verifyToken')

module.exports = [
  {
    method: 'GET',
    path: '/order-items',
    handler: getOrderItem,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'GET',
    path: '/order-items/{id}',
    handler: getOrderItemById,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'POST',
    path: '/order-items',
    handler: createOrderItem,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          order_id: Joi.string().required(),
          product_id: Joi.string().required(),
          quantity: Joi.number().required(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'PUT',
    path: '/order-items/{orderItemId}',
    handler: updateOrderItem,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          order_id: Joi.string(),
          product_id: Joi.string(),
          quantity: Joi.number(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'DELETE',
    path: '/order-items/{orderItemId}',
    handler: deleteOrderItem,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
]