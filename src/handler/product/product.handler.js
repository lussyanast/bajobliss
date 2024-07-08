const sequelize = require('../../db/connection');
const db = sequelize.models

const getProduct = async (request, h) => {
  try {
    const products = await db.Product.findAll();
    return h.response(products).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getProductById = async (request, h) => {
  try {
    const { id } = request.params;
    const product = await db.Product.findByPk(id);
    if (!product) {
      return h.response({ error: 'Product not found' }).code(404);
    }
    return h.response(product).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getProductPictureById = async (request, h) => {
  try {
    const { id } = request.params;
    const product = await db.Product.findByPk(id, {
      attributes: ['picture'],
    });
    if (!product) {
      return h.response({ error: 'Product not found' }).code(404);
    }
    return h.response(product.picture).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createProduct = async (request, h) => {
  try {
    const { name, description, price, picture, weight, stock, category_id } = request.payload;
    const newProduct = await db.Product.create({
      name,
      description,
      price,
      picture,
      weight,
      stock,
      category_id,
    });
    return h.response(newProduct).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateProduct = async (request, h) => {
  try {
    const { id } = request.params;
    const { name, description, price, picture, weight, stock, category_id } = request.payload;
    const [updatedCount, [updatedProduct]] = await db.Product.update(
      { name, description, price, picture, weight, stock, category_id },
      { where: { product_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'Product not found' }).code(404);
    }
    return h.response(updatedProduct).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteProduct = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedProduct = await db.Product.destroy({ where: { product_id: id } });
    if (deletedProduct === 0) {
      return h.response({ error: 'Product not found' }).code(404);
    }
    return h.response({ message: 'Product deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
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
