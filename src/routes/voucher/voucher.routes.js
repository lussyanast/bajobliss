const Joi = require('joi');

const {
  getVoucher,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} = require('../../handler/voucher/voucher.handler');
const verifyToken = require('../../middleware/verifyToken');

module.exports = [
  {
    method: 'GET',
    path: '/vouchers',
    handler: getVoucher,  
  },
  {
    method: 'GET',
    path: '/vouchers/{voucherId}',
    handler: getVoucherById,
  },
  {
    method: 'POST',
    path: '/vouchers',
    handler: createVoucher,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string(),
          code: Joi.string().required(),
          discount_type: Joi.string().required(),
          value: Joi.number().required(),
          target: Joi.string().required(),
          start_date: Joi.date().required(),
          end_date: Joi.date().required(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    }, 
  },
  {
    method: 'PUT',
    path: '/vouchers/{voucherId}',
    handler: updateVoucher,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          description: Joi.string(),
          code: Joi.string(),
          discount_type: Joi.string(),
          value: Joi.number(),
          target: Joi.string(),
          start_date: Joi.date(),
          end_date: Joi.date(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    }, 
  },
  {
    method: 'DELETE',
    path: '/vouchers/{voucherId}',
    handler: deleteVoucher,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },   
  }
]