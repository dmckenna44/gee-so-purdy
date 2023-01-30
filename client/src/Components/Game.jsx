import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';
import CluePlayModal from "./CluePlayModal.jsx";
import ColumnPlay from "./ColumnPlay.jsx";
import * as actions from "../constants/actionTypes.js";

const socket = io.connect('http://localhost:3001');

const Game = (props) => {

  const { name } = useParams();
  const dispatch = useDispatch();

  const currGame = useSelector(
      state => state.game.userGames.find(game => {
        return game.name === name
      })
    )
    
  useEffect(() => {
    dispatch({type: actions.SET_GAME, payload: currGame})
  }, [currGame])

  useEffect(() => {
    socket.emit('create_room', currGame);
    // socket.emit('send_message', )
    return;
  }, [])

  const { currentQuestion, currentAnswer, userId, players } = useSelector(state => state.game);

  const [showModal, setShowModal] = useState(false);
  const [room, setRoom] = useState('');

  const joinRoom = (title, user_id) => {
    const room = {game: title, user_id: user_id}
    if (title !== '') {
      socket.emit('join_room', room);
    }
  }

  // if (name) joinRoom(name, userId);

  const handleModal = (e) => {
    e.preventDefault();
    console.log('button clicked')
    console.log(showModal)
    setShowModal(!showModal);
  }

  const columns = currGame.clues.map((clue, i) => {
    return <ColumnPlay 
        key={i} 
        index={i} 
        category={clue.category} 
        questions={clue.questions}
        answers={clue.answers} 
        handleModal={handleModal}
      />
  })

  const playerList = players.map((p, i) => {
    return (
      <div key={i}>
        {p}
      </div>
    )
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
      <div className="overlay" hidden={!showModal}></div>
      <h2>{currGame.name}</h2>
         <CluePlayModal hidden={!showModal}  handleModal={handleModal}/>
         <div className="playGameBoard">
          {columns}
         </div>
         <h2><em>Players</em></h2>
         <div className="player-list">
          {playerList}
         </div>
    </div>
  )
} 


export default Game;


/* 
TODOs:

- get clue card to expand and fill up the board with the question when it's clicked, FOR HOST AND PLAYERS
- add player list to server-side rooms to send to every client in a room
- update player list in state when a player leaves or the game is closed
- close the room when a game is closed

*/