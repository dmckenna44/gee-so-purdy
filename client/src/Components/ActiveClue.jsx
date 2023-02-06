import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {socket} from '../apiRoutes.js';

const ActiveClue = () => {

  const [answerVisible, setAnswerVisible] = useState(false);
  const {currentQuestion, currentAnswer, roomID, playerName} = useSelector(state => state.game);
  console.log('q from active clue', currentQuestion, 'a from active clue', currentAnswer)
  const dispatch = useDispatch();

  const resetActiveClue = (e) => {
    e.stopPropagation();
    if (!playerName) socket.emit('send_deactivate_clue', {roomID: roomID})
  }

  const showAnswer = (e) => {
    e.stopPropagation();
    setAnswerVisible(true);
  }

  return (
    <div className="active-clue-expand">
      <h3>{currentQuestion}</h3>
      <h3>{ answerVisible ? currentAnswer : null}</h3>
      <button onClick={showAnswer} style={{display: `${playerName ? 'none' : 'block'}`}}>Show Answer</button>
      <button onClick={resetActiveClue} style={{display: `${playerName ? 'none' : 'block'}`}}>Done</button>
    </div>
  )
}

export default ActiveClue;