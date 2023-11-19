import React from "react";
import { useSelector, useDispatch } from "react-redux";
import parse from 'html-react-parser';
import * as types from '../constants/actionTypes.js';

import {socket} from '../apiRoutes.js';

const HostClue = (props) => {

  const {column, index, value, question, answer, mediaURL} = props;
  const { roomID, clues} = useSelector(state => state.game);
  const dispatch = useDispatch();

  const currentClue = clues[column][index];

  const showClue = (e) => {
    dispatch({type: types.SET_ACTIVE_CLUE_VALUE, payload: value});
    dispatch({type: types.SET_ACTIVE_CLUE, payload: true});
    dispatch({type: types.SET_CURRENT_Q, payload: question});
    dispatch({type: types.SET_CURRENT_A, payload: answer});
    dispatch({type: types.SET_CURRENT_MEDIA_URL, payload: mediaURL})
    setClueAnswered();
    // socket.emit('update_clue_value', {roomID: roomID, value: props.value})
    socket.emit('update_clue_visibility', {roomID: roomID, question: question, answer: answer, index: [column, index], answered: true});
  }

  const setClueAnswered = (e) => {
    const newClue = {
      question: question,
      answer: answer,
      mediaURL: mediaURL,
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