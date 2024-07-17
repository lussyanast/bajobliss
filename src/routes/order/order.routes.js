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
    path: '/orders/{id}',
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
          user_id: Joi.string(),
          item: Joi.array().items(Joi.object({
            product_id: Joi.string().required(),
            quantity: Joi.number().required(),
            note: Joi.string(),
          })).required(),
          shipment: Joi.object({
            address_id: Joi.string().required(),
            courier: Joi.string().required(),
            cost: Joi.number().required(),
          }).required(),
          voucher_id: Joi.string(),
          payment: {
            method: Joi.string().required(),
            merchant_id: Joi.string(),
          },
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
          item: Joi.array().items(Joi.object({
            product_id: Joi.string(),
            quantity: Joi.number(),
            note: Joi.string(),
          })),
          shipment: Joi.object({
            address_id: Joi.string(),
            courier: Joi.string(),
            cost: Joi.number(),
          }),
          voucher_id: Joi.string(),
          payment: {
            method: Joi.string(),
            merchant_id: Joi.string(),
          },
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