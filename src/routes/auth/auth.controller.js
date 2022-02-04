const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const jwt = require('jsonwebtoken')

// Models
const User = require('../../models/users.model')

exports.loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body

    if (!token) {
      throw new Error('Token google is required')
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    })

    const { name, email, picture, family_name } = ticket.getPayload()

    const user = await User.findOneAndUpdate(
      { email: email },
      { name, avatar: picture, username: family_name, last_login: Date.now(), is_anonym: false },
      { upsert: true, new: true, runValidators: true }
    ).exec()

    // Create token
    const jwtToken = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.TOKEN_KEY
    )

    res.status(200).json({
      message: 'Yesss, Login with google Success',
      data: jwtToken,
    })
  } catch (error) {
    res.status(422).json({ message: 'Login with google Failed', error: error.message })
  }
}

exports.loginAsAnonym = async (req, res) => {
  try {
    const { id } = req.body
    let user

    if (id) {
      user = await User.findByIdAndUpdate(id, {
        last_login: Date.now(),
      })
    } else {
      user = await User.create({
        last_login: Date.now(),
        is_anonym: true,
      })
    }

    // Create token
    const jwtToken = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY)

    res.status(200).json({
      message: 'Yesss, Login as anonymous Success',
      data: {
        token: jwtToken,
        user,
      },
    })
  } catch (error) {
    res.status(422).json({ message: 'Login as anonymous Failed', error: error.message })
  }
}

exports.logout = async (req, res) => {
  try {
    res.send({ message: 'logout succes' })
  } catch (error) {
    res.status(422).json({ message: 'logout failed' })
  }
}
