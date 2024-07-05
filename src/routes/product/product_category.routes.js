const {
  getProductCategory,
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} = require('../../handler/product/product_category.handler')

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
  },
  {
    method: 'PUT',
    path: '/product-categories/{categoryId}',
    handler: updateProductCategory, 
  },
  {
    method: 'DELETE',
    path: '/product-categories/{categoryId}',
    handler: deleteProductCategory, 
  },
]