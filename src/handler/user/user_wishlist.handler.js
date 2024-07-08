const sequelize = require('../../db/connection');
const db = sequelize.models

const getUserWishlist = async (request, h) => {
  try {
    const userWishlists = await db.UserWishlist.findAll();
    return h.response(userWishlists).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getUserWishlistById = async (request, h) => {
  try {
    const { id } = request.params;
    const userWishlist = await db.UserWishlist.findByPk(id);
    if (!userWishlist) {
      return h.response({ error: 'User Wishlist not found' }).code(404);
    }
    return h.response(userWishlist).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createUserWishlist = async (request, h) => {
  try {
    const { user_id, product_id } = request.payload;
    const newUserWishlist = await db.UserWishlist.create({
      user_id,
      product_id,
    });
    return h.response(newUserWishlist).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateUserWishlist = async (request, h) => {
  try {
    const { id } = request.params;
    const { user_id, product_id } = request.payload;
    const [updatedCount, [updatedUserWishlist]] = await db.UserWishlist.update(
      { user_id, product_id },
      { where: { wishlist_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'User Wishlist not found' }).code(404);
    }
    return h.response(updatedUserWishlist).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteUserWishlist = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedUserWishlist = await db.UserWishlist.destroy({ where: { wishlist_id: id } });
    if (deletedUserWishlist === 0) {
      return h.response({ error: 'User Wishlist not found' }).code(404);
    }
    return h.response({ message: 'User Wishlist deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getUserWishlist,
  getUserWishlistById,
  createUserWishlist,
  updateUserWishlist,
  deleteUserWishlist,
};
