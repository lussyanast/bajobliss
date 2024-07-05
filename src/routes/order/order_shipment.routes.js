const {
  getOrderShipment,
  getOrderShipmentById,
  createOrderShipment,
  updateOrderShipment,
  deleteOrderShipment,
} = require('../../handler/order/order_shipment.handler')

module.exports = [
  {
    method: 'GET',
    path: '/order-shipments',
    handler: getOrderShipment, 
  },
  {
    method: 'GET',
    path: '/order-shipments/{orderShipmentId}',
    handler: getOrderShipmentById, 
  },
  {
    method: 'POST',
    path: '/order-shipments',
    handler: createOrderShipment, 
  },
  {
    method: 'PUT',
    path: '/order-shipments/{orderShipmentId}',
    handler: updateOrderShipment, 
  },
  {
    method: 'DELETE',
    path: '/order-shipments/{orderShipmentId}',
    handler: deleteOrderShipment, 
  },
]