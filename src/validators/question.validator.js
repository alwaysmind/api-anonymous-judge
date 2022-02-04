const { check } = require('express-validator');

exports.createValidator = [
  check('title').not().isEmpty().withMessage('title is not valid'),
  check('is_text').not().isEmpty().isBoolean(),
  check('is_rating').not().isEmpty().isBoolean(),
  check('is_private').not().isEmpty().isBoolean(),
]

exports.updateValidator = [
  check('title').not().isEmpty().withMessage('title is not valid'),
  check('is_text').not().isEmpty().isBoolean(),
  check('is_rating').not().isEmpty().isBoolean(),
  check('is_private').not().isEmpty().isBoolean(),
]
