const Joi = require('joi');

const { auth } = require('../../handler/auth/auth.handler')

module.exports = [
  {
    method: 'POST',
    path: '/auth',
    options: {
      validate: {
        payload: Joi.object({
          identifier: Joi.string().required(),
          password: Joi.string().required()
        })
      }
    },  
    handler: auth,
  }, 
]