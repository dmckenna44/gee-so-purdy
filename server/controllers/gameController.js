const mongoose = require('mongoose');
const Game = require('../models/Game.js');


const gameController = {};

gameController.setGame = async (req, res, next) => {
  const { user_id, name, clues } = req.body;

  const newGame = await Game.create({
    user_id: user_id,
    name: name,
    clues: clues
  });

  res.locals.newGame = newGame;
  console.log('Game set success')
  await next();

}

gameController.getGames = async (req, res, next) => {
  const userid = req.params.userid;
  Game.find({user_id: userid})
    .exec().
    then(games => {
      res.locals.games = games;
      return next()
    })
}

gameController.deleteGame = async (req, res, next) => {
  const {id} = req.body;

  try {
    const deleted = await Game.deleteOne({_id: id});
    res.locals.deleted = deleted;
    return next();
  } catch (err) {
    return next(err);
  }

}

module.exports = gameController;
