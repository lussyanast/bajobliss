const sequelize = require('../../db/connection');
const db = sequelize.models

const getUserCart = async (request, h) => {
  try {
    const userCarts = await db.UserCart.findAll();
    return h.response(userCarts).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getUserCartById = async (request, h) => {
  try {
    const { id } = request.params;
    const userCart = await db.UserCart.findByPk(id);
    if (!userCart) {
      return h.response({ error: 'User Cart not found' }).code(404);
    }
    return h.response(userCart).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createUserCart = async (request, h) => {
  try {
    const { user_id, product_id, quantity } = request.payload;
    const newUserCart = await db.UserCart.create({
      user_id,
      product_id,
      quantity,
    });
    return h.response(newUserCart).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateUserCart = async (request, h) => {
  try {
    const { id } = request.params;
    const { user_id, product_id, quantity } = request.payload;
    const [updatedCount, [updatedUserCart]] = await db.UserCart.update(
      { user_id, product_id, quantity },
      { where: { cart_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'User Cart not found' }).code(404);
    }
    return h.response(updatedUserCart).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteUserCart = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedUserCart = await db.UserCart.destroy({ where: { cart_id: id } });
    if (deletedUserCart === 0) {
      return h.response({ error: 'User Cart not found' }).code(404);
    }
    return h.response({ message: 'User Cart deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getUserCart,
  getUserCartById,
  createUserCart,
  updateUserCart,
  deleteUserCart,
};
