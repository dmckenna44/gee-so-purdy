import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../constants/actionTypes.js';

import {socket} from '../apiRoutes.js';

const PlayerSignIn = (props) => {

  const [playerName, setPlayerName] = useState('');
  const [gamePassword, setGamePassword] = useState('');
  const [errorMsg, showErrorMsg] = useState(false);
  const [noRoomFound, showNoRoomFound] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = (e) => {
    e.preventDefault();
    if (playerName !== '' && gamePassword !== '') {
      showErrorMsg(false);
      socket.emit('join_room', {password: gamePassword, player: playerName}, (response) => {
        if (response.found) {
          dispatch({type: actions.SET_GAME, payload: response.room.game});
          dispatch({type: actions.SET_ROOM_ID, payload: response.room.id});
          dispatch({type: actions.SET_PLAYER_NAME, payload: playerName})
          dispatch({type: actions.UPDATE_PLAYERS, payload: response.room.players});
          navigate(`/play/${response.room.game.name}`);
        } else showNoRoomFound(true)
      })
    } else  {
      showErrorMsg(true);
    }
  }

  return (
    <div className="player-signin-container">
      <p className="back-to-prof-link" onClick={() => navigate('/')}>← Back to Home</p>

    <section className="accounts-container">
        <h1>Play a Game!</h1>
        <h3>Enter the <em>Name</em> and <em>Passcode</em> of the Game You Want to Join</h3>
        <form action="" className="player-signin">
          <label htmlFor="">What's Your Name?</label>
          <input type="text" placeholder="ex: Bob" required onChange={(e) => setPlayerName(e.target.value)}/>
          <label htmlFor="">Game Password</label>
          <input type="text" placeholder="ex: EJQW" required onChange={(e) => setGamePassword(e.target.value)}/>
          <button type="submit" onClick={handleSignin}>Enter Game</button>
        </form>

        <h3>{errorMsg ? 'All Fields Are Required!' : null}</h3>
        <h3>{noRoomFound ? 'No Room Found With That Passcode' : null}</h3>
      </section>
    </div>
  )
}

export default PlayerSignIn;