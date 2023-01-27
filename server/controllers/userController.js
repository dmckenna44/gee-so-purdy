const { createSecureServer } = require('http2');
const mongoose = require('mongoose');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');


const userController = {};

userController.createUser = async (req, res, next) => {
  // const newUser = {
  //   username: 'Dillon',
  //   password: 'password'
  // }
  console.log('request body', req.body)
  const { username, password } = req.body;
  User.create({username: username, password: password}, (err, response) => {
    if (err) return next(err);
    res.locals.newUser = response;
    console.log('created user response', response._id.toString());
    return next()
  })
}


userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    console.log('verifyUser query', req.body);
    const user = await User.findOne({username: username});
    if(user.password === password) {
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