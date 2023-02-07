import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateGame, loadGames } from '../reducers/gameReducer.js';
import { SET_GAME } from "../constants/actionTypes.js";
import EditColumn from './EditColumn.jsx';
import ClueInputModal from "./ClueInputModal.jsx";


const EditGame= (props) => {

  const {name} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, userGames, clues, categories } = useSelector(state => state.game);
  
  useEffect(() => {
    // const currGame = userGames.find(game => game.name === name);
    dispatch(loadGames(userId));
    // dispatch({type: SET_GAME, payload: currGame});
    console.log('clues from board', clues);
  }, [dispatch, userId])

  const [showModal, setShowModal] = useState(false);
  const [btnText, setBtnText] = useState('Save Game');

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  }

  const saveToDB = () => {
    dispatch(updateGame())
      .then(res => {
        setBtnText('Game Saved!')
        setTimeout(() => {
          setBtnText('Save Game')
        }, 1000)
      })
      .catch(err => console.log(err))
  }

  // create an array of columns
  // each column will be an array with the category at index 0 and the clues as the rest of the elements
  const columns = clues.map((cat, i) => {
    return <EditColumn 
        key={i} 
        index={i} 
        category={categories[i]} 
        clues={cat} 
        handleModal={handleModal}
      />
  })

  return (
    <div className="game-editor-container">
      <p className="back-to-prof-link" onClick={() => navigate(`/profile/${userId}`)}>← Back to Profile</p>
      <div className="overlay" hidden={!showModal}></div>
        <h1>{name}</h1>
      <div className="edit-game-board">
        <ClueInputModal hidden={!showModal} handleModal={handleModal} />
        { columns }

      </div>
      <button id="btnSaveGame" onClick={saveToDB}>{btnText}</button>
    </div>
  )
}


export default EditGame;