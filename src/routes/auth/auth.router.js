const express = require('express')
const authRouter = express.Router();

const {
  loginWithGoogle,
  loginAsAnonym,
  logout
} = require('./auth.controller')

/**
 * @route POST api/v1/auth/login-google
 * @description login with google
 * @access public
 */
 authRouter.post("/login-google", loginWithGoogle);

/**
 * @route POST api/v1/auth/login-anonym
 * @description login as anonym
 * @access public
 */
 authRouter.post("/login-anonym", loginAsAnonym);

 /**
  * @route POST api/v1/auth/logout
  * @description logout from the application
  * @access public
  */
 authRouter.post("/logout", logout);
 
 
 module.exports = authRouter;