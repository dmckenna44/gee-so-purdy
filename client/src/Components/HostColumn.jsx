import React from "react";
import HostClue from './HostClue.jsx';

const HostColumn = (props) => {

  const {handleModal, category, index, questions, answers, urls} = props;

  console.log('urls from column: ', urls)
  
  const clueList = questions.map((clue, i) => {
    return <HostClue
        key={i}  
        column={index}
        index={i} 
        value={(i+1)*100} 
        question={clue} 
        answer={answers[i]}
        mediaURL={urls[i]}
        handleModal={handleModal} 
      />
  })

  return (
    <div className="column">
      <div className="category-card">
        <h2>{category}</h2>
      </div>
      {clueList}

    </div>
  )
}

export default HostColumn;