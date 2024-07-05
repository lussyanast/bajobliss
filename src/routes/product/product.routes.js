module.exports = [
  {
    method: 'GET',
    path: '/products',
    handler: () => "null", 
  },
  {
    method: 'GET',
    path: '/products/{productId}',
    handler: () => "null", 
  },
  {
    method: 'POST',
    path: '/products',
    handler: () => "null", 
  },
  {
    method: 'PUT',
    path: '/products/{productId}',
    handler: () => "null", 
  },
  {
    method: 'DELETE',
    path: '/products/{productId}',
    handler: () => "null", 
  },
]