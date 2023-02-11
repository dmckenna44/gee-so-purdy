import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveGame, loadGames } from '../reducers/gameReducer.js';
import * as actions from '../constants/actionTypes.js';



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
    dispatch(saveGame())
      .then((response) => {
        dispatch(loadGames(userId));
        dispatch({type: actions.SET_GAME, payload: response})
        navigate(`/buildgame/${response._id}`)
      })
  }

  if (hidden) return null;
  return (
    <div className="build-game-modal">
      <h2>Set Up Your New Game</h2>
      <form action="submit" id="game-setup" hidden={false}>
        <label htmlFor="">What Should We Call Your Game?</label>
        <input type="text" required onChange={(e) => dispatch({type: actions.SET_GAME_NAME, payload: e.target.value})}></input>
        <label htmlFor="">How Many Categories?</label>
        <input type="number" name="numCategories" max={6} min={2} onChange={(e) => dispatch({type: actions.SET_NUM_CATEGORIES, payload: e.target.value})} />
        <label htmlFor="">How Many Questions per Category?</label>
        <input type="number" name="numQuestions" max={6} min={2} required={true} onChange={(e) => dispatch({type: actions.SET_NUM_QUESTIONS, payload: e.target.value})}/>
        <button type="submit" onClick={showGameBuilder}>Ready to Go!</button>
      </form>
      <button onClick={handleModal}>Close</button>
    </div>
  )
}

export default BuildGameModal;