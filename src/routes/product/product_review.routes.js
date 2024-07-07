const {
  getProductReview,
  getProductReviewById,
  getProductReviewPictureById,
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
    method: 'GET',
    path: '/product-reviews/{reviewId}/picture',
    handler: getProductReviewPictureById,
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