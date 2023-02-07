const Game = require('../models/Game.js');


const gameController = {};

gameController.setGame = async (req, res, next) => {
  const { user_id, name, clues } = req.body;

  const game = new Game({
    user_id: user_id,
    name: name,
    clues: clues
  })

  const newGame = await game.save(); 

  res.locals.newGame = newGame;
  console.log('Game set success')
  await next();
}

gameController.updateGame = async (req, res, next) => {
  const { game_id, clues} = req.body;
  console.log(clues);

  try {
    const foundGame = await Game.findOne({_id: game_id});
    console.log('found game from update', foundGame)
    foundGame.clues = clues;
    const updatedGame = await foundGame.save();
    res.locals.updated = updatedGame;
    return next();
  } catch(err) {
    console.log(err);
    return next(err)
  }
}

gameController.getGames = async (req, res, next) => {
  const userid = req.params.userid;
  Game.find({user_id: userid})
    .exec().
    then(games => {
      console.log('games from getGames', games)
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
