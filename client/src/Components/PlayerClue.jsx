import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const PlayerClue = (props) => {

  const dispatch = useDispatch();
  const {handleModal} = props;

  return (
    <div className={`clue-card`} >
      
      <h2>{props.value}</h2>

      <div className={"clue-play-modal hidden"} >
        <p className="play-question">{props.question}</p>
        <p className="play-answer" >{props.answer}</p>
      </div>
    </div>
  )
}

export default PlayerClue;