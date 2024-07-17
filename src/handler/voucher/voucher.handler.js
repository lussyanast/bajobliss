const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getVoucher = async (request, h) => {
  try {
    const vouchers = await db.Voucher.findAll();
    return h.response(vouchers).code(200);
  } catch (error) {
    console.log('Error during get vouchers:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const getVoucherById = async (request, h) => {
  try {
    const { voucherId } = request.params;

    const voucher = await db.Voucher.findByPk(voucherId);
    if (!voucher) {
      return Boom.notFound('Voucher not found');
    }

    return h.response(voucher).code(200);
  } catch (error) {
    console.log('Error during get voucher by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createVoucher = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { start_date, end_date } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const newVoucher = await db.Voucher.create({
      voucher_id: `v-${nanoid()}`,
      is_active: start_date <= new Date() && end_date >= new Date(),
      ...request.payload,
    });

    return h.response({
      message: 'Voucher created successfully',
      data: newVoucher,
    }).code(201);
  } catch (error) {
    console.log('Error during create voucher:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateVoucher = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { voucherId } = request.params;
    const { start_date, end_date } = request.payload;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const voucher = await db.Voucher.findByPk(voucherId);
    if (!voucher) {
      return Boom.notFound('Voucher not found');
    }

    let isActive;
    if (start_date && end_date) {
      isActive = start_date <= new Date() && end_date >= new Date();
    } 
    if (start_date) {
      isActive = start_date <= new Date() && voucher.end_date >= new Date();
    } 
    if (end_date) {
      isActive = voucher.start_date <= new Date() && end_date >= new Date();
    }

    const updatedVoucher = await voucher.update(
      {
        is_active: isActive,
        ...request.payload,
      }, { returning: true }
    );

    return h.response({
      message: 'Voucher updated successfully',
      data: updatedVoucher,
    }).code(200);
  } catch (error) {
    console.log('Error during update voucher:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteVoucher = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { voucherId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const voucher = await db.Voucher.findByPk(voucherId);
    if (!voucher) {
      return Boom.notFound('Voucher not found');
    }

    await voucher.destroy();
    return h.response({ message: 'Voucher deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete voucher:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getVoucher,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
};
