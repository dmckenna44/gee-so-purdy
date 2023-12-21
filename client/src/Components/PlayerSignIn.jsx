import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../constants/actionTypes.js';

import ActiveGameSignInModal from "./ActiveGameSignInModal.jsx";
import {socket} from '../apiRoutes.js';

const PlayerSignIn = (props) => {

  const [playerName, setPlayerName] = useState('');
  const [gamePassword, setGamePassword] = useState('');
  const [errorMsg, showErrorMsg] = useState(false);
  const [sameNameErr, showSameNameErr] = useState(false);
  const [wrongPwErr, showWrongPwErr] = useState(false);
  const [activeGameError, showActiveGameError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activePlayerList, setActivePlayerList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('check_active_game', (data) => {

    })
  }, [])

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  }

  const handleSignin = (e) => {
    e.preventDefault();
    if (playerName !== '' && gamePassword !== '') {
      showErrorMsg(false);
      socket.emit('join_room', {password: gamePassword, player: playerName}, (response) => {
        console.log('join game response: ', response)
        if (response.found) {
          if (response.ok) {
            dispatch({type: actions.SET_GAME, payload: response.room.game});
            dispatch({type: actions.SET_ROOM_ID, payload: response.room.id});
            dispatch({type: actions.SET_PLAYER_NAME, payload: playerName})
            dispatch({type: actions.UPDATE_PLAYERS, payload: response.room.players});
            navigate(`/play/${response.room.game.name}`);
          } else if (response.active) {
            let playerExists = false
            for (const player of response.players) {
              if (playerName.toLowerCase() === player.name.toLowerCase()) playerExists = true;
            }
            if (playerExists) {
              socket.emit('join_active_game', {name: playerName, password: gamePassword}, response => {
                console.log('response from join_active_game: ', response)
                dispatch({type: actions.SET_GAME, payload: response.room.game});
                dispatch({type: actions.SET_ROOM_ID, payload: response.room.id});
                dispatch({type: actions.SET_PLAYER_NAME, payload: playerName})
                navigate(`/play/${response.room.game.name}`);
              })
            } else {
              showActiveGameError(true)
            }
          } else showSameNameErr(true);
        } else {
          showWrongPwErr(true);
        }
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
        <h3>{sameNameErr ? 'There is already a player with that name!' : null}</h3>
        <h3>{wrongPwErr ? 'No games found with that password' : null}</h3>
        <h3>{activeGameError ? 'This is a game in progress, only original players may join' : null}</h3>

      </section>
      <ActiveGameSignInModal hidden={!showModal} handleModal={handleModal} players={activePlayerList}/>
    </div>
  )
}

export default PlayerSignIn;