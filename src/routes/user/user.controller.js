// Models
const Follow = require('../../models/follow.model')
const User = require('../../models/users.model')

exports.follow = async (req, res) => {
  try {
    const { userId } = req.body

    if (req.user.user_id === userId) {
      throw new Error("Are you serious?, you can't follow yourself")
    }

    const isAlreadyFollow = await Follow.findOne(
      { userId: userId, followId: req.user.user_id }
    )

    if (isAlreadyFollow) {
      throw new Error('Him/her already follow you')
    }

    await Follow.findOneAndUpdate(
      { userId: req.user.user_id, followId: userId },
      {},
      { new: true, upsert: true }
    )

    res.status(200).json({
      message: 'Yes yes yes, success add new friend',
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Oooops, failed add new friend', error: error.message })
  }
}

exports.acceptFriend = async (req, res) => {
  try {
    const userRequestId = req.body.userId
    const userAcceptId = req.user.user_id

    const accept = await Follow.findOneAndUpdate(
      { userId: userRequestId, followId: userAcceptId },
      { accepted: true },
      { new: true, upsert: false }
    )

    if (accept === null) {
      throw new Error('Hey broo, he/she is not requesting friend to you')
    }

    res.status(200).json({
      message: 'Yes yes yes, accept friend request success, congratulation you have a new friend',
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Oooops, failed accept friend', error: error.message })
  }
}

exports.listRequestFriend = async (req, res) => {
  try {
    const requestFriends = await Follow.find(
      { followId: req.user.user_id, accepted: false },
    ).populate('userId')

    res.status(200).json({
      message: 'Yes yes yes, success get list request friend',
      data: requestFriends
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Oooops, failed get list request friend', error: error.message })
  }
}

exports.unfollow = async (req, res) => {
  try {
    const userTargetId = req.body.userId
    const userLoginId = req.user.user_id

    const follow = await Follow.findOneAndRemove(
      { userId: userTargetId, followId: userLoginId },
    )

    const following = await Follow.findOneAndRemove(
      { userId: userLoginId, followId: userTargetId },
    )

    if (follow === null && following === null) {
      throw new Error('Hey broo, you are not follow him/her')
    }

    res.status(200).json({
      message: 'Hmmmmm, unfriend success',
    })
  } catch (error) {
    res.status(422).json({
      message: 'Ohhh noo, unfriend failed',
      error: error.message,
    })
  }
}

exports.showById = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId).populate({
      path: 'follower',
      populate: { path: 'userId' },
      match: { accepted: true },
    }).populate({
      path: 'following',
      populate: { path: 'userId' },
      match: { accepted: true },
    });

    let data = Object.assign({}, {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      avatar: user.avatar,
      is_anonym: user.is_anonym,
      connect: [...user.following, ...user.follower]
    })

    res.status(200).json({
      message: 'yeahh, the user is found',
      data,
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

    const users = await User.find({ $or: whereCondition }).populate({
      path: 'follower',
      populate: { path: 'userId' },
      match: { accepted: true },
    }).populate({
      path: 'following',
      populate: { path: 'userId' },
      match: { accepted: true },
    })
      .exec()

    let data = users.map(user => {
      return Object.assign({}, {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        is_anonym: user.is_anonym,
        connect: [...user.following, ...user.follower]
      })
    })

    res.status(200).json({
      message: 'yeahh, the user is found',
      data,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh noo, failed show user', error: error.message })
  }
}
