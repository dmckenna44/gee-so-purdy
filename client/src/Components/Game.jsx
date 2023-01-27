import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import getTrivia from "../random.js";
// import { randomGame } from "../reducers/gameReducer.js";
import ColumnPlay from "./ColumnPlay.jsx";



const Game = (props) => {

  const { name } = useParams();
  const dispatch = useDispatch();

  const currGame = useSelector(
      state => state.game.userGames.find(game => {
        return game.name === name
      })
    )

  const { currentQuestion, currentAnswer } = useSelector(state => state.game);

  console.log('q + a', currentAnswer, currentQuestion)
  console.log('current game', currGame)
  console.log('current game clues', currGame.clues)

  const columns = currGame.clues.map((clue, i) => {
    return <ColumnPlay 
        key={i} 
        index={i} 
        category={clue.category} 
        questions={clue.questions}
        answers={clue.answers} 
      />
  })

  console.log(columns);
  // const columns = [<p>Hello</p>, <p>Hello</p>, <p>Hello</p>, <p>Hello</p>]
  

  const closeModal = (e) => {
    document.getElementById('play-modal').classList.add('hidden');
    document.getElementById('answer-display').classList.add('hidden');
  }

  const showAnswer = () => {
    document.getElementById('answer-display').classList.remove('hidden');
  }

  return (
    <div id="playGameContainer">
      <h2>{currGame.name}</h2>
    <div className="playGameBoard">
      <div id='play-modal' className="hidden">
      <div id="question-display">
          <p><b><em>Question:</em> </b></p>
          <p>{currentQuestion}</p>
        </div>
        <div id="answer-display" className="hidden">
          <p><b><em>Answer:</em> </b></p>
          <p>{currentAnswer}</p>
        </div>
        <div className="btn-container">
          <button type="button" onClick={showAnswer}> Show Answer </button>
          <button type="button" onClick={closeModal}> Done </button>

        </div>
      </div>
      {columns}
    </div>
    </div>
  )
} 


export default Game;