const Joi = require('joi');

const {
  getUser,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
} = require('../../handler/user/user.handler');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: getUser, 
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: getUserById, 
  },
  {
    method: 'POST',
    path: '/users',
    options: {
      validate: {
        payload: Joi.object({
          user_id: Joi.string().required(),
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          user_phone: Joi.string().regex(/^\+?[0-9]*$/).required(),
          password: Joi.string().min(8).required()
        })
      }
    },
    handler: registerUser,
  },
  {
    method: 'PUT',
    path: '/users/{userId}',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          email: Joi.string().email(),
          user_phone: Joi.string().regex(/^\+?[0-9]*$/),
          password: Joi.string().min(8),
          profile_pic: Joi.string().uri(),
        })
      }
    },
    handler: updateUser, 
  },
  {
    method: 'DELETE',
    path: '/users/{userId}',
    handler: deleteUser, 
  },
]