import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as types from '../constants/actionTypes.js';

import {socket} from '../apiRoutes.js';

const HostClue = (props) => {

  const dispatch = useDispatch();
  const {activeClueValue, roomID, clues} = useSelector(state => state.game);
  const currentClue = clues[props.column][props.index];


  const showClue = (e) => {
    dispatch({type: types.SET_ACTIVE_CLUE_VALUE, payload: props.value});
    dispatch({type: types.SET_ACTIVE_CLUE, payload: true});
    dispatch({type: types.SET_CURRENT_Q, payload: props.question});
    dispatch({type: types.SET_CURRENT_A, payload: props.answer});
    setClueAnswered();
    socket.emit('update_clue_value', {roomID: roomID, value: activeClueValue})
    socket.emit('update_clue_visibility', {roomID: roomID, question: props.question, answer: props.answer, index: [props.column, props.index] ,answered: true});
  }

  const setClueAnswered = (e) => {
    const newClue = {
      question: props.question,
      answer: props.answer,
      answered: true
    }
    dispatch({type: types.UPDATE_CLUE, payload: [props.column, props.index, newClue]});
  }

  return (
    <div className={`clue-card ${currentClue.answered ? 'invisible' : ''}`} onClick={showClue} >
      <h2 onClick={showClue}>{props.value}</h2>
    </div>
  )
}

export default HostClue;