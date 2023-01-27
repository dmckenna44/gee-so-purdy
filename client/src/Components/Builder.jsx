import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveGame } from '../reducers/gameReducer.js';
import * as actions from '../actions/actions.js';
import Board from "./Board.jsx";


const Builder = props => {
  const currGame = useSelector(state => state.game);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useSelector(state => state.game);

  const saveToDB = () => {
    dispatch(saveGame());
    navigate(`/profile/${userId}`)
  }

  const showGameBuilder = (e) => {
    e.preventDefault();
    // console.log('game grom builder', currGame)
    document.getElementById('game-setup').classList.add('hidden');
    document.getElementById('game-builder').classList.remove('hidden');
  }

    return (
      <div className="game-builder-container">
        <div id="overlay" className="hidden"></div>
        <form action="submit" id="game-setup" hidden={false}>
          <label htmlFor="">What Should We Call Your Game?</label>
          <input type="text" required onChange={(e) => dispatch({type: 'SET_NAME', payload: e.target.value})}></input>
          <label htmlFor="">How Many Categories?</label>
          <input type="number" name="numCategories" max={6} min={2} onChange={(e) => dispatch({type: 'SET_NUM_CATEGORIES', payload: e.target.value})} />
          <label htmlFor="">How Many Questions per Category?</label>
          <input type="number" name="numQuestions" max={6} min={2} required={true} onChange={(e) => dispatch({type: 'SET_NUM_QUESTIONS', payload: e.target.value})}/>
          <button type="submit" onClick={showGameBuilder}>Ready to Go</button>
        </form>

        <main id="game-builder" >
          <h2>{currGame.name}</h2>
          <Board state={currGame} />
          <button id="btnSaveGame" onClick={saveToDB}>Save Game</button>
        </main>
  
      </div>
  
    )
  }


export default Builder;