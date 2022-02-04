const mongoose = require('mongoose')

const ResponseSchema = new mongoose.Schema(
  {
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answer: {
      type: 'String',
      text: true,
      required: false,
      default: null
    },
    rating: {
      type: 'Decimal',
      required: false,
      max: 5,
      min: 0,
      default: null,
    },
    is_show: {
      type: 'Boolean',
      default: true,
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Response = mongoose.model('Response', ResponseSchema)

module.exports = Response
