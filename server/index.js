const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser());
app.set('trust proxy', 1);


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
    server.listen(PORT, () => console.log(`server listening on port ${PORT}, rooms: ${rooms}`))

  })
  .catch(err => console.log(err));


///////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- SOCKET EVENTS ------------------------------------- //
///////////////////////////////////////////////////////////////////////////////////////
io.on('connection', socket => {
  console.log(`User connected: ${socket.id}`);
  clients.push(socket.id)

  socket.on('create_room', (data, cb) => {
    const players = data.players?.length ? data.players : [];
    const newRoom = {
      id: uuidv4(),
      pw: newGamePW(),
      game: data,
      players: players,
      active: players.length || false
    }
    rooms.push(newRoom);
    socket.join(newRoom);
    cb(newRoom)
  })

  socket.on('join_room', (data, cb) => {
    // I'm mutating the room before emitting the event...
    const response = {};
    rooms.forEach(room => {
      if (room.pw === data.password) {
        response.found = true;
        // First check if this is a game in progress (that's been saved)
        if (room.active) {
          response.active = true;
          response.players = room.players;
          cb(response);
          // return;
        } else {
          // Check if the player's name is in use already
          for (const player of room.players) {
            if (player.name.toLowerCase() === data.player.toLowerCase()) {
              response.ok = false;
              cb(response);
              return;
            }
          }
          // If the name isn't in use
          response.ok = true;
          response.room = room;
          const newPlayer = {name: data.player, score: 0, id: socket.id};
          room.players.push(newPlayer)
          socket.join(room)
          io.to(room).emit('player_joined', {newPlayerList: room.players});
        }
      }
    })
    cb(response)
  })

  socket.on('join_active_game', (data, cb) => {
    const response = {};
    rooms.forEach(room => {
      if (room.pw === data.password) {
        socket.join(room);
        response.room = room;
        cb(response)
      }
    })
  })

  socket.on('get_players', (data, cb) => {
    const response = {};
    rooms.forEach(room => {
      if (room.game.name === data.name && room.game.password === data.password) {
        response.found = true;
        response.playerList = room.players;
      }
    })
    if (response.found) cb(response);
  })

  socket.on('send_new_scores', (data, cb) => {
    // receive player name and new score from client and adjust in the room state
    const {roomID, playerName, value, correct} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
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
        player.score = Number(value);
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
    const {roomID, active, activePlayer} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    io.to(currentRoom).emit('receive_buzzer_change', {buzzersActive: active, activePlayer: activePlayer});
  });

  socket.on('send_active_player', data => {
    const {roomID, name} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    io.to(currentRoom).emit('receive_active_player', {activePlayer: name});
  })

  socket.on('send_reset_buzzers', data => {
    const {roomID, canAnswer} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    io.to(currentRoom).emit('receive_reset_buzzers', true);
  })
  
  socket.on('send_update_buzzers', data => {
    const {roomID, activePlayer} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    io.to(currentRoom.emit('receive_update_buzzers', activePlayer))
  })

  socket.on('send_toggle_answer', data => {
    const {roomID, show} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    io.to(currentRoom).emit('receive_toggle_answer', {show: show});
  })

  socket.on('send_updated_game', data => {
    const {roomID, newState} = data;
    const currentRoom = rooms.find(room => room.id === roomID);
    io.to(currentRoom).emit('receive_updated_game', {newState: newState});

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
  });
});

////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------------------------------------------------ //
////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- API ROUTES ------------------------------------- //
////////////////////////////////////////////////////////////////////////////////////

app.post('/api/login', cors(), userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

app.post('/api/signup', cors(), userController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser);
});

app.post('/api/games', gameController.setGame, (req, res) => {
  res.status(200).json(res.locals.newGame);
});

app.put('/api/games', gameController.updateGame, (req, res) => {
  res.status(200).json(res.locals.updated);
});

app.delete('/api/games', gameController.deleteGame, (req, res) => {
  res.status(200).json(res.locals.deleted);
});

app.get('/api/activegames/:userid', gameController.getActiveGames, (req, res) => {
  res.status(200).json(res.locals.activeGameList);
})

app.put('/api/activegames', gameController.saveActiveGame, (req, res) => {
  res.status(200).json(res.locals.saveActiveResponse);
})

app.delete('/api/activegames', gameController.deleteActiveGame, (req, res) => {
  res.status(200).json(res.locals.deleted)
})

app.get('/api/games/:userid', gameController.getGames, (req, res) => {
  res.status(200).json(res.locals.games);
});

///////////////////////////////////////////////////////////////////////////
// ---------------------- Global Routes --------------------------------- //
//////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  app.post('/api/login', cors(), userController.verifyUser, (req, res) => {
    res.status(200).json(res.locals.user);
  });

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello from the backend");
  });
}

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

