const Joi = require('joi')

const {
  getProduct,
  getProductById,
  getProductPictureById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../../handler/product/product.handler')
const verifyToken = require('../../middleware/verifyToken')

module.exports = [
  {
    method: 'GET',
    path: '/products',
    handler: getProduct, 
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: getProductById, 
  },
  {
    method: 'GET',
    path: '/products/picture/{id}',
    handler: getProductPictureById,
  },
  {
    method: 'POST',
    path: '/products',
    handler: createProduct,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string(),
          price: Joi.number().required(),
          stock: Joi.number().required(),
          weight: Joi.number().required(),
          category_id: Joi.string().required(),
          picture: Joi.string().uri(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'PUT',
    path: '/products/{productId}',
    handler: updateProduct,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          description: Joi.string(),
          price: Joi.number(),
          stock: Joi.number(),
          weight: Joi.number(),
          category_id: Joi.string(),
          picture: Joi.string().uri(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'DELETE',
    path: '/products/{productId}',
    handler: deleteProduct,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
]