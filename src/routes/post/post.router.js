const express = require('express')
const postRouter = express.Router();

// Post Validator
const {
  createValidator,
  updateValidator,
} = require('../../validators/post.validator')

const {
  add, 
  getAllPostByUser,
  getAllPostFriends,
  edit,
  destroy,
  getOnePost
} = require('./post.controller')

/**
 * @route GET api/v1/users/:userId/posts
 * @description get all post by user
 * @access public
 */
 postRouter.get("/", getAllPostByUser);

/**
 * @route GET api/v1/users/:userId/posts/friends
 * @description get all post friend
 * @access public
 */
 postRouter.get("/friends", getAllPostFriends);

/**
 * @route POST api/v1/users/:userId/posts
 * @description create post
 * @access public
 */
 postRouter.post("/", createValidator, add);

/**
 * @route GET api/v1/users/:userId/posts/:postId
 * @description show one post
 * @access public
 */
 postRouter.get("/:postId", getOnePost);

/**
 * @route POST api/v1/users/:userId/posts/:postId
 * @description update post
 * @access public
 */
 postRouter.put("/:postId", updateValidator, edit);

/**
 * @route POST api/v1/users/:userId/posts/:postId
 * @description delete post
 * @access public
 */
 postRouter.delete("/:postId", destroy);

 module.exports = postRouter;