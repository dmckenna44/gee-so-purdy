const { createSecureServer } = require('http2');
const mongoose = require('mongoose');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('request body from createUser', req.body)
  const { username, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = await User.create({username: username, password: encryptedPassword});
    console.log('new user', newUser)
    if (newUser) res.locals.newUser = newUser;
    return next();
  } catch (err) {
    return next(err);
  }
}


userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    console.log('verifyUser query', req.body);
    const user = await User.findOne({username: username});
    const match = await bcrypt.compare(password, user.password);
    if(match) {
      res.locals.user = {
        found: true,
        user: user
      }
      return next()
    } else return next({err: 'No such user found'})
  } catch (err) {
    return next(err)
  }
}


module.exports = userController;