import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../constants/actionTypes.js';
import buzzerSound from '../buzzersound.wav'

import {socket} from '../apiRoutes.js';

const Buzzer = (props) => {

  const {roomID, playerName, buzzersActive, activePlayer, canAnswer} = useSelector(state => state.game);
  const dispatch = useDispatch();

  const ringIn = (e) => {
    e.preventDefault();
    if (buzzersActive && !activePlayer) {
      // add active player score to the store
      // send an event to the host so they can update the score/go to the next clue
      // add playerName to store to track each player on the player side, use activePlayer for the host
      // const sound = new Audio(buzzerSound);
      // sound.play();
      dispatch({type: actions.SET_ACTIVE_PLAYER, payload: playerName});
      socket.emit('send_active_player', {roomID: roomID, name: playerName});
      socket.emit('send_buzzer_change', {roomID: roomID, active: !buzzersActive});
      // dispatch({type: actions.SET_CAN_ANSWER, payload: false});
      dispatch({type: actions.SET_BUZZERS_ACTIVE, payload: !buzzersActive});
    }
  }

  if(!buzzersActive || !canAnswer) return null;
  return (
    <div className="buzzer-container">
      <button className="buzzer-btn" onClick={ringIn}>Ring In!</button>
    </div>
  )
}


export default Buzzer;