const mongoose = require('mongoose')

const FollowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    followId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const Follow = mongoose.model('Follow', FollowSchema)

module.exports = Follow
