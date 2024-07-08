const sequelize = require('../../db/connection');
const db = sequelize.models

const getUserAddress = async (request, h) => {
  try {
    const userAddresses = await db.UserAddress.findAll();
    return h.response(userAddresses).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getUserAddressById = async (request, h) => {
  try {
    const { id } = request.params;
    const userAddress = await db.UserAddress.findByPk(id);
    if (!userAddress) {
      return h.response({ error: 'User Address not found' }).code(404);
    }
    return h.response(userAddress).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createUserAddress = async (request, h) => {
  try {
    const { user_id, address_type, address_line_1, address_line_2, zip_code, country, address_phone } = request.payload;
    const newUserAddress = await db.UserAddress.create({
      user_id,
      address_type,
      address_line_1,
      address_line_2,
      zip_code,
      country,
      address_phone,
    });
    return h.response(newUserAddress).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateUserAddress = async (request, h) => {
  try {
    const { id } = request.params;
    const { user_id, address_type, address_line_1, address_line_2, zip_code, country, address_phone } = request.payload;
    const [updatedCount, [updatedUserAddress]] = await db.UserAddress.update(
      { user_id, address_type, address_line_1, address_line_2, zip_code, country, address_phone },
      { where: { address_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'User Address not found' }).code(404);
    }
    return h.response(updatedUserAddress).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteUserAddress = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedUserAddress = await db.UserAddress.destroy({ where: { address_id: id } });
    if (deletedUserAddress === 0) {
      return h.response({ error: 'User Address not found' }).code(404);
    }
    return h.response({ message: 'User Address deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getUserAddress,
  getUserAddressById,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
