import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_Q, SET_CURRENT_A, UPDATE_CLUE } from '../constants/actionTypes';


const ClueInputModal = (props) => {

  const {handleModal, hidden} = props;
  const dispatch = useDispatch();
  const { currentIndex, currentQuestion, currentAnswer } = useSelector(state => state.game)
  // console.log('from input modal: ', currentIndex, currentQuestion, currentAnswer);
  console.log('state from input modal: question', currentQuestion, 'answer', currentAnswer)
  

  const submitClue = (e) => {
    const newClue = {
      question: currentQuestion,
      answer: currentAnswer
    }
    dispatch({type: UPDATE_CLUE, payload: [currentIndex[0], currentIndex[1], newClue]});
    dispatch({type: SET_CURRENT_Q, payload: ''});
    dispatch({type: SET_CURRENT_A, payload: ''});
    handleModal(e);
  }



  if (hidden) return null;
  return (
    <div id='input-modal' className="hidden">
      <div className="inputDisplay">
        <p>Question</p>
        <input type="text" id="input-question" value={currentQuestion} onChange={(e) => dispatch({type: SET_CURRENT_Q, payload: e.target.value})}/>
      </div>
      <div className="inputDisplay">
        <p>Answer</p>
        <input type="text" id="input-answer" value={currentAnswer} onChange={(e) => dispatch({type: SET_CURRENT_A, payload: e.target.value})} />
      </div>
    <button type="button" onClick={submitClue}>Submit</button>
    <button onClick={handleModal}>Close</button>
  </div>
  )
}


export default ClueInputModal;