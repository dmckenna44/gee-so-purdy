const Game = require('../models/Game.js');

const gameController = {};

gameController.setGame = async (req, res, next) => {
  const { user_id, name, clues } = req.body;
  
  try {
      const game = new Game({
        user_id: user_id,
        name: name,
        clues: clues
      })
      const newGame = await game.save(); 
      res.locals.newGame = newGame;
      console.log('Game set success')
      return next();
    } catch (err) {
    return next(err)
  }
}

gameController.updateGame = async (req, res, next) => {
  const { game_id, clues, name} = req.body;

  try {
    const foundGame = await Game.findOne({_id: game_id});
    foundGame.clues = clues;
    foundGame.name = name;
    const updatedGame = await foundGame.save();
    res.locals.updated = updatedGame;
    return next();
  } catch(err) {
    return next(err)
  }
};

gameController.getGames = async (req, res, next) => {
  const userid = req.params.userid;

  try {
    const foundGames = await Game.find({user_id: userid});
    res.locals.games = foundGames;
    return next();

  } catch (err) {
    return next(err);
  }
};

gameController.deleteGame = async (req, res, next) => {
  const {id} = req.body;

  try {
    const deleted = await Game.deleteOne({_id: id});
    res.locals.deleted = deleted;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = gameController;
