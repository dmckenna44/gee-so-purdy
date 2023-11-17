import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import parse from 'html-react-parser';

import {socket} from '../apiRoutes.js';
import * as actions from '../constants/actionTypes.js';

const ActiveClue = () => {

  // const [answerVisible, setAnswerVisible] = useState(false);
  const { currentQuestion, currentAnswer, roomID, playerName, answerVisible, buzzersActive } = useSelector(state => state.game);
  const dispatch = useDispatch();
  console.log('question', currentQuestion, 'answer', currentAnswer)

  const resetActiveClue = (e) => {
    e.stopPropagation();
    socket.emit('send_reset_buzzers', {roomID: roomID});
    socket.emit('send_buzzer_change', {roomID: roomID, active: false});
    socket.emit('send_toggle_answer', {roomID: roomID, show: false})
    if (!playerName) socket.emit('send_deactivate_clue', {roomID: roomID})
  }

  const toggleBuzzers = (e) => {
    e.preventDefault();
    socket.emit('send_buzzer_change', {roomID: roomID, active: !buzzersActive});
    dispatch({type: actions.SET_BUZZERS_ACTIVE, payload: !buzzersActive});
  }

  const showAnswer = (e) => {
    e.stopPropagation();
    socket.emit('send_toggle_answer', {roomID: roomID, show: true})
    socket.emit('send_buzzer_change', {roomID: roomID, active: false});
    socket.emit('send_reset_buzzers', {roomID: roomID}); 
  }

  return (
    <div className="active-clue-expand">
      <p className="active-question-display">{parse(currentQuestion)}</p>
      <p className="active-answer-display"><em>{ answerVisible ? parse(currentAnswer) : null}</em></p>
      <button className="open-response-btn" onClick={toggleBuzzers} style={{display: `${playerName ? 'none' : 'block'}`}}>{!buzzersActive ? 'Open Responses' : 'Reset'}</button>
      <button onClick={showAnswer} style={{display: `${playerName ? 'none' : 'block'}`}}>Show Answer</button>
      <button onClick={resetActiveClue} style={{display: `${playerName ? 'none' : 'block'}`}}>Done</button>
    </div>
  )
}

export default ActiveClue;