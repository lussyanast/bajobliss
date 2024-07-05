const {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../../handler/product/product.handler')

module.exports = [
  {
    method: 'GET',
    path: '/products',
    handler: getProduct, 
  },
  {
    method: 'GET',
    path: '/products/{productId}',
    handler: getProductById, 
  },
  {
    method: 'POST',
    path: '/products',
    handler: createProduct, 
  },
  {
    method: 'PUT',
    path: '/products/{productId}',
    handler: updateProduct, 
  },
  {
    method: 'DELETE',
    path: '/products/{productId}',
    handler: deleteProduct, 
  },
]