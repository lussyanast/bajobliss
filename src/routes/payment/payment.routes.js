const Joi = require('joi')

const {
  getPayment,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require('../../handler/payment/payment.handler')
const verifyToken = require('../../middleware/verifyToken')

module.exports = [
  {
    method: 'GET',
    path: '/payments',
    handler: getPayment,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'GET',
    path: '/payments/{id}',
    handler: getPaymentById,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'POST',
    path: '/payments',
    handler: createPayment,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          order_id: Joi.string().required(),
          payment_method: Joi.string().required(),
          status: Joi.string().required(),
          merchant_id: Joi.string(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'PUT',
    path: '/payments/{paymentId}',
    handler: updatePayment,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          order_id: Joi.string(),
          payment_method: Joi.string(),
          status: Joi.string(),
          merchant_id: Joi.string(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'DELETE',
    path: '/payments/{paymentId}',
    handler: deletePayment,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
]