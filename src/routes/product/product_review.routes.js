const Joi = require('joi')

const {
  getProductReview,
  getProductReviewById,
  getProductReviewPictureById,
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
    method: 'GET',
    path: '/product-reviews/picture/{id}',
    handler: getProductReviewPictureById,
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
          user_id: Joi.string().uri().required(),
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
          product_id: Joi.string().required(),
          user_id: Joi.string().uri().required(),
          review: Joi.string().required(),
          rating: Joi.number().required(),
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