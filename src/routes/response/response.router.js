const express = require('express')
const responseRouter = express.Router({mergeParams: true});

// Post Validator
const {
  createValidator,
  updateValidator,
} = require('../../validators/response.validator')

const {
  add, 
  getAllResponseByQuestion,
  getOneResponse,
  edit,
  destroy,
} = require('./response.controller')

/**
 * @route GET api/v1/questions/:questionId/responses
 * @description get all responses by question
 * @access public
 */
 responseRouter.get("/", getAllResponseByQuestion);

/**
 * @route POST api/v1/questions/:questionId/responses
 * @description create response
 * @access public
 */
 responseRouter.post("/", createValidator, add);

 /**
 * @route GET api/v1/questions/:questionId/responses/:responseId
 * @description get one response
 * @access public
 */
  responseRouter.get("/:responseId", getOneResponse);

/**
 * @route PUT api/v1/questions/:questionId/responses/:responseId
 * @description update question
 * @access public
 */
 responseRouter.put("/:responseId", updateValidator, edit);

/**
 * @route DELETE api/v1/questions/:questionId/responses/:responseId
 * @description delete question
 * @access public
 */
 responseRouter.delete("/:responseId", destroy);

 module.exports = responseRouter;