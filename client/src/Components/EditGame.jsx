import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateGame, loadGames } from '../reducers/gameReducer.js';
import { SET_GAME_NAME, CLEAR_GAME, SET_GAME } from "../constants/actionTypes.js";
import EditColumn from './EditColumn.jsx';
import ClueInputModal from "./ClueInputModal.jsx";


const EditGame = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const { userId, clues, categories, name, userGames } = useSelector(state => state.game);
  
  const currGame = userGames.find(game => game._id === id)
  
  useEffect(() => {
    dispatch(loadGames(userId))
      .then(() => {
        dispatch({type: SET_GAME, payload: currGame});
      })
      
    return () => {
      dispatch({type: CLEAR_GAME});
    }
  }, [dispatch, userId])

  const [showModal, setShowModal] = useState(false);
  const [btnText, setBtnText] = useState('Save Game');
  const [showLoader, setShowLoader] = useState(false);

  const handleFocus = (e) => e.target.select();

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  }

  const saveToDB = () => {
    setShowLoader(true);
    dispatch(updateGame())
      .then(res => {
        setShowLoader(false);
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
        <input type="text" required value={name} onFocus={handleFocus} onChange={(e) => dispatch({type: SET_GAME_NAME, payload: e.target.value})}></input>

      <div className="edit-game-board">
        <ClueInputModal hidden={!showModal} handleModal={handleModal} />
        { columns }
      </div>
      { showLoader ? <div className="hourglass"></div> : <button id="btnSaveGame" onClick={saveToDB}>{btnText}</button> }

    </div>
  )
}


export default EditGame;