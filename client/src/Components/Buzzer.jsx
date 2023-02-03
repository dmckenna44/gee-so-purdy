import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from 'socket.io-client';
import * as actions from '../constants/actionTypes.js';

// const socket = io.connect('http://localhost:3001');
import socket from '../socket.js'

const Buzzer = (props) => {

  const {roomID, playerName, activeClueValue, correctResponse, players, buzzersActive, activePlayer} = useSelector(state => state.game);
  const dispatch = useDispatch();

  
  const ringIn = (e) => {
    e.preventDefault();
    if (buzzersActive && !activePlayer) {
      // need to get the value of the active clue
      // add active player score to the store
      // send an event to the host so they can update the score/go to the next clue
      // add playerName to store to track each player on the player side, use activePlayer for the host
      dispatch({type: actions.SET_ACTIVE_PLAYER, payload: playerName});
      socket.emit('send_active_player', {roomID: roomID, name: playerName});
      socket.emit('send_buzzer_change', {roomID: roomID, active: !buzzersActive});
      dispatch({type: actions.SET_BUZZERS_ACTIVE, payload: !buzzersActive});
      // socket.emit('send_new_scores', {roomID: roomID, playerName: playerName, value: 200, correct: correctResponse})
      console.log('active player from buzzer', activePlayer)
      console.log('players from store', players)
    }
  }

  if(!buzzersActive) return null;
  return (
    <div className="buzzer-container">
      <button className="buzzer-btn" onClick={ringIn}>Ring In!</button>
    </div>
  )
}


export default Buzzer;