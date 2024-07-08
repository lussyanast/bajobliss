const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

const verifyToken = (request, h) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    return Boom.unauthorized('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.auth.credentials = decoded;
    
    return h.continue;
  } catch {
    return Boom.unauthorized('Invalid token');
  }
};

module.exports = verifyToken;