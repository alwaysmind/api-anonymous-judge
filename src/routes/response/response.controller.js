// Models
const Response = require('../../models/response.model')

// Validator
const { validationResult } = require('express-validator')
const Question = require('../../models/questions.model')
const User = require('../../models/users.model')


exports.add = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Failed to add response',
        error: errors.array(),
      })
    }

    const { questionId } = req.params
    const userId = req.user.user_id

    const question = await Question.findById(questionId).populate('post')
    const dateNow = new Date()
    const user = await User.findById(userId)
    const isFollow = await User.find({ $and: [{ _id: userId }, { follows: { $in: [question.post.user_id] } }] })

    if (question.post.access == 'private' && !!isFollow.length < 1) throw new Error('This question is private, you must follow the person who post this question')
    if (question.post.response_type == 'name' && user.is_anonym) throw new Error('You must login with google to response this question')
    if (question.post.response_type == 'anonym' && !user.is_anonym) throw new Error('You must be anonym to response this question')
    if (question.post.begun_at >= dateNow) throw new Error('The post is not begun to get response')
    if (question.post.ended_at <= dateNow) throw new Error('The post is already ended to get response')
    if (question.is_text && !question.is_rating && !req.body.text) throw new Error('The question is text, you must fill the text')
    if (!question.is_text && question.is_rating && !req.body.rating) throw new Error('The question is rating, you must fill the rating')
    if (question.is_text && question.is_rating && !req.body.text && !req.body.rating) throw new Error('The question is text and rating, you must fill the text and rating')

    const response = await Response.create({
      ...req.body,
      question_id: questionId,
      user_id: userId,
    })

    res.status(200).json({
      message: 'Hiyayy, Success add response',
      data: response,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Oooops, Failed add response', error: error.message })
  }
}

exports.getAllResponseByQuestion = async (req, res) => {
  try {
    let { questionId } = req.params
    const userId = req.user.user_id
    const question = await Question.findById(questionId).populate('post')
    const isFollow = await User.find({ $and: [{ _id: userId }, { follows: { $in: [question.post.user_id] } }] })

    let responses = await Response.find({ question_id: questionId }).sort({ created_at: -1 })

    if (question.post.access == 'private' && (!!isFollow.length < 1 || question.post.user_id != userId)) throw new Error('This post is private, you must follow the person who post this question')
    if (question.is_private && !(userId == response.user_id || userId == question.post.user_id)) throw new Error('This question is private')

    responses = responses.filter(response => {
      if (response.is_show) {
        return true
      }
      return userId == response.user_id || userId == question.post.user_id
    })

    res.status(200).json({
      message: 'Hereee, the response of question',
      data: responses,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh sorry dudee, failed show response by question', error: error.message })
  }
}

exports.getOneResponse = async (req, res) => {
  try {
    const { responseId } = req.params
    const userId = req.user.user_id

    const response = await Response.findOne({ id: responseId })
    const question = await Question.findById(response.question_id).populate('post')
    const isFollow = await User.find({ $and: [{ _id: userId }, { follows: { $in: [question.post.user_id] } }] })

    if (question.post.access == 'private' && (!!isFollow.length < 1 || question.post.user_id != userId)) throw new Error('This post is private, you must follow the person who post this question')
    if (question.is_private && !(userId == response.user_id || userId == question.post.user_id)) throw new Error('This question is private')
    if (!response.is_show && !(userId == response.user_id || userId == question.post.user_id)) throw new Error('This response is not show to everyone')

    res.status(200).json({
      message: 'Congratulationn, success get one response',
      data: response,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh calm down dudee, show response is failed', error: error.message })
  }
}

exports.edit = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Failed to update response',
        error: errors.array(),
      })
    }

    const { questionId, responseId } = req.params
    const userId = req.user.user_id

    const question = await Question.findById(questionId).populate('post')
    const dateNow = new Date()
    const user = await User.findById(userId)
    const isFollow = await User.find({ $and: [{ _id: userId }, { follows: { $in: [question.post.user_id] } }] })

    if (question.post.access == 'private' && !!isFollow.length < 1) throw new Error('This post is private, you must follow the person who post this question')
    if (question.post.response_type == 'name' && user.is_anonym) throw new Error('You must login with google to response this question')
    if (question.post.response_type == 'anonym' && !user.is_anonym) throw new Error('You must be anonym to response this question')
    if (question.post.begun_at >= dateNow) throw new Error('The post is not begun to get response')
    if (question.post.ended_at <= dateNow) throw new Error('The post is already ended to get response')
    if (question.is_text && !question.is_rating && !req.body.text) throw new Error('The question is text, you must fill the text')
    if (!question.is_text && question.is_rating && !req.body.rating) throw new Error('The question is rating, you must fill the rating')
    if (question.is_text && question.is_rating && !req.body.text && !req.body.rating) throw new Error('The question is text and rating, you must fill the text and rating')


    const response = await Response.findByIdAndUpdate(
      responseId,
      req.body
    )

    res.status(200).json({
      message: 'yeahhh, success update response',
      data: response,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'wuuuh, failed update response', error: error.message })
  }
}

exports.destroy = async (req, res) => {
  try {
    let { responseId } = req.params
    const userId = req.user.user_id

    const response = await Response.findById(responseId)

    if (!response) throw new Error('response is not found')
    if (response.user_id != userId) throw new Error('You must be the owner of this response to delete it')

    response.remove()

    res.status(200).json({
      message: 'Hushhh, success delete response',
      data: response,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'hmmmm, failed delete response', error: error.message })
  }
}