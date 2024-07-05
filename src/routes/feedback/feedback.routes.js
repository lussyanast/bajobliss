const {
  getFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require('../../handler/feedback/feedback.handler')

module.exports = [
  {
    method: 'GET',
    path: '/feedbacks',
    handler: getFeedback, 
  },
  {
    method: 'GET',
    path: '/feedbacks/{feedbackId}',
    handler: getFeedbackById, 
  },
  {
    method: 'POST',
    path: '/feedbacks',
    handler: createFeedback, 
  },
  {
    method: 'PUT',
    path: '/feedbacks/{feedbackId}',
    handler: updateFeedback, 
  },
  {
    method: 'DELETE',
    path: '/feedbacks/{feedbackId}',
    handler: deleteFeedback, 
  }
]