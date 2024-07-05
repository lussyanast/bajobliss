const {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../../handler/user/user.handler');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: getUser, 
  },
  {
    method: 'GET',
    path: '/users/{userId}',
    handler: getUserById, 
  },
  {
    method: 'PUT',
    path: '/users/{userId}',
    handler: updateUser, 
  },
  {
    method: 'DELETE',
    path: '/users/{userId}',
    handler: deleteUser, 
  },
]