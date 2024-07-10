const { Op } = require('sequelize');
const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getProduct = async (request, h) => {
  try {
    const products = await db.Product.findAll();

    return h.response(products).code(200);
  } catch (error) {
    console.log('Error during get products:', error);
    return Boom.badImplementation('Internal server error')
  }
};

const getProductById = async (request, h) => {
  try {
    const { id } = request.params;

    const product = await db.Product.findAll({
      where: {
        [Op.or]: [
          { product_id: id }, 
          { category_id: id } 
        ]
      }
    });
    if (!product) {
      return Boom.notFound('Product not found');
    }

    return h.response(product).code(200);
  } catch (error) {
    console.log('Error during get product by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const getProductPictureById = async (request, h) => {
  try {
    const { id } = request.params;

    const productPicture = await db.ProductPicture.findAll({
      where: {
        [Op.or]: [
          { product_picture_id: id }, 
          { product_id: id } 
        ]
      }
    });
    if (!productPicture) {
      return Boom.notFound('Product Picture not found');
    }

    return h.response(productPicture).code(200);
  } catch (error) {
    console.log('Error during get product picture by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createProduct = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const newProduct = await db.Product.create({
      product_id: `product_${nanoid()}`,
      ...request.payload,
    });

    return h.response({
      message: 'Product created successfully',
      data: newProduct,
    }).code(201);
  } catch (error) {
    console.log('Error during create product:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateProduct = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { productId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }
    
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return Boom.notFound('Product not found');
    }

    const updatedProduct = await product.update({
      ...request.payload,
      updated_at: new Date().toISOString(),
    }, { returning: true });

    return h.response({
      message: 'Product updated successfully',
      data: updatedProduct[1][0].get()
    }).code(200);
  } catch (error) {
    console.log('Error during update product:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteProduct = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { productId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const product = await db.Product.findByPk(productId);
    if (!product) {
      return Boom.notFound('Product not found');
    }

    await product.destroy();

    return h.response({ message: 'Product deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete product:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getProduct,
  getProductById,
  getProductPictureById,
  createProduct,
  updateProduct,
  deleteProduct,
};
