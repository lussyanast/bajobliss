const sequelize = require('../../db/connection');
const db = sequelize.models

const getFeedback = async (request, h) => {
  try {
    const feedbacks = await db.Feedback.findAll();
    return h.response(feedbacks).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const getFeedbackById = async (request, h) => {
  try {
    const { id } = request.params;
    const feedback = await db.Feedback.findByPk(id);
    if (!feedback) {
      return h.response({ error: 'Feedback not found' }).code(404);
    }
    return h.response(feedback).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const createFeedback = async (request, h) => {
  try {
    const { user_id, message } = request.payload;
    const newFeedback = await db.Feedback.create({
      user_id,
      message,
    });
    return h.response(newFeedback).code(201);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const updateFeedback = async (request, h) => {
  try {
    const { id } = request.params;
    const { user_id, message } = request.payload;
    const [updatedCount, [updatedFeedback]] = await db.Feedback.update(
      { user_id, message },
      { where: { feedback_id: id }, returning: true }
    );
    if (updatedCount === 0) {
      return h.response({ error: 'Feedback not found' }).code(404);
    }
    return h.response(updatedFeedback).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

const deleteFeedback = async (request, h) => {
  try {
    const { id } = request.params;
    const deletedFeedback = await db.Feedback.destroy({ where: { feedback_id: id } });
    if (deletedFeedback === 0) {
      return h.response({ error: 'Feedback not found' }).code(404);
    }
    return h.response({ message: 'Feedback deleted successfully' }).code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  getFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
