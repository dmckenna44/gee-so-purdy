import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as types from '../constants/actionTypes.js';

import {socket} from '../apiRoutes.js';

const HostClue = (props) => {

  const {column, index, value, question, answer} = props;
  const { roomID, clues} = useSelector(state => state.game);
  const dispatch = useDispatch();
  const state = useSelector(state => state.game);
  console.log('state from host clue: ', state);

  const currentClue = clues[column][index];

  const showClue = (e) => {
    dispatch({type: types.SET_ACTIVE_CLUE_VALUE, payload: value});
    dispatch({type: types.SET_ACTIVE_CLUE, payload: true});
    dispatch({type: types.SET_CURRENT_Q, payload: question});
    dispatch({type: types.SET_CURRENT_A, payload: answer});
    setClueAnswered();
    // socket.emit('update_clue_value', {roomID: roomID, value: props.value})
    socket.emit('update_clue_visibility', {roomID: roomID, question: question, answer: answer, index: [column, index], answered: true});
  }

  const setClueAnswered = (e) => {
    const newClue = {
      question: props.question,
      answer: props.answer,
      answered: true
    }
    dispatch({type: types.UPDATE_CLUE, payload: [column, index, newClue]});
  }

  return (
    <div className={`clue-card ${currentClue?.answered ? 'invisible' : ''}`} onClick={showClue} >
      <h2 onClick={showClue}>{value}</h2>
    </div>
  )
}

export default HostClue;