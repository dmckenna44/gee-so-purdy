const mongoose = require('mongoose');

const ActiveGameSchema = new mongoose.Schema({
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
      mediaLocation: String,
      answered: Boolean
    }],
    answers: [String]
  }],
  answered:[[Number]],
  players: [{
    name: String,
    score: Number,
    id: String
  }],
  password: {
    type: String
  }
})

const ActiveGame = mongoose.model('activeGame', ActiveGameSchema);

module.exports = ActiveGame;
