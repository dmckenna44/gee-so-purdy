const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const newUser = await User.create({username: username, password: encryptedPassword});
    if (newUser) res.locals.newUser = newUser;
    return next();
  } catch (err) {
    return next(err);
  }
}

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({username: username});
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if(match) {
        res.locals.user = {
          found: true,
          user: user
        }
        return next()
      } else return next({err: 'Incorrect password'})
    } else return next({err: 'No user'})
  } catch (err) {
    return next(err)
  }
}


module.exports = userController;