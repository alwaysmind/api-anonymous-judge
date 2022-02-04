// Models
const User = require('../../models/users.model')

exports.follow = async (req, res) => {
  try {
    const { userId } = req.body

    if (req.user.user_id === userId) {
      throw new Error("Are you serious?, you can't follow yourself")
    }

    // Add Follows
    const follow = await User.findOneAndUpdate(
      { _id: req.user.user_id, follows: { $ne: userId } },
      { $push: { follows: userId } },
      { new: true, useFindAndModify: false }
    )

    // Add Followers
    const followers = await User.findOneAndUpdate(
      { _id: userId, followers: { $ne: req.user.user_id } },
      { $push: { followers: req.user.user_id } },
      { new: true, useFindAndModify: false }
    )

    if (!follow && !followers) {
      throw new Error('Hey broo, you already follow him/her')
    }

    res.status(200).json({
      message: 'Yes yes yes, success add new friend',
      data: follow,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Oooops, failed add new friend', error: error.message })
  }
}

exports.unfollow = async (req, res) => {
  try {
    const { userId } = req.body

    const user = await User.findOneAndUpdate(
      { _id: req.user.user_id, follows: { $eq: userId } },
      { $pull: { follows: userId } },
      { new: true, useFindAndModify: false }
    )

    if (user === null) {
      throw new Error('Hey broo, you are not follow him/her')
    }

    res.status(200).json({
      message: 'Hmmmmm, unfollow user is success',
      data: user,
    })
  } catch (error) {
    res.status(422).json({
      message: 'Ohhh noo, unfollow user is failed',
      error: error.message,
    })
  }
}

exports.showById = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId).populate('follows').populate('followers')

    res.status(200).json({
      message: 'yeahh, the user is found',
      data: user,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh noo, failed show user', error: error.message })
  }
}

exports.getUsers = async (req, res) => {
  try {
    let whereCondition = []
    let query = req.query

    if (query.name) {
      whereCondition.push({ name: { $regex: '.*' + query.name + '.*' } })
    } else if (query.username) {
      whereCondition.push({ username: query.username })
    } else {
      whereCondition.push({})
    }

    const users = await User.find({ $or: whereCondition })
      .populate('follows')
      .populate('followers')
      .exec()

    res.status(200).json({
      message: 'yeahh, the user is found',
      data: users,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh noo, failed show user', error: error.message })
  }
}
