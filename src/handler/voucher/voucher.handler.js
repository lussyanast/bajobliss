const sequelize = require('../../db/connection');
const db = sequelize.models

const getVoucher = async (request, h) => {
  try {
    const vouchers = await db.Voucher.findAll();
    return h.response(vouchers).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getVoucherById = async (request, h) => {
  try {
    const { id } = request.params;
    const voucher = await db.Voucher.findByPk(id);
    if (!voucher) {
      return h.response({ error: 'Voucher not found' }).code(404);
    }
    return h.response(voucher).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createVoucher = async (request, h) => {
  try {
    const { name, description, code, discount_type, value, target, start_date, end_date, is_active } = request.payload;
    const newVoucher = await db.Voucher.create({
      name,
      description,
      code,
      discount_type,
      value,
      target,
      start_date,
      end_date,
      is_active,
    });
    return h.response(newVoucher).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateVoucher = async (request, h) => {
  try {
    const { id } = request.params;
    const { name, description, code, discount_type, value, target, start_date, end_date, is_active } = request.payload;
    const [updatedCount, [updatedVoucher]] = await db.Voucher.update(
      { name, description, code, discount_type, value, target, start_date, end_date, is_active },
      { where: { voucher_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'Voucher not found' }).code(404);
    }
    return h.response(updatedVoucher).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteVoucher = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedVoucher = await db.Voucher.destroy({ where: { voucher_id: id } });
    if (deletedVoucher === 0) {
      return h.response({ error: 'Voucher not found' }).code(404);
    }
    return h.response({ message: 'Voucher deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getVoucher,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
};
