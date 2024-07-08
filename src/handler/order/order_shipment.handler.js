const sequelize = require('../../db/connection');
const db = sequelize.models

const getOrderShipment = async (request, h) => {
  try {
    const orderShipments = await db.OrderShipment.findAll();
    return h.response(orderShipments).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getOrderShipmentById = async (request, h) => {
  try {
    const { id } = request.params;
    const orderShipment = await db.OrderShipment.findByPk(id);
    if (!orderShipment) {
      return h.response({ error: 'Order Shipment not found' }).code(404);
    }
    return h.response(orderShipment).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createOrderShipment = async (request, h) => {
  try {
    const { order_id, address_id, weight, courier, tracking_number, cost, voucher_id } = request.payload;
    const newOrderShipment = await db.OrderShipment.create({
      order_id,
      address_id,
      weight,
      courier,
      tracking_number,
      cost,
      voucher_id,
    });
    return h.response(newOrderShipment).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateOrderShipment = async (request, h) => {
  try {
    const { id } = request.params;
    const { order_id, address_id, weight, courier, tracking_number, cost, voucher_id } = request.payload;
    const [updatedCount, [updatedOrderShipment]] = await db.OrderShipment.update(
      { order_id, address_id, weight, courier, tracking_number, cost, voucher_id },
      { where: { order_shipment_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'Order Shipment not found' }).code(404);
    }
    return h.response(updatedOrderShipment).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteOrderShipment = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedOrderShipment = await db.OrderShipment.destroy({ where: { order_shipment_id: id } });
    if (deletedOrderShipment === 0) {
      return h.response({ error: 'Order Shipment not found' }).code(404);
    }
    return h.response({ message: 'Order Shipment deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getOrderShipment,
  getOrderShipmentById,
  createOrderShipment,
  updateOrderShipment,
  deleteOrderShipment,
};
