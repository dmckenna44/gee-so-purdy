import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client';
import * as actions from '../constants/actionTypes.js';

// const socket = io.connect('http://localhost:3001');
import socket from '../socket.js'

const PlayerSignIn = (props) => {

  const { userGames, password, name } = useSelector(state => state.game);
  console.log('player sign in state', userGames, password, name)

  const [playerName, setPlayerName] = useState('');
  const [gamePassword, setGamePassword] = useState('');
  const [errorMsg, showErrorMsg] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = (e) => {
    e.preventDefault();
    if (playerName !== '' && gamePassword !== '') {
      showErrorMsg(false);
      socket.emit('join_room', {password: gamePassword, player: playerName}, (response) => {
        console.log(response)
        if (response.found) {
          console.log('response from player sign in', response)
          dispatch({type: actions.SET_GAME, payload: response.room.game});
          dispatch({type: actions.SET_ROOM_ID, payload: response.room.id});
          dispatch({type: actions.SET_PLAYER_NAME, payload: playerName})
          dispatch({type: actions.UPDATE_PLAYERS, payload: response.room.players});
          navigate(`/play/${response.room.game.name}`);
        }
      })
    } else  {
      showErrorMsg(true);
    }
  }

  return (
    <div className="player-signin-container">
      <a className="back-to-prof-link" href="/">← Back to Home</a>

    <section className="accounts-container">
        <h1>Play a Game!</h1>
        <h3>Enter the <em>Name</em> and <em>Passcode</em> of the Game You Want to Join</h3>
        <form action="" className="player-signin">
          <label htmlFor="">Game Password</label>
          <input type="text" placeholder="ex: EJQW" required onChange={(e) => setGamePassword(e.target.value)}/>
          <label htmlFor="">What's Your Name?</label>
          <input type="text" placeholder="ex: Bob" required onChange={(e) => setPlayerName(e.target.value)}/>
          <button type="submit" onClick={handleSignin}>Enter Game</button>
        </form>

        <h3>{errorMsg ? 'All Fields Are Required!' : null}</h3>
      </section>
    </div>
  )
}

export default PlayerSignIn;