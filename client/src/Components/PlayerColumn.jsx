import React, {useState} from "react";
import { useSelector } from "react-redux";
import PlayerClue from "./PlayerClue.jsx";


const PlayerColumn = (props) => {
  
  const clueList = props.clues.map((clue, i) => {
    return <PlayerClue
        key={i}  
        column={props.index}
        index={i} 
        value={(i+1)*100} 
        question={clue.question} 
        answer={clue.answer}
      />
  })

  return (
    <div className="column">
      <div className="category-card">
        <h2>{props.category}</h2>
      </div>
      {clueList}

    </div>
  )
}

export default PlayerColumn;