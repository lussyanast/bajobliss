const { 
  registerUser,
  loginUser,
  getUserData,
  logoutUser
} = require('../../handler/auth/auth.handler')

module.exports = [
  {
    method: 'POST',
    path: '/auth/login',
    handler: loginUser, 
  }, 
  {
    method: 'POST',
    path: '/auth/register',
    handler: registerUser, 
  },
  {
    method: 'POST',
    path: '/auth/me',
    handler: () => getUserData, 
  },
  {
    method: 'POST',
    path: '/auth/logout',
    handler: () => logoutUser, 
  },
]