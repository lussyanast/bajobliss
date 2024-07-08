const sequelize = require('../../db/connection');
const db = sequelize.models

const getProductReview = async (request, h) => {
  try {
    const productReviews = await db.ProductReview.findAll();
    return h.response(productReviews).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getProductReviewById = async (request, h) => {
  try {
    const { id } = request.params;
    const productReview = await db.ProductReview.findByPk(id);
    if (!productReview) {
      return h.response({ error: 'Product Review not found' }).code(404);
    }
    return h.response(productReview).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getProductReviewPictureById = async (request, h) => {
  try {
    const { id } = request.params;
    const productReview = await db.ProductReview.findByPk(id, {
      attributes: ['picture'],
    });
    if (!productReview) {
      return h.response({ error: 'Product Review not found' }).code(404);
    }
    return h.response(productReview.picture).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
}

const createProductReview = async (request, h) => {
  try {
    const { product_id, user_id, review, rating, picture } = request.payload;
    const newProductReview = await db.ProductReview.create({
      product_id,
      user_id,
      review,
      rating,
      picture,
    });
    return h.response(newProductReview).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateProductReview = async (request, h) => {
  try {
    const { id } = request.params;
    const { product_id, user_id, review, rating, picture } = request.payload;
    const [updatedCount, [updatedProductReview]] = await db.ProductReview.update(
      { product_id, user_id, review, rating, picture },
      { where: { review_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'Product Review not found' }).code(404);
    }
    return h.response(updatedProductReview).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteProductReview = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedProductReview = await db.ProductReview.destroy({ where: { review_id: id } });
    if (deletedProductReview === 0) {
      return h.response({ error: 'Product Review not found' }).code(404);
    }
    return h.response({ message: 'Product Review deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getProductReview,
  getProductReviewById,
  getProductReviewPictureById,
  createProductReview,
  updateProductReview,
  deleteProductReview,
};
