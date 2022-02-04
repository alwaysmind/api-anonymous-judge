const { check } = require('express-validator');

exports.createValidator = [
  check('answer').optional({ nullable: true }).isString().withMessage('answer is not valid'),
  check('rating').optional({ nullable: true }).isFloat().withMessage('rating is not valid'),
  check('is_show').not().isEmpty().isBoolean(),
]

exports.updateValidator = [
  check('answer').isString().withMessage('answer is not valid'),
  check('rating').isFloat().withMessage('rating is not valid'),
  check('is_show').not().isEmpty().isBoolean(),
]
