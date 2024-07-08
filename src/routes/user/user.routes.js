const Joi = require('joi');

const {
  getUser,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
} = require('../../handler/user/user.handler');
const verifyToken = require('../../middleware/verifyToken');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: getUser,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: getUserById,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
  {
    method: 'POST',
    path: '/users',
    handler: registerUser,
    options: {
      validate: {
        payload: Joi.object({
          user_id: Joi.string().required(),
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          user_phone: Joi.string().regex(/^\+?[0-9]*$/).required(),
          password: Joi.string().min(8).required(),
          profile_pic: Joi.string().uri(),
        }),
        failAction: (request, h, err) => { throw err }
      }
    },
  },
  {
    method: 'PUT',
    path: '/users/{userId}',
    handler: updateUser,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          email: Joi.string().email(),
          user_phone: Joi.string().regex(/^\+?[0-9]*$/),
          password: Joi.string().min(8),
          profile_pic: Joi.string().uri(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/{userId}',
    handler: deleteUser,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
]