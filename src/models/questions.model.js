const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: 'String',
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    is_text: {
      type: 'Boolean',
      default: true,
    },
    is_rating: {
      type: 'Boolean',
      default: true,
    },
    is_private: {
      type: 'Boolean',
      default: false,
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question
