const {
  getVoucher,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} = require('../../handler/voucher/voucher.handler');

module.exports = [
  {
    method: 'GET',
    path: '/vouchers',
    handler: getVoucher, 
  },
  {
    method: 'GET',
    path: '/vouchers/{voucherId}',
    handler: getVoucherById, 
  },
  {
    method: 'POST',
    path: '/vouchers',
    handler: createVoucher, 
  },
  {
    method: 'PUT',
    path: '/vouchers/{voucherId}',
    handler: updateVoucher, 
  },
  {
    method: 'DELETE',
    path: '/vouchers/{voucherId}',
    handler: deleteVoucher, 
  }
]