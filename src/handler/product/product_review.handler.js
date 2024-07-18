const { Op } = require('sequelize');
const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getProductReview = async (request, h) => {
  try {
    const productReviews = await db.ProductReview.findAll();

    return h.response(productReviews).code(200);
  } catch (error) {
    console.log('Error during get product reviews:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const getProductReviewById = async (request, h) => {
  try {
    const { id } = request.params;
    
    const productReview = await db.ProductReview.findAll({
      where: {
        [Op.or]: [
          { review_id: id },
          { product_id: id },
          { order_id: id }
        ]
      },
      include: [
        {
          model: db.ProductReviewPicture,
          as: 'pictures',
        }
      ]
    });
    if (!productReview) {
      return h.response({ error: 'Product Review not found' }).code(404);
    } 
    
    return h.response(productReview).code(200);
  } catch (error) {
    console.log('Error during get product review by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createProductReview = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { product_id, order_id } = request.payload;

    const order = await db.Order.findByPk(order_id);
    if (decodedToken.role === 'user' && decodedToken.user_id !== order.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }
    if (!order) {
      return Boom.notFound('Order not found');
    }
    if (order.status !== 'completed') {
      return Boom.badRequest('You can only review products from completed orders');
    }

    const product = await db.Product.findByPk(product_id);
    if (!product) {
      return Boom.notFound('Product not found');
    }

    const existingProductReview = await db.ProductReview.findOne({
      where: { product_id, order_id }
    });
    if (existingProductReview) {
      return Boom.conflict('Product Review already exists');
    }

    const newProductReview = await db.ProductReview.create({
      review_id: `rv-${nanoid()}`,
      ...request.payload,
    });

    return h.response({
      message: 'Product Review created successfully',
      data: newProductReview,
    }).code(201);
  } catch (error) {
    console.log('Error during create product review:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateProductReview = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { reviewId } = request.params;
    const { product_id, order_id } = request.payload;

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const productReview = await db.ProductReview.findByPk(reviewId);
    if (!productReview) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('Product Review not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== productReview.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    if (product_id) {
      if (!decodedToken.role === 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      const product = await db.Product.findByPk(product_id);
      if (!product) {
        return Boom.notFound('Product not found');
      }
    }

    if (order_id) {
      if (!decodedToken.role === 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }

      const order = await db.Order.findByPk(order_id);
      if (!order) {
        return Boom.notFound('Order not found');
      }
      if (order.status !== 'completed') {
        return Boom.badRequest('You can only review products from completed orders');
      }
    }

    const updatedProductReview = await productReview.update(
      request.payload,
      { returning: true }
    );

    return h.response({
      message: 'Product Review updated successfully',
      data: updatedProductReview
    }).code(200);
  } catch (error) {
    console.log('Error during update product review:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteProductReview = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { reviewId } = request.params;

    const productReview = await db.ProductReview.findByPk(reviewId);
    if (!productReview) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('Product Review not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== productReview.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    await productReview.destroy();

    return h.response({ message: 'Product Review deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete product review:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getProductReview,
  getProductReviewById,
  createProductReview,
  updateProductReview,
  deleteProductReview,
};
