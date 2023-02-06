const bodyParser = require('body-parser');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid')
require('dotenv').config();
const newGamePW = require('./utils.js')

const userController = require('./controllers/userController.js')
const gameController = require('./controllers/gameController.js');

const app = express();


app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.set('trust proxy', 1);

const port = process.env.port || 3001;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
})


const clients = [];
const rooms = [];

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
    server.listen(port, () => console.log(`server listening on port ${port}, rooms: ${rooms}`))

  })
  .catch(err => console.log(err));


///////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- SOCKET EVENTS ------------------------------------- //
///////////////////////////////////////////////////////////////////////////////////////
io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`);
  clients.push(socket.id)

  socket.on('create_room', (data, cb) => {
    // console.log('create room data', data)
    const newRoom = {
      id: uuidv4(),
      pw: newGamePW(),
      game: data,
      players: []
    }
    rooms.push(newRoom);
    console.log('rooms list from create_room', rooms)
    socket.join(newRoom);
    cb(newRoom)
  })

  socket.on('join_room', (data, cb) => {
    console.log('join room data', data);
    // I'm mutating the room before emitting the event...
    const response = {};
    rooms.forEach(room => {
      if (room.pw === data.password) {
        response.found = true;
        response.room = room;
        const newPlayer = {name: data.player, score: 0, id: socket.id};
        room.players.push(newPlayer)
        socket.join(room)
        console.log('client list', io.sockets.adapter.rooms.get(room))
        io.to(room).emit('player_joined', {newPlayerList: room.players});
      }
    })
    if (response.found) cb(response)
  })

  socket.on('get_players', (data, cb) => {
    // console.log('get players data:', data);
    console.log('rooms list from get_players', rooms)
    const response = {};
    rooms.forEach(room => {
      if (room.game.name === data.name && room.game.password === data.password) {
        // console.log('room from host check', room)
        response.found = true;
        response.playerList = room.players;
      }
    })
    if (response.found) cb(response);
  })

  socket.on('send_new_scores', (data, cb) => {
    console.log('data from adjust scores', data)
    // receive player name and new score from client and adjust in the room state
    const {roomID, playerName, value, correct} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    console.log('current room', currentRoom)
    currentRoom.players.forEach(player => {
      if (player.name === playerName) {
        player.score += correct ? +value : -value;
      }
    })
    io.to(currentRoom).emit('receive_new_scores', currentRoom.players)
  });

  socket.on('send_updated_score', data => {
    const {roomID, playerName, value} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    currentRoom.players.forEach(player => {
      if (player.name === playerName) {
        player.score = value;
      }
    })
    io.to(currentRoom).emit('receive_new_scores', currentRoom.players)
  })

  socket.on('update_clue_value', (data) => {
    const {roomID, value} = data;
    rooms.forEach(room => {
      if (room.id === roomID) {
        io.to(room).emit('receive_clue_value', value)
      }
    })
  });

  socket.on('update_clue_visibility', (data) => {
    const {roomID, index, answered, question, answer} = data;
    rooms.forEach(room => {
      if (room.id === roomID) {
        io.to(room).emit('receive_clue_visibility', {question: question, answer: answer, index: index, answered: answered})
      }
    })
  });

  socket.on('send_deactivate_clue', data => {
    const {roomID} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    io.to(currentRoom).emit('receive_deactivate_clue', {activeClue: false});
  })

  socket.on('send_buzzer_change', (data) => {
    const {roomID, active} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    io.to(currentRoom).emit('receive_buzzer_change', {buzzersActive: active});
  });

  socket.on('send_active_player', data => {
    const {roomID, name} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    io.to(currentRoom).emit('receive_active_player', {activePlayer: name});

  })

  socket.on('disconnect', (data) => {
    console.log('disconnected socket id: ', socket.id);
    rooms.forEach(room => {
      const ids = room.players.map(p => p.id);
      if (ids.includes(socket.id)) {
        room.players = room.players.filter(p => p.id !== socket.id);
        io.to(room).emit('receive_active_player', {activePlayer: ''});
        io.to(room).emit('player_left', {newPlayerList: room.players});
        socket.leave(room);
      }
    })
    console.log('data from disconnect', data)
  })

})

////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------------------------------------------------ //
////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- API ROUTES ------------------------------------- //
////////////////////////////////////////////////////////////////////////////////////



app.post('/login', cors(), userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.user);
})

app.post('/signup', cors(), userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
})

app.post('/games', gameController.setGame, (req, res) => {
  res.status(200).json(res.locals.newGame);
})

app.put('/games', gameController.updateGame, (req, res) => {
  res.status(200).json(res.locals.updated);
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

///////////////////////////////////////////////////////////////////////////
// ---------------------- Global Routes --------------------------------- //
//////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.json({test: 'hello'});
  // res.status(200).sendFile(path.resolve(__dirname, '../client/public/index.html'));
})

app.get('/*', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/public/index.html'));
  return;
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});




// app.listen(3000, () => console.log('Server listening on port 3000'));
