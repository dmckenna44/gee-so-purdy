import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_Q, SET_CURRENT_A, UPDATE_CLUE } from '../constants/actionTypes';


const ClueInputModal = (props) => {

  const {handleModal, hidden} = props;
  const dispatch = useDispatch();
  const { currentIndex, currentQuestion, currentAnswer } = useSelector(state => state.game);
  
  const submitClue = (e) => {
    const newClue = {
      question: currentQuestion,
      answer: currentAnswer
    }
    dispatch({type: UPDATE_CLUE, payload: [currentIndex[0], currentIndex[1], newClue]});
    dispatch({type: SET_CURRENT_Q, payload: ''});
    dispatch({type: SET_CURRENT_A, payload: ''});
    handleModal(e);
  };


  if (hidden) return null;
  return (
    <div id='input-modal'>
      <h2>Add a New Clue</h2>
      <div className="inputDisplay">
        <h3>Question</h3>
        {/* <input type="text" id="input-question" value={currentQuestion} onChange={(e) => dispatch({type: SET_CURRENT_Q, payload: e.target.value})}/> */}
        <textarea id="input-question" rows={5} cols={40} value={currentQuestion} onChange={(e) => dispatch({type: SET_CURRENT_Q, payload: e.target.value})}/>
      </div>
      <div className="inputDisplay">
        <h3>Answer</h3>
        <input type="text" id="input-answer" value={currentAnswer} onChange={(e) => dispatch({type: SET_CURRENT_A, payload: e.target.value})} />
      </div>
      <div className="clue-input-btns">
        <button type="button" onClick={submitClue}>Submit</button>
        <button className="close-btn" onClick={handleModal}>Close</button>
      </div>
  </div>
  )
}


export default ClueInputModal;