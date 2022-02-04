const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: 'String',
    },
    access: {
      type: 'String',
      enum: ['public', 'private'],
      default: 'public',
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    response_type: {
      type: 'String',
      enum: ['anonym', 'name', 'all'],
      default: 'all',
    },
    begun_at: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    ended_at: {
      type: Date,
      required: false,
      default: null,
    },
    description: { 
      type: 'String',
      text: true,
      required: false,
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
