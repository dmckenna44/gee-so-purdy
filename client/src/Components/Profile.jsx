import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadGames, randomGame } from '../reducers/gameReducer.js';
import { SET_USERID, SET_GAME, SET_BUZZERS_ACTIVE, SET_PLAYER_NAME, CLEAR_GAME } from "../constants/actionTypes.js";
import BuildGameModal from "./BuildGameModal.jsx";
import DeleteGameModal from "./DeleteGameModal.jsx";

import {socket} from '../apiRoutes.js';

const Profile = props => {
  
  const { userid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userGames, username } = useSelector((state) => state.game);

  const [modalHidden, toggleModal] = useState(true);
  const [deleteHidden, toggleDelete] = useState(true);
  const [gameId, setGameId] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  
  const playGame = (e, id)  => {
    e.preventDefault();
    dispatch({type: SET_BUZZERS_ACTIVE, payload: false});
    dispatch({type: SET_GAME, payload: userGames.find(game => game._id === id)});
    navigate(`/playgame/${userid}/${id}`)
  }

  const editGame = (e, id)  => {
    e.preventDefault();
    console.log(userGames)
    dispatch({type: SET_GAME, payload: userGames.find(game => game._id === id)});
    navigate(`/buildgame/${id}`)
  }
  
  const gameLinks = userGames.length ? userGames.map((game, i) => {
    return (
      <div className="game-list-choice" key={i}>
        <h4 className="game-list-name">{game.name}</h4>
        <div className="game-list-options">
          <h4 onClick={(e) => {playGame(e, game._id)}}>Play</h4>
          <h3>|</h3>
          <h4 onClick={(e) => {editGame(e, game._id)}}>Edit</h4>
          <h3>|</h3>
          <h4 onClick={(e) => handleDelete(e, game._id)}>Delete</h4>
        </div>
      </div>
    )
  }) : [];
  
  useEffect(() => {
    dispatch({type: SET_USERID, payload: userid});
    dispatch({type: SET_PLAYER_NAME, payload: ''});
    dispatch(loadGames(userid));

    return () => {
      dispatch({type: CLEAR_GAME, payload: true});
    }
  }, [])

  const setRandomGame = () => {
    setShowLoader(true);
    dispatch(randomGame())
      .then((response) => {
        console.log('response from randomGame: ', response);
        dispatch({type: SET_GAME, payload: response})
        setShowLoader(false);
        navigate(`/playgame/${userid}/${response._id}`)
      })
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    setGameId(id);
    toggleDelete(!deleteHidden);
  }

  const handleModal = (e) => {
    e.preventDefault();
    toggleModal(!modalHidden);
  }

  return (
    
    <div id="profileContainer">
      <p className="logout-btn" onClick={() => navigate('/')}>Logout</p>
      <div className="overlay" hidden={modalHidden && deleteHidden}></div>
      <h1 className="welcome-title">Gee-So-Purdy</h1>
      <h1>Welcome, {username}!</h1>
      <hr style={{background: 'black', height: '2px', width: '75%'}}/>
      <div className="profile-options">
        <section id='goToBuilder'>
          <button onClick={handleModal}>Create a New Game</button>
        </section>
        <section>
          {showLoader ? <div className="hourglass"></div> : <button onClick={setRandomGame}>Random Game</button>}
        </section>
      </div>
      <BuildGameModal hidden={modalHidden} handleModal={handleModal}/>
      <DeleteGameModal hidden={deleteHidden} handleDelete={handleDelete} gameId={gameId} userId={userid}/>

      <div id="savedGameList">
        <h2>Your Saved Games</h2>
        {gameLinks.length ? gameLinks : <p><em>No Games Yet, Click the Button Above to Start Creating!</em></p>}
      </div>
      
    </div>
  )
}

export default Profile;