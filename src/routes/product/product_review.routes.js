const {
  getProductReview,
  getProductReviewById,
  createProductReview,
  updateProductReview,
  deleteProductReview,
} = require('../../handler/product/product_review.handler')

module.exports = [
  {
    method: 'GET',
    path: '/product-reviews',
    handler: getProductReview, 
  },
  {
    method: 'GET',
    path: '/product-reviews/{reviewId}',
    handler: getProductReviewById, 
  },
  {
    method: 'POST',
    path: '/product-reviews',
    handler: createProductReview, 
  },
  {
    method: 'PUT',
    path: '/product-reviews/{reviewId}',
    handler: updateProductReview, 
  },
  {
    method: 'DELETE',
    path: '/product-reviews/{reviewId}',
    handler: deleteProductReview, 
  },
]