import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const CluePlayModal = (props) => {

  const [hideAnswer, setHideAnswer] = useState(true);
  const {hidden, handleModal} = props;

  const showAnswer = (e) => {
    setHideAnswer(false);
  }
  useEffect(() => {
    setHideAnswer(true);
  }, [hidden])

  const { currentQuestion, currentAnswer } = useSelector(state => state.game);

  console.log('q + a', currentAnswer, currentQuestion)

  if (hidden) return null;
  return (
    <div id="play-modal">
    <div id="question-display">
        <p><b><em>Question:</em> </b></p>
        <p>{currentQuestion}</p>
      </div>
      <div id="answer-display" hidden={hideAnswer}>
        <p><b><em>Answer:</em> </b></p>
        <p>{currentAnswer}</p>
      </div>
      <div className="btn-container">
        <button type="button" onClick={showAnswer}> Show Answer </button>
        <button type="button" onClick={handleModal}> Done </button>

      </div>
    </div>

  )
}

export default CluePlayModal;

