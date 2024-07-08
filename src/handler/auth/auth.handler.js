const sequelize = require('../../db/connection');
const db = sequelize.models

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const Boom = require('@hapi/boom');

const auth = async (request, h) => {
  try {
    const { identifier, password } = request.payload;

    const user = await db.User.findOne({
      where: {
        [Op.or]: [
          { user_id: identifier },
          { email: identifier },
          { user_phone: identifier }
        ]
      }
    });
    if (!user) {
      return Boom.notFound('Credentials not found');
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return Boom.unauthorized('Invalid credentials')
    }

    const token = jwt.sign({
      user_id: user.user_id,
      role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
    const tokenExpire = Math.floor((Date.now() + (60 * 60 * 1000)) / 1000);

    return h.response({ 
      message: 'Authentication success! JWT token issued.',
      role: user.role,
      token,
      expire_in: tokenExpire
      }).code(200)

  } catch (error) {
    console.error('Error during login:', error);
    return Boom.badImplementation('Internal server error')
  }
};

module.exports = { auth };
