const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getUserCart = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const userCart = await db.UserCart.findAll();
    return h.response(userCart).code(200);
  } catch (error) {
    console.error('Error during get user carts:', error);
    return Boom.badImplementation('Internal server error')
  }
};

const getUserCartById = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { id } = request.params;
    let userCart

    userCart = await db.UserCart.findByPk(id);
    if (userCart && decodedToken.role === 'user' && decodedToken.user_id !== userCart.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }
    if (!userCart) {
      if (decodedToken.role === 'user' && decodedToken.user_id !== id) {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      userCart = await db.UserCart.findAll({ where: { user_id: id } });
      if (!userCart) {
        return Boom.notFound('User Cart not found');
      }
    }

    return h.response(userCart).code(200);
  } catch (error) {
    console.log('Error during get user cart by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createUserCart = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { user_id, product_id, quantity } = request.payload;

    if (user_id && decodedToken.role === 'user' && decodedToken.user_id !== user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    if (user_id) {
      const user = await db.User.findByPk(user_id);
      if (!user) {
        return Boom.notFound('User not found');
      }
    }

    const product = await db.Product.findByPk(product_id);
    if (!product) {
      return Boom.notFound('Product not found');
    }

    let existingUserCart = await db.UserCart.findOne({
      where: { 
        user_id: user_id ? user_id : decodedToken.user_id,
        product_id,
        quantity
      }
    });
    if (existingUserCart) {
      existingUserCart = await existingUserCart.update({
        quantity: existingUserCart.quantity + quantity
      });
      return h.response({
        message: 'User Cart updated successfully',
        userCart: existingUserCart
      }).code(200);
    }

    if (quantity > product.stock) {
      return Boom.badRequest('Quantity exceeds the available stock');
    }

    
    const newUserCart = await db.UserCart.create({
      cart_id: `uc_${nanoid()}`,
      user_id : user_id ? user_id : decodedToken.user_id,
      product_id,
      quantity,
    });

    return h.response({
      message: 'User Cart created successfully',
      userCart: newUserCart
    }).code(201);
  } catch (error) {
    console.log('Error during create user cart:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateUserCart = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { cartId } = request.params;
    const { user_id, product_id, quantity } = request.payload;

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const userCart = await db.UserCart.findByPk(cartId);
    if (!userCart) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('User Cart not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== userCart.user_id) {
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

    if (product_id) {
      const product = await db.Product.findByPk(product_id);
      if (!product) {
        return Boom.notFound('Product not found');
      }
      if (quantity && (quantity > product.stock)) {
        return Boom.badRequest('Quantity exceeds the available stock');
      }
      if (!quantity && (userCart.quantity > product.stock)) {
        return Boom.badRequest('Quantity exceeds the available stock');
      }
    }

    if (!product_id) {
      const product = await db.Product.findByPk(userCart.product_id);
      if (quantity && (quantity > product.stock)) {
        return Boom.badRequest('Quantity exceeds the available stock');
      }
    }

    const updatedUserCart = await userCart.update(
      request.payload,
      { returning: true }
    );

    return h.response({
      message: 'User Cart updated successfully',
      data: updatedUserCart
    }).code(200);
  } catch (error) {
    console.log('Error during update user cart:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteUserCart = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { cartId } = request.params;

    const userCart = await db.UserCart.findByPk(cartId);
    if (!userCart) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('User Cart not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== userCart.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    await userCart.destroy();
    return h.response({ message: 'User Cart deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete user cart:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getUserCart,
  getUserCartById,
  createUserCart,
  updateUserCart,
  deleteUserCart,
};
