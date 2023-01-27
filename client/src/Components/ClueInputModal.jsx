import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const ClueInputModal = (props) => {

  const {handleModal} = props;
  const dispatch = useDispatch();
  const { currentIndex, currentQuestion, currentAnswer } = useSelector(state => state.game)
  

  const submitClue = (e) => {
    const newClue = {
      question: currentQuestion,
      answer: currentAnswer
    }
    console.log('state info from modal', currentIndex, newClue)
    dispatch({type: 'UPDATE_CLUE', payload: [currentIndex[0], currentIndex[1], newClue]});
    dispatch({type:'SET_CURRENT_Q', payload: ''});
    dispatch({type:'SET_CURRENT_A', payload: ''});
    handleModal(e);
  }


  return (
    <div id='input-modal' className="hidden">
      <div className="inputDisplay">
        <p>Question</p>
        <input type="text" id="input-question" onChange={(e) => dispatch({type:'SET_CURRENT_Q', payload: e.target.value})}/>
      </div>
      <div className="inputDisplay">
        <p>Answer</p>
        <input type="text" id="input-answer" onChange={(e) => dispatch({type:'SET_CURRENT_A', payload: e.target.value})} />
      </div>
    <button type="button" onClick={submitClue}>Submit</button>
  </div>
  )
}


export default ClueInputModal;