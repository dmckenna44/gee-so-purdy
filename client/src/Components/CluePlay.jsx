import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

/*
props passed down from Column:
      key={i}  
        column={props.index}
        index={i} 
        value={(i+1)*100} 
        question={clue} 
        answer={props.answers[i]} 
*/


const CluePlay = (props) => {

  const dispatch = useDispatch();

  const showModal = (e) => {
    dispatch({type: 'SET_CURRENT_Q', payload: props.question});
    dispatch({type: 'SET_CURRENT_A', payload: props.answer});
    document.getElementById('play-modal').classList.remove('hidden');
  }

  const closeModal = (e) => {
    // e.preventDefault();
    e.target.closest('div').hidden = true;
    console.log(document.getElementById('overlay'))
    document.getElementById('overlay').style.display = 'none';
    // console.log(document.getElementById('overlay').classList)
  }

  const showAnswer = e => {
    const answer = e.target.closest('p');
    console.log(e.target)
    console.log(answer);
  }


  return (
    <div className="clue-card" onClick={showModal}>
      <h2 onClick={showModal}>{props.value}</h2>

      <div className={"clue-play-modal hidden"} >
        <p className="play-question">{props.question}</p>
        <p className="play-answer" hidden={true}>{props.answer}</p>

        <div className="btn-container">
          <button onClick={showAnswer}>Show Answer</button>
          <button onClick={closeModal}>Done</button>

        </div>
      </div>
    </div>
  )
}

export default CluePlay;