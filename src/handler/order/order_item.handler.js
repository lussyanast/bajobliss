const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getOrderItem = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }
    
    const orderItems = await db.OrderItem.findAll();
    return h.response(orderItems).code(200);
  } catch (error) {
    console.log('Error while getting order items', error);
    return Boom.badImplementation('Error while getting order items');
  }
};

const getOrderItemById = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);
    
    const { id } = request.params;
    let orderItem;
    let order;

    orderItem = await db.OrderItem.findByPk(id);
    if (orderItem) {
      order = await db.Order.findByPk(orderItem.order_id);
      if (order && decodedToken.role === 'user' && decodedToken.user_id !== order.user_id) {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
    }
    if (!orderItem) {
      if (decodedToken.role === 'user' && decodedToken.user_id !== id) {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      orderItem = await db.OrderItem.findAll({ where: { user_id: id } });
      if (!orderItem) {
        return Boom.notFound('Order Item not found');
      }
    }

    return h.response(orderItem).code(200);
  } catch (error) {
    console.log('Error during get order item by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createOrderItem = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { order_id, product_id, quantity } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    const order = await db.Order.findByPk(order_id);
    if (!order) {
      return Boom.notFound('Order not found');
    }

    const product = await db.Product.findByPk(product_id);
    if (!product) {
      return Boom.notFound('Product not found');
    }

    const orderItem = await db.OrderItem.create({
      order_item_id: `oi_${nanoid()}`,
      order_id,
      product_id,
      quantity,
      total_price: product.price * quantity,
      total_weight: product.weight * quantity,
    });

    if (quantity > product.stock) {
      return Boom.badRequest('Stock not enough');
    }

    await db.Product.update(
      { stock: product.stock - quantity }, 
      { where: { product_id }}
    );

    return h.response({
      message: 'Order Item created successfully',
      data: orderItem,
    }).code(201);
  } catch (error) {
    console.log('Error during create order item:', error);
    return Boom.badImplementation('Internal server error');
    }
};

const updateOrderItem = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { orderShipmentId } = request.params;
    const { order_id, product_id, quantity } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const orderItem = await db.OrderItem.findByPk(orderShipmentId);
    if (!orderItem) {
      return h.response({ error: 'Order Item not found' }).code(404);
    }

    let product = await db.Product.findByPk(orderItem.product_id);
    if (product_id) {
      product = await db.Product.findByPk(product_id);
      if (!product) {
        return Boom.notFound('Product not found');
      }
    }

    if (order_id) {
      const order = await db.Order.findByPk(order_id);
      if (!order) {
        return Boom.notFound('Order not found');
      }
    }

    let updateData = { ...request.payload };
    if (product_id || quantity) {
      updateData.total_price = product.price * quantity;
      updateData.total_weight = product.weight * quantity;
    }

    const updatedOrderItem = await orderItem.update(updateData, { returning: true });

    if (quantity) {
      const oldStock = product.stock;
      const newStock = quantity;

      if (newStock > oldStock) {
        const diff = newStock - oldStock;
        await db.Product.update(
          { stock: oldStock - diff },
          { where: { product_id } }
        );
      } else if (newStock < oldStock) {
        const diff = oldStock - newStock;
        await db.Product.update(
          { stock: oldStock + diff },
          { where: { product_id } }
        );
      }
    }

    return h.response({
      message: 'Order Item updated successfully',
      data: updatedOrderItem,
    }).code(200);
  } catch (error) {
    console.log('Error during update order item:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteOrderItem = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { orderShipmentId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    const orderItem = await db.OrderItem.findByPk(orderShipmentId);
    if (!orderItem) {
      return h.response({ error: 'Order Item not found' }).code(404);
    }

    await orderItem.destroy();
    return h.response({ message: 'Order Item deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete order item:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getOrderItem,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
