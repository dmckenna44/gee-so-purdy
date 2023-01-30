import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveGame } from '../reducers/gameReducer.js';
import * as actions from '../constants/actionTypes.js';
import Board from "./Board.jsx";


const BuildGameModal = (props) => {

  const {hidden, handleModal} = props;

  const dispatch = useDispatch();
  const currGame = useSelector(state => state.game);
  const navigate = useNavigate();

  useEffect(() => {
    if(currGame.questions && currGame.answers) dispatch({type: actions.SET_GAME, payload: currGame});
  }, [currGame])

  const { userId } = useSelector(state => state.game);

  const showGameBuilder = (e) => {
    e.preventDefault();
    dispatch(saveGame());
    navigate(`/buildgame/${currGame.name}`)
  }

  if (hidden) return null;
  return (
    <div className="build-game-modal">
      <h2>Set Up Your New Game</h2>
      <form action="submit" id="game-setup" hidden={false}>
        <label htmlFor="">What Should We Call Your Game?</label>
        <input type="text" required onChange={(e) => dispatch({type: actions.SET_NAME, payload: e.target.value})}></input>
        <label htmlFor="">How Many Categories?</label>
        <input type="number" name="numCategories" max={6} min={2} onChange={(e) => dispatch({type: actions.SET_NUM_CATEGORIES, payload: e.target.value})} />
        <label htmlFor="">How Many Questions per Category?</label>
        <input type="number" name="numQuestions" max={6} min={2} required={true} onChange={(e) => dispatch({type: actions.SET_NUM_QUESTIONS, payload: e.target.value})}/>
        <label htmlFor="">Set a Password for Your Game</label>
        <input type="text" required={true} onChange={(e) => dispatch({type: actions.SET_GAME_PW, payload: e.target.value})} />
        <button type="submit" onClick={showGameBuilder}>Ready to Go!</button>
      </form>
      <button onClick={handleModal}>Close</button>
    </div>
  )
}

export default BuildGameModal;