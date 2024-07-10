const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 2)

const sequelize = require('../../db/connection');
const db = sequelize.models

const getProductCategory = async (request, h) => {
  try {
    const productCategories = await db.ProductCategory.findAll();
    return h.response(productCategories).code(200);
  } catch (error) {
    console.log('Error during get product categories:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const getProductCategoryById = async (request, h) => {
  try {
    const { categoryId } = request.params;

    const productCategory = await db.ProductCategory.findByPk(categoryId, {
      include: [
        {
          model: db.Product,
          as: 'products',
        },
      ],
    
    });
    if (!productCategory) {
      return Boom.notFound('Product Category not found');
    }

    return h.response(productCategory).code(200);
  } catch (error) {
    console.log('Error during get product category by id:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const createProductCategory = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const newProductCategory = await db.ProductCategory.create({
      category_id: `pc-${nanoid()}`,
      ...request.payload,
    });

    return h.response({
      message: 'Product Category created successfully',
      data: newProductCategory,
    }).code(201);
  } catch (error) {
    console.log('Error during create product category:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const updateProductCategory = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { categoryId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const productCategory = await db.ProductCategory.findByPk(categoryId);
    if (!productCategory) {
      return Boom.notFound('Product Category not found');
    }

    const updatedProductCategory = await productCategory.update({
      ...request.payload,
      updated_at: new Date().toISOString(),
    }, { returning: true });

    return h.response({
      message: 'Product Category updated successfully',
      data: updatedProductCategory
    }).code(200);
  } catch (error) {
    console.log('Error during update product category:', error);
    return Boom.badImplementation('Internal server error');
  }
};

const deleteProductCategory = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = jwtDecode(token);

    const { categoryId } = request.params;

    if (decodedToken.role !== 'admin') {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const productCategory = await db.ProductCategory.findByPk(categoryId);
    if (!productCategory) {
      return Boom.notFound('Product Category not found');
    }

    await productCategory.destroy();
    return h.response({ message: 'Product Category deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete product category:', error);
    return Boom.badImplementation('Internal server error');
  }
};

module.exports = {
  getProductCategory,
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
