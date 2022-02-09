// Models
const Post = require('../../models/posts.model')
const User = require('../../models/users.model')

// Validator
const { validationResult } = require('express-validator')


exports.add = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Failed to qustion post',
        error: errors.array(),
      })
    }

    const post = await Post.create({
      ...req.body,
      user_id: req.user.user_id,
    })

    res.status(200).json({
      message: 'Hiyayy, Success create post',
      data: post,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Oooops, Failed create post', error: error.message })
  }
}

exports.getAllPostByUser = async (req, res) => {
  try {
    let { userId } = req.params

    const posts = await Post.find({ user_id: userId }).sort({ created_at: -1 })

    res.status(200).json({
      message: 'Hereee, the post of user',
      data: posts,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh sorry dudee, failed show post', error: error.message })
  }
}

exports.getAllPostFriends = async (req, res) => {
  try {
    let { userId } = req.params

    let followId = await User.find({ id: userId }).select('follows.id')

    followId = followId.map(item => item._id)

    const posts = await Post.find({ user_id: { $in: followId } }).populate({
      path: 'user_id',
      select: 'name avatar',
    }).sort({ created_at: -1 })

    res.status(200).json({
      message: 'Congratulationn, success get post friends',
      data: posts,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh calm down dudee, show your friend post is failed', error: error.message })
  }
}

exports.getOnePost = async (req, res) => {
  try {
    let { postId } = req.params

    let post = await Post.findOne({ id: postId })

    res.status(200).json({
      message: 'Congratulationn, success get one post',
      data: post,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh calm down dudee, show post is failed', error: error.message })
  }
}

exports.edit = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Failed to update post',
        error: errors.array(),
      })
    }

    let { postId } = req.params

    const post = await Post.findOneAndUpdate(
      postId,
      req.body
    ).exec()

    res.status(200).json({
      message: 'yeahhh, success update post',
      data: post,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'wuuuh, failed update post', error: error.message })
  }
}

exports.destroy = async (req, res) => {
  try {
    let { postId } = req.params

    const post = await Post.findByIdAndRemove(
      postId,
    ).exec()

    res.status(200).json({
      message: 'Hushhh, success delete post',
      data: post,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'hmmmm, failed delete post', error: error.message })
  }
}