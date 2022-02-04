const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: 'String',
    },
    username: {
      type: 'String',
    },
    name: {
      type: 'String',
    },
    avatar: {
      type: 'String',
      text: true,
    },
    last_login: {
      type: Date,
      default: Date.now(),
    },
    follows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    is_anonym: {
      type: Boolean,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
