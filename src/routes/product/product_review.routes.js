const Joi = require('joi')

const {
  getProductReview,
  getProductReviewById,
  createProductReview,
  updateProductReview,
  deleteProductReview,
} = require('../../handler/product/product_review.handler')
const verifyToken = require('../../middleware/verifyToken')

module.exports = [
  {
    method: 'GET',
    path: '/product-reviews',
    handler: getProductReview, 
  },
  {
    method: 'GET',
    path: '/product-reviews/{id}',
    handler: getProductReviewById, 
  },
  {
    method: 'POST',
    path: '/product-reviews',
    handler: createProductReview,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          product_id: Joi.string().required(),
          order_id: Joi.string().required(),
          review: Joi.string().required(),
          rating: Joi.number().required(),
          picture: Joi.string().uri(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'PUT',
    path: '/product-reviews/{reviewId}',
    handler: updateProductReview,
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          product_id: Joi.string(),
          order_id: Joi.string(),
          review: Joi.string(),
          rating: Joi.number(),
          picture: Joi.string().uri(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'DELETE',
    path: '/product-reviews/{reviewId}',
    handler: deleteProductReview,
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    }, 
  },
]