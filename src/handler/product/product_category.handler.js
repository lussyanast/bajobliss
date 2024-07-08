const sequelize = require('../../db/connection');
const db = sequelize.models

const getProductCategory = async (request, h) => {
  try {
    const productCategories = await db.ProductCategory.findAll();
    return h.response(productCategories).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getProductCategoryById = async (request, h) => {
  try {
    const { id } = request.params;
    const productCategory = await db.ProductCategory.findByPk(id);
    if (!productCategory) {
      return h.response({ error: 'Product Category not found' }).code(404);
    }
    return h.response(productCategory).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createProductCategory = async (request, h) => {
  try {
    const { name, icon } = request.payload;
    const newProductCategory = await db.ProductCategory.create({
      name,
      icon,
    });
    return h.response(newProductCategory).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateProductCategory = async (request, h) => {
  try {
    const { id } = request.params;
    const { name, icon } = request.payload;
    const [updatedCount, [updatedProductCategory]] = await db.ProductCategory.update(
      { name, icon },
      { where: { category_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'Product Category not found' }).code(404);
    }
    return h.response(updatedProductCategory).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteProductCategory = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedProductCategory = await db.ProductCategory.destroy({ where: { category_id: id } });
    if (deletedProductCategory === 0) {
      return h.response({ error: 'Product Category not found' }).code(404);
    }
    return h.response({ message: 'Product Category deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getProductCategory,
  getProductCategoryById,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
