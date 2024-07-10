const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getUserAddress = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const userAddresses = await db.UserAddress.findAll();
    return h.response(userAddresses).code(200);
  } catch (error) {
    console.error('Error during get user addresses:', error);
    return Boom.badImplementation('Internal server error')
  }
};

const getUserAddressById = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { id } = request.params;
    let userAddress;

    userAddress = await db.UserAddress.findByPk(id);
    if (!userAddress) {
      if (decodedToken.role === 'user' && decodedToken.user_id !== id) {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      userAddress = await db.UserAddress.findAll({ where: { user_id: id } });
      if (!userAddress) {
        return Boom.notFound('User Address not found');
      }
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== userAddress.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    return h.response(userAddress).code(200);
  } catch (error) {
    console.log('Error during get user address by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createUserAddress = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { user_id } = request.payload;

    if (decodedToken.role === 'user' && decodedToken.user_id !== user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const user = await db.User.findByPk(user_id);
    if (!user) {
      return Boom.notFound('User not found');
    }

    const newUserAddress = await db.UserAddress.create({
      address_id: `ua-${nanoid()}`,
      ...request.payload,
    });

    return h.response({
      message: 'User Address created successfully',
      data: newUserAddress,
    }).code(201);
  } catch (error) {
    console.log('Error during create user address:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateUserAddress = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { addressId } = request.params;
    const { user_id } = request.payload;

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const userAddress = await db.UserAddress.findByPk(addressId);
    if (!userAddress) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('User Address not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== userAddress.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    if (user_id) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource')
      }
      
      const user = await db.User.findByPk(user_id);
      if (!user) {
        return Boom.notFound('User not found');
      }
    }

    const updatedUserAddress = await userAddress.update({
      ...request.payload,
      updated_at: new Date().toISOString(),
    }, { returning: true });

    return h.response({
      message: 'User Address updated successfully',
      data: updatedUserAddress,
    }).code(200);
  } catch (error) {
    console.log('Error during update user address:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteUserAddress = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { addressId } = request.params;

    const userAddress = await db.UserAddress.findByPk(addressId);
    if (!userAddress) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('User Address not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== userAddress.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    await userAddress.destroy();

    return h.response({ message: 'User Address deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete user address:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getUserAddress,
  getUserAddressById,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
