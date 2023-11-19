const mongoose = require('mongoose');
const BSON = require('bson');

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
    questions: [String | {
      text: String,
      media: Boolean,
      mediaType: String,
      mediaLocation: String
    }],
    answers: [String],
    urls: [String]
  }],
  password: {
    type: String
  }
})

const Game = mongoose.model('game', gameSchema);

module.exports = Game;
