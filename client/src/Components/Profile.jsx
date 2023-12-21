import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadGames, loadActiveGames, randomGame } from '../reducers/gameReducer.js';
import { SET_USERID, SET_GAME, SET_BUZZERS_ACTIVE, SET_PLAYER_NAME } from "../constants/actionTypes.js";
import BuildGameModal from "./BuildGameModal.jsx";
import DeleteGameModal from "./DeleteGameModal.jsx";
import ProfileHelpModal from "./ProfileHelpModal.jsx";

import {socket} from '../apiRoutes.js';

const Profile = props => {
  
  const { userid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userGames, activeGames, username } = useSelector((state) => state.game);
  console.log('active games from profile', activeGames)
  console.log('games from profile: ', userGames)

  const [buildGameModalHidden, toggleBuildGameModal] = useState(true);
  const [helpModalHidden, toggleHelpModal] = useState(true);
  const [deleteHidden, toggleDelete] = useState(true);
  
  const [gameId, setGameId] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [random, setRandom] = useState(false);

  useEffect(() => {
    if(!sessionStorage.getItem('session')) {
      navigate('/')
    } else {
      dispatch({type: SET_USERID, payload: userid});
      dispatch({type: SET_PLAYER_NAME, payload: ''});
      dispatch(loadGames(userid));
      dispatch(loadActiveGames(userid));
    }
  }, [])
  
  const playGame = (e, id)  => {
    e.preventDefault();
    dispatch({type: SET_BUZZERS_ACTIVE, payload: false});
    dispatch({type: SET_GAME, payload: userGames.find(game => game._id === id)});
    navigate(`/playgame/${userid}/${id}/new`)
  }

  const playActiveGame = (e, id) => {
    e.preventDefault();
    dispatch({type: SET_BUZZERS_ACTIVE, payload: false});
    dispatch({type: SET_GAME, payload: activeGames.find(game => game._id === id)});
    navigate(`/playgame/${userid}/${id}/active`)
  }

  const editGame = (e, id)  => {
    e.preventDefault();
    console.log('game id', id);
    dispatch({type: SET_GAME, payload: userGames.find(game => game._id === id)});
    navigate(`/buildgame/${id}`)
  }
  
  const handleHelpModal = (e) => {
    e.preventDefault();
    toggleHelpModal(!helpModalHidden);
  }
  
  const handleDeleteModal = (e, id) => {
    e.preventDefault();
    setGameId(id);
    toggleDelete(!deleteHidden);
  }
  
  const handleBuildGameModal = (e, rand) => {
    e.preventDefault();
    // setRandomGame()
    if (rand) setRandom(true);
    toggleBuildGameModal(!buildGameModalHidden);
  }

  const gameLinks = userGames.length ? userGames.map((game, i) => {
    return (
      <div className="game-list-choice" key={i}>
        <h4 className="game-list-name">{game.name}</h4>
        <div className="game-list-options">
          <button onClick={(e) => {playGame(e, game._id)}}>Play</button>
          <h3>|</h3>
          <button onClick={(e) => {editGame(e, game._id)}}>Edit</button>
          <h3>|</h3>
          <button onClick={(e) => handleDeleteModal(e, game._id)}>Delete</button>
        </div>
      </div>
    )
  }) : [];
  
  const activeGameLinks = activeGames.length ? activeGames.map((game, i) => {
    return (
      <div className="active-game-choice" key={i}>
        <h5 className="game-list-name">{game.name} - <span style={{fontWeight:"lighter"}}>{game.date}</span></h5>
        <div className="game-list-options">
          <button onClick={(e) => {playActiveGame(e, game._id)}}>Play</button>
          <h3>|</h3>
          <button onClick={(e) => handleDeleteModal(e, game._id)}>Delete</button>
        </div>
      </div>
    )
  }) : null;





  const logoutUser = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('session');
    navigate('/');
  }


  return (
    
    <div id="profileContainer">
      <p className="logout-btn" onClick={logoutUser}>Logout</p>
      <div className="overlay" hidden={buildGameModalHidden && deleteHidden && helpModalHidden}></div>
      {/* <p className="help-btn" onClick={handleHelpModal}>?</p> */}
      <h1 className="welcome-title">Gee-So-Purdy</h1>
      <h1>Welcome, {username}!</h1>
      <hr style={{background: 'black', height: '2px', width: '75%'}}/>
      <p className="help-btn" onClick={handleHelpModal}>- Getting Started -</p>
      <div className="profile-options">
        <section id='goToBuilder'>
          <button onClick={handleBuildGameModal}>Custom Game</button>
        </section>
        <section>
          <button onClick={(e) => {handleBuildGameModal(e, true)}}>Random Game</button>
          {/* {showLoader ? <div className="hourglass"></div> : <button onClick={setRandomGame}>Random Game</button>} */}
        </section>
      </div>
      <BuildGameModal hidden={buildGameModalHidden} random={random} handleModal={handleBuildGameModal} />
      <DeleteGameModal hidden={deleteHidden} handleDelete={handleDeleteModal} gameId={gameId} userId={userid} />
      <ProfileHelpModal hidden={helpModalHidden} handleModal={handleHelpModal} component={'profile'} />

      <div className="saved-game-list">
        <h2>Your Saved Games</h2>
        {gameLinks.length ? gameLinks : <p><em>No Games Yet, Click the Button Above to Start Creating!</em></p>}
      </div>

      <div className="saved-game-list">

      </div>
      {
        activeGames.length ?
          <div className="saved-game-list"> 
            <h2>Games In Progress</h2>
            {activeGameLinks}
          </div> : null
      }

    </div>
  )
}

export default Profile;