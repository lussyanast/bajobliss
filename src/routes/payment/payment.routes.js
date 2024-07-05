const {
  getPayment,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require('../../handler/payment/payment.handler')

module.exports = [
  {
    method: 'GET',
    path: '/payments',
    handler: getPayment, 
  },
  {
    method: 'GET',
    path: '/payments/{paymentId}',
    handler: getPaymentById, 
  },
  {
    method: 'POST',
    path: '/payments',
    handler: createPayment, 
  },
  {
    method: 'PUT',
    path: '/payments/{paymentId}',
    handler: updatePayment, 
  },
  {
    method: 'DELETE',
    path: '/payments/{paymentId}',
    handler: deletePayment, 
  },
]