const {
  getUserAddress,
  getUserAddressById,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
} = require('../../handler/user/user_address.handler');

module.exports = [
  {
    method: 'GET',
    path: '/user-addresses',
    handler: getUserAddress, 
  },
  {
    method: 'GET',
    path: '/user-addresses/{addressId}',
    handler: getUserAddressById, 
  },
  {
    method: 'POST',
    path: '/user-addresses',
    handler: createUserAddress, 
  },
  {
    method: 'PUT',
    path: '/user-addresses/{addressId}',
    handler: updateUserAddress, 
  },
  {
    method: 'DELETE',
    path: '/user-addresses/{addressId}',
    handler: deleteUserAddress, 
  }, 
]