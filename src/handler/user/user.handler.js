const bcrypt = require('bcrypt');
const { jwtDecode } = require('jwt-decode')

const { Op } = require('sequelize');
const Boom = require('@hapi/boom');

const sequelize = require('../../db/connection');
const db = sequelize.models

const getUser = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const users = await db.User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    return h.response(users).code(200);
  } catch (error) {
    console.error('Error during get users:', error);
    return Boom.badImplementation('Internal server error')
  }
};

const getUserById = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { userId } = request.params;

    if (decodedToken.role === 'user' && decodedToken.user_id !== userId) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const user = await db.User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) { 
      return Boom.notFound('User not found');
    }

    return h.response(user).code(200);
  } catch (error) {
    console.error('Error during get user by id:', error);
    return Boom.badImplementation('Internal server error')
  }
};

const registerUser = async (request, h) => {
  try {
    const { user_id, name, email, user_phone, password, profile_pic } = request.payload;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.User.findOne({
      where: {
        [Op.or]: [
          { user_id },
          { email },
          { user_phone }
        ]
      }
    });
    if (existingUser) {
      let message = 'One or more fields are already taken: ';
      if (existingUser.user_id === user_id) {
        message += 'User ID, ';
      }
      if (existingUser.email === email) {
        message += 'Email, ';
      }
      if (existingUser.user_phone === user_phone) {
        message += 'Phone number, ';
      }
      message = message.slice(0, -2);

      return Boom.conflict(message); 
    }

    const newUser = {
      user_id,
      name,
      email,
      user_phone,
      password: hashedPassword,
      profile_pic,
      role: 'user',
    }
    await db.User.create(newUser);
    delete newUser.password;

    return h.response({
      message: 'User registered successfully',
      user: newUser
    }).code(201);
  } catch (error) {
    console.error('Error during register:', error);
    return Boom.badImplementation('Internal server error')
  }
};

const updateUser = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);
    
    const { userId } = request.params;
    const { name, email, user_phone, password, profile_pic } = request.payload;

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }
    
    if (decodedToken.role === 'user' && decodedToken.user_id !== userId) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const user = await db.User.findByPk(userId);
    if (!user) {
      return Boom.notFound('User not found');
    }

    const updatedUser = {
      name: name ? name : user.name, 
      email: email ? email : user.email, 
      user_phone: user_phone ? user_phone : user.user_phone, 
      password: password ? await bcrypt.hash(password, 10) : user.password,
      profile_pic: profile_pic ? profile_pic : user.profile_pic,
      updated_at: new Date().toISOString()
    }
    await user.update(updatedUser);
    delete updatedUser.password;

    return h.response({
      message: 'User updated successfully',
      user: updatedUser
    }).code(200);
  } catch (error) {
    console.error('Error during update user:', error);
    return Boom.badImplementation('Internal server error')
  }
};

const deleteUser = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { userId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }
    
    const user = await db.User.findByPk(userId);
    if (!user) {
      return Boom.notFound('User not found');
    }

    await user.destroy();
    
    return h.response({ message: 'User deleted successfully' }).code(200);
  } catch (error) {
    console.error('Error during delete user:', error);
    Boom.badImplementation('Internal server error')
  }
};

module.exports = {
  getUser,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
};
