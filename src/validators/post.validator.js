const { check } = require('express-validator');

exports.createValidator = [
  check('title').not().isEmpty().withMessage('title is not valid'),
  check('access', 'type is not valid').not().isEmpty().matches(/^(public|private)$/),
  check('response_type', 'response type is not valid').not().isEmpty().matches(/^(anonym|name|all)$/),
  check('begun_at', 'begun date is not valid').not().isEmpty().isISO8601().toDate(),
  check('ended_at', 'begun date is not valid').not().isEmpty().isISO8601().toDate(),
  check('description', 'description is not valid'),
]

exports.updateValidator = [
  check('title').not().isEmpty().withMessage('title is not valid'),
  check('access', 'type is not valid').not().isEmpty().matches(/^(public|private)$/),
  check('response_type', 'response type is not valid').not().isEmpty().matches(/^(anonym|name|all)$/),
  check('begun_at', 'begun date is not valid').not().isEmpty().isISO8601().toDate(),
  check('ended_at', 'begun date is not valid').not().isEmpty().isISO8601().toDate(),
  check('description', 'description is not valid'),
]
