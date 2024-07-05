const {
  getOrderItem,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} = require('../../handler/order/order_item.handler')

module.exports = [
  {
    method: 'GET',
    path: '/order-items',
    handler: getOrderItem, 
  },
  {
    method: 'GET',
    path: '/order-items/{orderItemId}',
    handler: getOrderItemById, 
  },
  {
    method: 'POST',
    path: '/order-items',
    handler: createOrderItem, 
  },
  {
    method: 'PUT',
    path: '/order-items/{orderItemId}',
    handler: updateOrderItem, 
  },
  {
    method: 'DELETE',
    path: '/order-items/{orderItemId}',
    handler: deleteOrderItem, 
  },
]