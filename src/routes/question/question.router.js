const express = require('express')
const questionRouter = express.Router({mergeParams: true});

// Post Validator
const {
  createValidator,
  updateValidator,
} = require('../../validators/question.validator')

const {
  add, 
  getAllQuestionByPost,
  getOneQuestion,
  edit,
  destroy,
} = require('./question.controller')

/**
 * @route GET api/v1/posts/:postId/questions
 * @description get all question by post
 * @access public
 */
 questionRouter.get("/", getAllQuestionByPost);

/**
 * @route POST api/v1/posts/:postId/questions
 * @description create question
 * @access public
 */
 questionRouter.post("/", createValidator, add);

 /**
 * @route GET api/v1/posts/:postId/questions/:questionId
 * @description get one question
 * @access public
 */
  questionRouter.get("/:questionId", getOneQuestion);

/**
 * @route PUT api/v1/posts/:postId/questions/:questionId
 * @description update question
 * @access public
 */
 questionRouter.put("/:questionId", updateValidator, edit);

/**
 * @route DELETE api/v1/posts/:postId/questions/:questionId
 * @description delete question
 * @access public
 */
 questionRouter.delete("/:questionId", destroy);

 module.exports = questionRouter;