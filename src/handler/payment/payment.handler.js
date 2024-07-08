const sequelize = require('../../db/connection');
const db = sequelize.models

const getPayment = async (request, h) => {
  try {
    const payments = await db.Payment.findAll();
    return h.response(payments).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getPaymentById = async (request, h) => {
  try {
    const { id } = request.params;
    const payment = await db.Payment.findByPk(id);
    if (!payment) {
      return h.response({ error: 'Payment not found' }).code(404);
    }
    return h.response(payment).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createPayment = async (request, h) => {
  try {
    const { order_id, payment_method, status, merchant_id } = request.payload;
    const newPayment = await db.Payment.create({
      order_id,
      payment_method,
      status,
      merchant_id,
    });
    return h.response(newPayment).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updatePayment = async (request, h) => {
  try {
    const { id } = request.params;
    const { order_id, payment_method, status, merchant_id } = request.payload;
    const [updatedCount, [updatedPayment]] = await db.Payment.update(
      { order_id, payment_method, status, merchant_id },
      { where: { payment_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'Payment not found' }).code(404);
    }
    return h.response(updatedPayment).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deletePayment = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedPayment = await db.Payment.destroy({ where: { payment_id: id } });
    if (deletedPayment === 0) {
      return h.response({ error: 'Payment not found' }).code(404);
    }
    return h.response({ message: 'Payment deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getPayment,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
