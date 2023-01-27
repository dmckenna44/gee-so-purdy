const bodyParser = require('body-parser');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const userController = require('./controllers/userController.js')
const gameController = require('./controllers/gameController.js')

const app = express();


app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

const port = process.env.port || 3001;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
})

const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoUri, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'gee-so-purdy'
})
  .then(() => {
    console.log('Connected to gee-so-purdy DB');
    server.listen(port, () => console.log(`server listening on port ${port}`))

  })
  .catch(err => console.log(err));

io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`);
})

app.get('/', (req, res) => {
  res.json({test: 'hello'});
  // res.status(200).sendFile(path.resolve(__dirname, '../client/public/index.html'));
})

app.post('/login', cors(), userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.user);
})

app.post('/signup', cors(), userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
})


app.post('/games', gameController.setGame, (req, res) => {
  res.status(200).json(res.locals.newGame);
})

app.delete('/games', gameController.deleteGame, (req, res) => {
  res.status(200).json(res.locals.deleted);
})

app.get('/games/:userid', gameController.getGames, (req, res) => {
  res.status(200).json(res.locals.games);
})

// app.post('/:userId/games/:gameId', userController.verifyUser, gameController.setGame, (req, res) => {
//   res.status(200);
// })




// app.listen(3000, () => console.log('Server listening on port 3000'));
