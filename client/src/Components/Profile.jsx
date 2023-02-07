import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadGames, randomGame } from '../reducers/gameReducer.js';
import { SET_USERID, SET_GAME, SET_BUZZERS_ACTIVE } from "../constants/actionTypes.js";
import BuildGameModal from "./BuildGameModal.jsx";
import DeleteGameModal from "./DeleteGameModal.jsx";

import {socket} from '../apiRoutes.js';

const Profile = props => {
  
  const { userid, name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userGames = useSelector(
    (state) => state.game.userGames
  );
  const username = useSelector(
    (state) => state.game.username
  );

  const [modalHidden, toggleModal] = useState(true);
  const [deleteHidden, toggleDelete] = useState(true);
  const [gameId, setGameId] = useState('');

  
  const playGame = (e, name)  => {
    e.preventDefault();
    dispatch({type: SET_BUZZERS_ACTIVE, payload: false});
    dispatch({type: SET_GAME, payload: userGames.find(game => game.name === name)});
    navigate(`/playgame/${userid}/${name}`)
  }

  const editGame = (e, name)  => {
    e.preventDefault();
    dispatch({type: SET_GAME, payload: userGames.find(game => game.name === name)});
    navigate(`/buildgame/${name}`)
  }

  console.log('links', userGames);
  console.log('username', username);
  
  const gameLinks = userGames.length ? userGames.map((game, i) => {
    return (
      <div className="game-list-choice" key={i}>
        <h4 className="game-list-name">{game.name}</h4>
        <div className="game-list-options">
          <h4 onClick={(e) => {playGame(e, game.name)}}>Play</h4>
          <h3>|</h3>
          <h4 onClick={(e) => {editGame(e, game.name)}}>Edit</h4>
          <h3>|</h3>
          <h4 onClick={(e) => handleDelete(e, game._id)}>Delete</h4>
        </div>
      </div>
    )
  }) : [];
  
  useEffect(() => {
    dispatch({type: SET_USERID, payload: userid});
    dispatch(loadGames(userid));
  }, [userid, userGames])

  const setRandomGame = () => {
    dispatch(randomGame());
    // console.log('state after? random func', currGame)
    setTimeout(() => {
      navigate(`/playgame/random`);
    }, 2500)
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    setGameId(id);
    toggleDelete(!deleteHidden);
  }

  const handleModal = (e) => {
    e.preventDefault();
    toggleModal(!modalHidden);
    console.log(modalHidden)
  }

  const logOut = (e) => {
    
  }

  return (
    
    <div id="profileContainer">
      <a href="/" className="logout-btn" onClick={logOut}>Logout</a>
      <div className="overlay" hidden={modalHidden && deleteHidden}></div>
      <h1>Gee-So-Purdy</h1>
      <h1>Welcome, {username}!</h1>
      <hr style={{background: 'black', height: '2px', width: '75%'}}/>
      <div className="profile-options">
        <section id='goToBuilder'>
          <button onClick={handleModal}>Create a New Game</button>
        </section>
        <section>
          {/* <button onClick={() => navigate(`/playgame/${userid}/random`)}>Random Game</button> */}
          <button onClick={setRandomGame}>Random Game</button>
        </section>
      </div>
      <BuildGameModal hidden={modalHidden} handleModal={handleModal}/>
      <DeleteGameModal hidden={deleteHidden} handleDelete={handleDelete} gameId={gameId}/>

      <div id="savedGameList">
        <h2>Your Saved Games</h2>
        {gameLinks.length ? gameLinks : <p><em>No Games Yet, Click the Button Above to Start Creating!</em></p>}
      </div>
      
    </div>
  )
}

export default Profile;