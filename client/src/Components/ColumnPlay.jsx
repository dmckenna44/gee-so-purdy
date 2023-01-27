import React, {useState} from "react";
import { useSelector } from "react-redux";
import CluePlay from './CluePlay.jsx';

/*
props: {
        key={i} 
        index={i} 
        category={clue.category} 
        questions={clue.questions} Array
        answers={clue.answers} Array
}

*/

const ColumnPlay = (props) => {

  console.log('columnplay props', props);
  const clueList = props.questions.map((clue, i) => {
    return <CluePlay 
        key={i}  
        column={props.index}
        index={i} 
        value={(i+1)*100} 
        question={clue} 
        answer={props.answers[i]} 
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

export default ColumnPlay;