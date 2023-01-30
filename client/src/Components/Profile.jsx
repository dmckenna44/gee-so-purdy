import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import { loadGames, randomGame } from '../reducers/gameReducer.js';
import { SET_USERID } from "../constants/actionTypes.js";
import BuildGameModal from "./BuildGameModal.jsx";

const socket = io.connect('http://localhost:3001');

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

  const [showModal, setShowModal] = useState(false);
  const [modalHidden, toggleModal] = useState(true);
  const [room, setRoom] = useState('');

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const socketConnect = (e) => {
    e.preventDefault();
    socket.emit('send_message', {message: 'hello'})
  }
  
  const deleteGame = async (e, id) => {
    e.preventDefault();
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    }

    const deleted = await fetch('http://localhost:3001/games', options);
    const deletedGame = await deleted.json();
    
    navigate(0);
  }

  console.log('links', userGames);
  console.log('username', username);
  const gameLinks = userGames.map((game, i) => {
    return (
      <div className="game-list-choice" key={i}>
        <h4 className="game-list-name">{game.name}</h4>
        <div className="game-list-options">
          <h4 onClick={() => navigate(`/playgame/${userid}/${game.name}`)}>Play</h4>
          <h3>|</h3>
          <h4 onClick={() => navigate(`/buildgame/${game.name}`)}>Edit</h4>
          <h3>|</h3>
          <h4 onClick={(e) => deleteGame(e, game._id)}>Delete</h4>
        </div>
      </div>
    )
  })
  
  useEffect(() => {
    dispatch({type: SET_USERID, payload: userid});
    dispatch(loadGames(userid));
  }, [dispatch, userid])

  const setRandomGame = () => {
    dispatch(randomGame());
    // console.log('state after? random func', currGame)
    setTimeout(() => {
      navigate(`/playgame/random`);
    }, 2500)
  }

  const handleModal = (e) => {
    e.preventDefault();
    toggleModal(!modalHidden);
    console.log(modalHidden)
  }

  return (
    
    <div id="profileContainer">
      <h1>Welcome, {username}!</h1>
      <div className="profile-options">
        <section id='goToBuilder'>
          <button onClick={handleModal}>Create a New Game</button>
        </section>
        <section>
          {/* <button onClick={() => navigate(`/playgame/${userid}/random`)}>Random Game</button> */}
          <button onClick={setRandomGame}>Random Game</button>
        </section>
        <button onClick={socketConnect}>Connect to socket</button>
      </div>
      <div className="overlay" hidden={modalHidden}></div>
      <BuildGameModal hidden={modalHidden} handleModal={handleModal}/>

      <div id="savedGameList">
        <h2>Your Saved Games</h2>
        {gameLinks}
      </div>
      
    </div>
  )
}

export default Profile;