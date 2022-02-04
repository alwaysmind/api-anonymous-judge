// Models
const Question = require('../../models/questions.model')

// Validator
const { validationResult } = require('express-validator')


exports.add = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Failed to add question',
        error: errors.array(),
      })
    }

    const { postId } = req.params

    const question = await Question.create({
      ...req.body,
      post: postId,
    })

    res.status(200).json({
      message: 'Hiyayy, Success create question',
      data: question,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Oooops, Failed create question', error: error.message })
  }
}

exports.getAllQuestionByPost = async (req, res) => {
  try {
    let { postId } = req.params

    const questions = await Question.find({ post_id: postId }).sort({ created_at: -1 })

    res.status(200).json({
      message: 'Hereee, the questions of post',
      data: questions,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh sorry dudee, failed show question by post', error: error.message })
  }
}

exports.getOneQuestion = async (req, res) => {
  try {
    let { questionId } = req.params

    let question = await Question.findOne({ id: questionId })

    res.status(200).json({
      message: 'Congratulationn, success get post question',
      data: question,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'Ohhh calm down dudee, show question is failed', error: error.message })
  }
}

exports.edit = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Failed to update question',
        error: errors.array(),
      })
    }

    let { questionId } = req.params
    
    const question = await Question.findByIdAndUpdate(
      questionId,
      req.body
    )

    res.status(200).json({
      message: 'yeahhh, success update question',
      data: question,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'wuuuh, failed update question', error: error.message })
  }
}

exports.destroy = async (req, res) => {
  try {
    let { questionId } = req.params

    const question = await Question.findByIdAndRemove(
      questionId,
    ).exec()

    res.status(200).json({
      message: 'Hushhh, success delete question',
      data: question,
    })
  } catch (error) {
    res
      .status(422)
      .json({ message: 'hmmmm, failed delete question', error: error.message })
  }
}