const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getUserWishlist = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const userWishlists = await db.UserWishlist.findAll();
    return h.response(userWishlists).code(200);
  } catch (error) {
    console.error('Error during get user wishlists:', error);
    return Boom.badImplementation('Internal server error')
  }
};

const getUserWishlistById = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { id } = request.params;
    let userWishlist

    userWishlist = await db.UserWishlist.findByPk(id);
    if (!userWishlist) {
      if (decodedToken.role === 'user' && decodedToken.user_id !== id) {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      userWishlist = await db.UserWishlist.findAll({ where: { user_id: id } });
      if (!userWishlist) {
        return Boom.notFound('User Wishlist not found');
      }
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== userWishlist.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    return h.response(userWishlist).code(200);
  } catch (error) {
    console.log('Error during get user wishlist by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createUserWishlist = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { user_id, product_id } = request.payload;

    if (decodedToken.role === 'user' && decodedToken.user_id !== user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const user = await db.User.findByPk(user_id);
    if (!user) {
      return Boom.notFound('User not found');
    }

    const product = await db.Product.findByPk(product_id);
    if (!product) {
      return Boom.notFound('Product not found');
    }

    const existingUserWishlist = await db.UserWishlist.findOne({
      where: { user_id, product_id }
    });
    if (existingUserWishlist) {
      return Boom.conflict('User Wishlist already exists');
    }

    const newUserWishlist = await db.UserWishlist.create({
      wishlist_id: `uw_${nanoid()}`,
      ...request.payload,
    });

    return h.response({
      message: 'User Wishlist created successfully',
      data: newUserWishlist
    }).code(201);
  } catch (error) {
    console.log('Error during create user wishlist:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateUserWishlist = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { wishlistId } = request.params;
    const { user_id, product_id } = request.payload;

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const userWishlist = await db.UserWishlist.findByPk(wishlistId);
    if (!userWishlist) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('User Wishlist not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== userWishlist.user_id) {
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
    }

    const updatedUserWishlist = await userWishlist.update({
      ...request.payload,
      updated_at: new Date().toISOString(),
    }, { returning: true });

    return h.response({
      message: 'User Wishlist updated successfully',
      data: updatedUserWishlist[1][0].get()
    }).code(200);
  } catch (error) {
    console.log('Error during update user wishlist:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteUserWishlist = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { wishlistId } = request.params;

    const userWishlist = await db.UserWishlist.findByPk(wishlistId);
    if (!userWishlist) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('User Wishlist not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== userWishlist.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    await userWishlist.destroy();
    return h.response({ message: 'User Wishlist deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete user wishlist:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getUserWishlist,
  getUserWishlistById,
  createUserWishlist,
  updateUserWishlist,
  deleteUserWishlist,
};
