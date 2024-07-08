const sequelize = require('../../db/connection');
const db = sequelize.models

const getOrderItem = async (request, h) => {
  try {
    const orderItems = await db.OrderItem.findAll();
    return h.response(orderItems).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getOrderItemById = async (request, h) => {
  try {
    const { id } = request.params;
    const orderItem = await db.OrderItem.findByPk(id);
    if (!orderItem) {
      return h.response({ error: 'Order Item not found' }).code(404);
    }
    return h.response(orderItem).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createOrderItem = async (request, h) => {
  try {
    const { order_id, product_id, quantity, total_weight, total_price } = request.payload;
    const newOrderItem = await db.OrderItem.create({
      order_id,
      product_id,
      quantity,
      total_weight,
      total_price,
    });
    return h.response(newOrderItem).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateOrderItem = async (request, h) => {
  try {
    const { id } = request.params;
    const { order_id, product_id, quantity, total_weight, total_price } = request.payload;
    const [updatedCount, [updatedOrderItem]] = await db.OrderItem.update(
      { order_id, product_id, quantity, total_weight, total_price },
      { where: { order_item_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'Order Item not found' }).code(404);
    }
    return h.response(updatedOrderItem).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteOrderItem = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedOrderItem = await db.OrderItem.destroy({ where: { order_item_id: id } });
    if (deletedOrderItem === 0) {
      return h.response({ error: 'Order Item not found' }).code(404);
    }
    return h.response({ message: 'Order Item deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getOrderItem,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
