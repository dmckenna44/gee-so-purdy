import React from "react";
import { useSelector } from "react-redux";


const PlayerClue = (props) => {

  const {clues} = useSelector(state => state.game)
  const currentClue = clues[props.column][props.index];

  return (
    <div className={`clue-card-player ${currentClue.answered ? 'invisible' : ''}`} >
      
      <h2>{props.value}</h2>

      <div className={"clue-play-modal hidden"} >
        <p className="play-question">{props.question}</p>
        <p className="play-answer" >{props.answer}</p>
      </div>
    </div>
  )
}

export default PlayerClue;