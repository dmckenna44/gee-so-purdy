import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {socket} from '../apiRoutes.js';

const ActiveClue = () => {

  // const [answerVisible, setAnswerVisible] = useState(false);
  const {currentQuestion, currentAnswer, roomID, playerName, answerVisible} = useSelector(state => state.game);
  const dispatch = useDispatch();

  const resetActiveClue = (e) => {
    e.stopPropagation();
    socket.emit('send_reset_buzzers', {roomID: roomID});
    socket.emit('send_buzzer_change', {roomID: roomID, active: false});
    socket.emit('send_toggle_answer', {roomID: roomID, show: false})
    if (!playerName) socket.emit('send_deactivate_clue', {roomID: roomID})
  }

  const showAnswer = (e) => {
    e.stopPropagation();
    socket.emit('send_toggle_answer', {roomID: roomID, show: true})
    socket.emit('send_buzzer_change', {roomID: roomID, active: false});
    socket.emit('send_reset_buzzers', {roomID: roomID});
  }

  return (
    <div className="active-clue-expand">
      <h3>{currentQuestion}</h3>
      <h3><em>{ answerVisible ? currentAnswer : null}</em></h3>
      <button onClick={showAnswer} style={{display: `${playerName ? 'none' : 'block'}`}}>Show Answer</button>
      <button onClick={resetActiveClue} style={{display: `${playerName ? 'none' : 'block'}`}}>Done</button>
    </div>
  )
}

export default ActiveClue;