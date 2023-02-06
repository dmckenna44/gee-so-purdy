import React, {useState} from "react";
import { useSelector } from "react-redux";
import HostClue from './HostClue.jsx';

const HostColumn = (props) => {

  const {handleModal} = props;
  
  const clueList = props.questions.map((clue, i) => {
    return <HostClue
        key={i}  
        column={props.index}
        index={i} 
        value={(i+1)*100} 
        question={clue} 
        answer={props.answers[i]}
        handleModal={handleModal} 
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

export default HostColumn;