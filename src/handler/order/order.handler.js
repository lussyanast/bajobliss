const sequelize = require('../../db/connection');
const db = sequelize.models

const getOrder = async (request, h) => {
  try {
    const orders = await db.Order.findAll();
    return h.response(orders).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getOrderById = async (request, h) => {
  try {
    const { id } = request.params;
    const order = await db.Order.findByPk(id);
    if (!order) {
      return h.response({ error: 'Order not found' }).code(404);
    }
    return h.response(order).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createOrder = async (request, h) => {
  try {
    const { user_id, status, note, order_shipment_id, voucher_id, item_price, total_price, payment_id } = request.payload;
    const newOrder = await db.Order.create({
      user_id,
      status,
      note,
      order_shipment_id,
      voucher_id,
      item_price,
      total_price,
      payment_id,
    });
    return h.response(newOrder).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateOrder = async (request, h) => {
  try {
    const { id } = request.params;
    const { user_id, status, note, order_shipment_id, voucher_id, item_price, total_price, payment_id } = request.payload;
    const [updatedCount, [updatedOrder]] = await db.Order.update(
      { user_id, status, note, order_shipment_id, voucher_id, item_price, total_price, payment_id },
      { where: { order_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'Order not found' }).code(404);
    }
    return h.response(updatedOrder).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteOrder = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedOrder = await db.Order.destroy({ where: { order_id: id } });
    if (deletedOrder === 0) {
      return h.response({ error: 'Order not found' }).code(404);
    }
    return h.response({ message: 'Order deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
