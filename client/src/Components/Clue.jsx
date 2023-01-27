import e from "cors";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

/*
props passed down from Column:
  key: number
  column: number (index)
  index: number
  value: number
  question: string
  answer: string
*/


const Clue = (props) => {

  const dispatch = useDispatch();

  // const question = useSelector(state => { 
  //   state.game.currentQuestion
  // })
  // const answer = useSelector(state => {
  //   state.game.currentAnswer
  // })

  // const [question, setQuestion] = useState('');
  // const [answer, setAnswer] = useState('');

  let currEl;

  const showModal = (e) => {
    dispatch({type: 'SET_CURRENT_INDEX', payload: [props.column, props.index]});
    props.handleModal(e);
    // document.getElementById('input-modal').classList.remove('hidden');
    // const modal = document.getElementById('input-modal');
    // console.log(modal)
  }


  return (
    <div className="clue-card" onClick={showModal}>
      <h2 onClick={showModal}>{props.value}</h2>

      {/* <div className={"input-modal"} style={{display: 'none'}}>
      <p>{props.question}</p>
      <input type="text" className="input-question" onChange={(e) => dispatch({type:'SET_CURRENT_Q', payload: e.target.value})}/>
      <p>{props.answer}</p>
      <input type="text" className="input-answer" onChange={(e) => dispatch({type:'SET_CURRENT_A', payload: e.target.value})} />
      <button type="button" onClick={closeModal}>Submit</button> */}
      {/* </div> */}
    </div>
  )
}

export default Clue;