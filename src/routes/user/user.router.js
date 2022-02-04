const express = require('express')
const userRouter = express.Router();

const {
  follow,
  unfollow,
  showById,
  getUsers,
} = require('./user.controller')

/**
 * @route GET api/v1/users
 * @description get users
 * @access public
 */
 userRouter.get("/", getUsers);

/**
 * @route GET api/v1/users/:id
 * @description show one user
 * @access public
 */
 userRouter.get("/:userId", showById);

/**
 * @route POST api/v1/users/follow
 * @description follow user
 * @access public
 */
 userRouter.post("/follow", follow);

/**
 * @route POST api/v1/users/unfollow
 * @description unfollow user
 * @access public
 */
 userRouter.post("/unfollow", unfollow);

 module.exports = userRouter;