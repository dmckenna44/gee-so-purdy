import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client';
import * as actions from '../constants/actionTypes.js';

const socket = io.connect('http://localhost:3001');

const PlayerSignIn = (props) => {

  const { userGames, password, name } = useSelector(state => state.game);
  console.log('player sign in state', userGames, password, name)

  const [gameName, setGameName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [gamePassword, setGamePassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = (e) => {
    e.preventDefault();
    socket.emit('check_rooms', {name: gameName, password: gamePassword, player: playerName}, (response) => {
      console.log(response)
      if (response.found) {
        console.log('response from player sign in', response)
        dispatch({type: actions.SET_GAME, payload: response.room.game});
        dispatch({type: actions.ADD_PLAYER, payload: playerName});
        navigate(`/play/${response.room.game.name}`);
      }
    })
  }

  return (
    <div className="player-signin-container">
      <div >
        <form action="" className="player-signin">
          <label htmlFor="">What's Your Name?</label>
          <input type="text" onChange={(e) => setPlayerName(e.target.value)}/>
          <label htmlFor="">Game Name</label>
          <input type="text" onChange={(e) => setGameName(e.target.value)}/>
          <label htmlFor="">Game Password</label>
          <input type="text" onChange={(e) => setGamePassword(e.target.value)}/>
          <button onClick={handleSignin}>Enter Game</button>
        </form>
      </div>
    </div>
  )
}

export default PlayerSignIn;