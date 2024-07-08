const Joi = require('joi')

const {
  getOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../../handler/order/order.handler')
const verifyToken = require('../../middleware/verifyToken')

module.exports = [
  {
    method: 'GET',
    path: '/orders',
    handler: getOrder,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'GET',
    path: '/orders/{orderId}',
    handler: getOrderById,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'POST',
    path: '/orders',
    handler: createOrder,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string().required(),
          status: Joi.string().required(),
          note: Joi.string(),
          order_shipment_id: Joi.string().required(),
          voucher_id: Joi.string(),
          item_price: Joi.number().required(),
          total_price: Joi.number().required(),
          payment_id: Joi.string().required(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'PUT',
    path: '/orders/{orderId}',
    handler: updateOrder,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string(),
          status: Joi.string(),
          note: Joi.string(),
          order_shipment_id: Joi.string(),
          voucher_id: Joi.string(),
          item_price: Joi.number(),
          total_price: Joi.number(),
          payment_id: Joi.string(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'DELETE',
    path: '/orders/{orderId}',
    handler: deleteOrder,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
]  