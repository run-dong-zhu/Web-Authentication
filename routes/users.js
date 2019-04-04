const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../auth/passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const checkAuth = require('../auth/check-auth');

router.route('/signup')
  .post(validateBody(schemas.authSchema), checkAuth, UsersController.signUp);

router.route('/signin')
  .post(UsersController.signIn);

router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

router.route('/whitelist')
  .get(checkAuth, UsersController.whitelist);

module.exports = router;