const Joi = require('joi');

const {
  getUserAddress,
  getUserAddressById,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
} = require('../../handler/user/user_address.handler');
const verifyToken = require('../../middleware/verifyToken')

module.exports = [
  {
    method: 'GET',
    path: '/user-addresses',
    handler: getUserAddress,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },   
  },
  {
    method: 'GET',
    path: '/user-addresses/{addressId}',
    handler: getUserAddressById,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },   
  },
  {
    method: 'POST',
    path: '/user-addresses',
    handler: createUserAddress,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string().required(),
          user_name: Joi.string().required(),
          address_type: Joi.string().required(),
          address_line_1: Joi.string().required(),
          address_line_2: Joi.string(),
          zip_code: Joi.string().required(),
          country: Joi.string().required(),
          address_phone: Joi.string().required(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },  
  },
  {
    method: 'PUT',
    path: '/user-addresses/{addressId}',
    handler: updateUserAddress,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string(),
          user_name: Joi.string(),
          address_type: Joi.string(),
          address_line_1: Joi.string(),
          address_line_2: Joi.string(),
          zip_code: Joi.string(),
          country: Joi.string(),
          address_phone: Joi.string(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },    
  },
  {
    method: 'DELETE',
    path: '/user-addresses/{addressId}',
    handler: deleteUserAddress,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },   
  }, 
]