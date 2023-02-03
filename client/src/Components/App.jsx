import React from "react";
import io from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Welcome from './Welcome.jsx';
import Profile from './Profile.jsx';
import Builder from './Builder.jsx';
import Board from "./Board.jsx";
import Game from './Game.jsx';
import RandomGame from "./Random.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import PlayerSignIn from "./PlayerSignIn.jsx";
import PlayerGame from "./PlayerGame.jsx";


const socket = io.connect('http://localhost:3001');

function App() {

  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        {/* <nav>
          <Link to="/"> Home </Link>
          <Link to="/profile"> Profile </Link>
          <Link to="/buildgame"> Build Game </Link>
        </nav> */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/playerlogin" element={<PlayerSignIn />} />

            <Route path="/profile/:userid" element={<Profile />}/>
            <Route path="/playgame/:userid/:name" element={<Game />}/>
            <Route path="/play/:name" element={<PlayerGame />}/>
            <Route path="/buildgame/:name" element={<Board />}/>
            <Route path="/playgame/random" element={<RandomGame />}/>
            <Route path="*" />
          </Routes>
        </div>
      </div>
    </Router>
  )
  }

export default App;
