const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getPayment = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }
    
    const payments = await db.Payment.findAll();
    return h.response(payments).code(200);
  } catch (error) {
    console.log('Error while getting payments', error);
    return Boom.badImplementation('Error while getting payments');
    }
};

const getPaymentById = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { id } = request.params;
    let payment;

    payment = await db.Payment.findByPk(id);
    if (payment && decodedToken.role === 'user' && decodedToken.user_id !== payment.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }
    if (!payment) {
      if (decodedToken.role === 'user' && decodedToken.user_id !== id) {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      payment = await db.Payment.findAll({ where: { user_id: id } });
      if (!payment) {
        return Boom.notFound('Payment not found');
      }
    }

    return h.response(payment).code(200);
  } catch (error) {
    console.log('Error during get payment by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createPayment = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { order_id } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    const order = await db.Order.findByPk(order_id);
    if (!order) {
      return Boom.notFound('Order not found');
    }

    const newPayment = await db.Payment.create({
      payment_id: `payment_${nanoid()}`,
      ...request.payload,
    });

    return h.response({
      message: 'Payment created successfully',
      payment: newPayment,
    }).code(201);
  } catch (error) {
    console.log('Error during create payment:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updatePayment = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { paymentId } = request.params;
    const { order_id } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const payment = await db.Payment.findByPk(paymentId);
    if (!payment) {
      return Boom.notFound('Payment not found');
    }

    if (order_id) {
      const order = await db.Order.findByPk(order_id);
      if (!order) {
        return Boom.notFound('Order not found');
      }
    }

    const updatedPayment = await payment.update(
      request.payload,
      { returning: true }
    );

    return h.response({
      message: 'Payment updated successfully',
      payment: updatedPayment
    }).code(200);

  } catch (error) {
    console.log('Error during update payment:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deletePayment = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { paymentId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this route');
    }

    const payment = await db.Payment.findByPk(paymentId);
    if (!payment) {
      return Boom.notFound('Payment not found');
    }

    await payment.destroy();

    return h.response({
      message: 'Payment deleted successfully',
      payment
    }).code(200);
  } catch (error) {
    console.log('Error during delete payment:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getPayment,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
