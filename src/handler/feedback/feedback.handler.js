const Boom = require('@hapi/boom');
const { jwtDecode } = require('jwt-decode')

const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 10)

const sequelize = require('../../db/connection');
const { Op } = require('sequelize');
const db = sequelize.models

const getFeedback = async (request, h) => {
  try {
    const feedbacks = await db.Feedback.findAll();
    return h.response(feedbacks).code(200);
  } catch (error) {
    console.log('Error during get feedbacks:', error)
    return Boom.badImplementation('Internal Server Error')
  }
};

const getFeedbackById = async (request, h) => {
  try {
    const { id } = request.params;
    
    const feedback = await db.Feedback.findAll({
      where: {
        [Op.or]: [ 
          { feedback_id: id },
          { user_id: id }
        ]
      }
    });
    if (!feedback) {
      return Boom.notFound('Feedback not found');
    }

    return h.response(feedback).code(200);
  } catch (error) {
    console.log('Error during get feedback by id:', error)
    return Boom.badImplementation('Internal Server Error')
  }
};

const createFeedback = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const decodedToken = jwtDecode(token);

    const { user_id, message } = request.payload;

    if (decodedToken.role === 'user' && decodedToken.user_id !== user_id) {
      return Boom.unauthorized('You are not authorized to access this resource');
    }

    const user = await db.User.findByPk(user_id);
    if (!user) {
      return Boom.notFound('User not found');
    }

    const newFeedback = await db.Feedback.create({
      feedback_id:`feedback_${nanoid()}`,
      user_id,
      message,
    });

    return h.response({
      message: 'Feedback created successfully',
      feedback: newFeedback,
    }).code(201);
  } catch (error) {
    console.log('Error during create feedback:', error);
    return Boom.badImplementation('Internal Server Error');
  }
};

const updateFeedback = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const decodedToken = jwtDecode(token)

    const { feedbackId } = request.params;
    const { user_id } = request.payload;

    if (!Object.keys(request.payload).length) {
      return Boom.badRequest('Please provide data to update');
    }

    const feedback = await db.Feedback.findByPk(feedbackId);
    if (!feedback) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('Feedback not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== feedback.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource')
    }

    if (user_id) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource')
      }
      
      const user = await db.User.findByPk(user_id);
      if (!user) {
        return Boom.notFound('User not found');
      }
    }

    const updatedFeedback = await feedback.update({
      ...request.payload,
      updated_at: new Date().toISOString(),
    }, { returning: true });

    return h.response({
      message: 'Feedback updated successfully',
      data: updatedFeedback,
    }).code(200);
  } catch (error) {
    console.log('Error during update feedback:', error)
    return Boom.badImplementation('Internal Server Error')
  }
};

const deleteFeedback = async (request, h) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    const decodedToken = jwtDecode(token)

    const { feedbackId } = request.params;

    const feedback = await db.Feedback.findByPk(feedbackId);
    if (!feedback) {
      if (decodedToken.role !== 'admin') {
        return Boom.unauthorized('You are not authorized to access this resource');
      }
      return Boom.notFound('Feedback not found');
    }
    if (decodedToken.role === 'user' && decodedToken.user_id !== feedback.user_id) {
      return Boom.unauthorized('You are not authorized to access this resource')
    }

    await feedback.destroy();
    return h.response({ message: 'Feedback deleted successfully' }).code(200);
  } catch (error) {
    console.log('Error during delete feedback:', error)
    return Boom.badImplementation('Internal Server Error')
  }
};

module.exports = {
  getFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
