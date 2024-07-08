const Joi = require('joi')

const {
  getProductCategory,
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} = require('../../handler/product/product_category.handler')
const verifyToken = require('../../middleware/verifyToken')

module.exports = [
  {
    method: 'GET',
    path: '/product-categories',
    handler: getProductCategory, 
  },
  {
    method: 'GET',
    path: '/product-categories/{categoryId}',
    handler: getProductCategoryById, 
  },
  {
    method: 'POST',
    path: '/product-categories',
    handler: createProductCategory,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          icon: Joi.string().uri(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'PUT',
    path: '/product-categories/{categoryId}',
    handler: updateProductCategory,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          name: Joi.string(),
          icon: Joi.string().uri(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    }, 
  },
  {
    method: 'DELETE',
    path: '/product-categories/{categoryId}',
    handler: deleteProductCategory,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
]