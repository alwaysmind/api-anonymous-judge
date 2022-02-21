const express = require('express')
const userRouter = express.Router();

const {
  follow,
  unfollow,
  showById,
  getUsers,
  acceptFriend,
  listRequestFriend,
} = require('./user.controller')

/**
 * @route GET api/v1/users
 * @description get users
 * @access public
 */
 userRouter.get("/", getUsers);
 
/**
 * @route GET api/v1/users/list-request-friend
 * @description list request friend
 * @access public
 */
 userRouter.get("/list-request-friend", listRequestFriend);

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
 userRouter.post("/add-friend", follow);

/**
 * @route POST api/v1/users/acceot-friend
 * @description accept friend
 * @access public
 */
 userRouter.post("/accept-friend", acceptFriend);

/**
 * @route POST api/v1/users/unfollow
 * @description unfollow user
 * @access public
 */
 userRouter.post("/unfriend", unfollow);

 module.exports = userRouter;