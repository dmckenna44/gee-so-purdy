import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_CURRENT_Q, SET_CURRENT_A, SET_CURRENT_INDEX } from "../constants/actionTypes";


const Clue = (props) => {
  const { question, answer, column, handleModal, index, value } = props;

  const dispatch = useDispatch();
 
  const { currentQuestion, currentAnswer, clues } = useSelector(state => state.game);

  const showModal = (e) => {
    dispatch({type: SET_CURRENT_INDEX, payload: [column, index]});
    dispatch({type: SET_CURRENT_Q, payload: question});
    dispatch({type: SET_CURRENT_A, payload: answer});
    handleModal(e);
  }

  return (
    <div className="clue-card" onClick={showModal}>
      <h2 onClick={showModal}>{value}</h2>
    </div>
  )
}

export default Clue;