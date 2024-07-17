const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getOrderShipment = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    const orderShipment = await db.OrderShipment.findAll();
    return h.response(orderShipment).code(200);
  } catch (error) {
    console.log('Error while getting order shipments', error);
    return Boom.badImplementation('Error while getting order shipments');
  }
};

const getOrderShipmentById = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);
    
    const { id } = request.params;
    let orderShipment;
    let order;

    orderShipment = await db.OrderShipment.findByPk(id);
    if (orderShipment) {
      order = await db.Order.findByPk(orderShipment.order_id);
      if (order && decodedToken.role === 'user' && decodedToken.user_id !== order.user_id) {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
    }
    if (!orderShipment) {
      if (decodedToken.role === 'user' && decodedToken.user_id !== id) {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      orderShipment = await db.OrderShipment.findAll({ where: { user_id: id } });
      if (!orderShipment) {
        return Boom.notFound('Order Shipment not found');
      }
    }

    return h.response(orderShipment).code(200);
  } catch (error) {
    console.log('Error during get order shipment by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createOrderShipment = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { order_id, address_id, voucher_id, ...payload } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    const order = await db.Order.findByPk(order_id);
    if (!order) {
      return Boom.notFound('Order not found');
    }

    const orderItem = await db.OrderItem.findAll({ where: { order_id } });
    const totalWeight = orderItem.reduce((acc, item) => acc + item.total_weight, 0);

    const address = await db.Address.findByPk(address_id);
    if (!address) {
      return Boom.notFound('Address not found');
    }

    const voucher = await db.Voucher.findByPk(voucher_id);
    if (!voucher) {
      return Boom.notFound('Voucher not found');
    }
    
    const orderShipment = await db.OrderShipment.create({
      order_shipment_id: `shipment_${nanoid()}`,
      order_id,
      address_id,
      weight: totalWeight,
      voucher_id,
      ...payload,
    });
    return h.response(orderShipment).code(201);
  } catch (error) {
    console.log('Error during create order shipment:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateOrderShipment = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { orderShipmentId } = request.params;
    const { order_id, address_id, voucher_id, ...payload } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const orderShipment = await db.OrderShipment.findByPk(orderShipmentId);
    if (!orderShipment) {
      return Boom.notFound('Order Shipment not found');
    }

    let totalWeight
    if (order_id) {
      const order = await db.Order.findByPk(order_id);
      if (!order) {
        return Boom.notFound('Order not found');
      }

      const orderItem = await db.OrderItem.findAll({ where: { order_id } });
      totalWeight = orderItem.reduce((acc, item) => acc + item.total_weight, 0);
    }

    if (address_id) {
      const address = await db.Address.findByPk(address_id);
      if (!address) {
        return Boom.notFound('Address not found');
      }
    }

    if (voucher_id) {
      const voucher = await db.Voucher.findByPk(voucher_id);
      if (!voucher) {
        return Boom.notFound('Voucher not found');
      }
    }

    const updatedOrderShipment = await orderShipment.update(
      { 
        order_id, 
        address_id, 
        weight: totalWeight, 
        voucher_id,
        ...payload 
      },
      { returning: true }
    );

    return h.response({
      message: 'Order Shipment updated successfully',
      data: updatedOrderShipment,
    }).code(200);
  } catch (error) {
    console.log('Error during update order shipment:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteOrderShipment = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { orderShipmentId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    const orderShipment = await db.OrderShipment.findByPk(orderShipmentId);
    if (!orderShipment) {
      return Boom.notFound('Order Shipment not found');
    }

    await orderShipment.destroy();
    return h.response({ message: 'Order Shipment deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete order shipment:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getOrderShipment,
  getOrderShipmentById,
  createOrderShipment,
  updateOrderShipment,
  deleteOrderShipment,
};
