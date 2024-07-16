const Joi = require('joi')

const {
  getFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require('../../handler/feedback/feedback.handler')
const verifyToken = require('../../middleware/verifyToken')

module.exports = [
  {
    method: 'GET',
    path: '/feedbacks',
    handler: getFeedback,
  },
  {
    method: 'GET',
    path: '/feedbacks/{id}',
    handler: getFeedbackById, 
  },
  {
    method: 'POST',
    path: '/feedbacks',
    handler: createFeedback, 
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string(),
          message: Joi.string().required(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'PUT',
    path: '/feedbacks/{feedbackId}',
    handler: updateFeedback, 
    options: {
      auth: 'jwt',
      pre: [verifyToken],
      validate: {
        payload: Joi.object({
          user_id: Joi.string(),
          message: Joi.string(),
        }),
        failAction: (request, h, err) => { throw err }
      },
    },
  },
  {
    method: 'DELETE',
    path: '/feedbacks/{feedbackId}',
    handler: deleteFeedback, 
    options: {
      auth: 'jwt',
      pre: [verifyToken]
    },
  }
]