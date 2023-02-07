const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true,
  },
  clues: [{
    category: String,
    questions: [String],
    answers: [String]
  }],
  password: {
    type: String
  }
})

const Game = mongoose.model('game', gameSchema);

module.exports = Game;

// {
//   "user_id": "637427c8e631a26f7b6c2c77",
//   "name": 'firstGame',
//   "clues": [
//     {
//       "category": "Music",
//       "questions": ["What is a violin?", "Who is Mick Jagger?", "Where are the Beatles from?"],
//       "answers": ["An instrument", "A singer", "Liverpool"]
//     }
//   ]
// }