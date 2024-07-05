const {
  getOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../../handler/order/order.handler')

module.exports = [
  {
    method: 'GET',
    path: '/orders',
    handler: getOrder, 
  },
  {
    method: 'GET',
    path: '/orders/{orderId}',
    handler: getOrderById, 
  },
  {
    method: 'POST',
    path: '/orders',
    handler: createOrder, 
  },
  {
    method: 'PUT',
    path: '/orders/{orderId}',
    handler: updateOrder, 
  },
  {
    method: 'DELETE',
    path: '/orders/{orderId}',
    handler: deleteOrder, 
  },
]  