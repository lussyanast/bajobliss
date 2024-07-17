const Joi = require('joi')

const {
  getOrderShipment,
  getOrderShipmentById,
  createOrderShipment,
  updateOrderShipment,
  deleteOrderShipment,
} = require('../../handler/order/order_shipment.handler')
const verifyToken = require('../../middleware/verifyToken')

module.exports = [
  {
    method: 'GET',
    path: '/order-shipments',
    handler: getOrderShipment,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'GET',
    path: '/order-shipments/{id}',
    handler: getOrderShipmentById,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'POST',
    path: '/order-shipments',
    handler: createOrderShipment,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          order_id: Joi.string().required(),
          address_id: Joi.string().required(),
          courier: Joi.string().required(),
          tracking_number: Joi.string(),
          cost: Joi.number().required(),
          voucher_id: Joi.string(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'PUT',
    path: '/order-shipments/{orderShipmentId}',
    handler: updateOrderShipment,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          order_id: Joi.string(),
          address_id: Joi.string(),
          courier: Joi.string(),
          tracking_number: Joi.string(),
          cost: Joi.number(),
          voucher_id: Joi.string(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'DELETE',
    path: '/order-shipments/{orderShipmentId}',
    handler: deleteOrderShipment,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
]