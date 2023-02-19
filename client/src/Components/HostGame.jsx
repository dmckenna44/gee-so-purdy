import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CluePlayModal from "./CluePlayModal.jsx";
import HostColumn from "./HostColumn.jsx";
import Timer from "./Timer.jsx";
import ActiveClue from "./ActiveClue.jsx";
import EditScoresModal from "./EditScoresModal.jsx";
import * as actions from "../constants/actionTypes.js";

import {socket} from '../apiRoutes.js';

const HostGame = (props) => {

  const { gameid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currGame = useSelector(
      state => state.game.userGames.find(game => {
        return game._id === gameid
      })
  );
  
  useEffect(() => {
    dispatch({type: actions.SET_GAME, payload: currGame});
    socket.emit('create_room', currGame, response => {
      dispatch({type: actions.UPDATE_PLAYERS, payload: response.players})
      dispatch({type: actions.SET_ROOM_ID, payload: response.id});
      dispatch({type: actions.SET_GAME_PW, payload: response.pw});
    });

    return () => {
      dispatch({type: actions.CLEAR_GAME});
    }
  }, [currGame]);
      
  useEffect(() => {
    socket.on('player_joined', (data) => {
      console.log('data from player joined event: ', data)
      dispatch({type: actions.UPDATE_PLAYERS, payload: data.newPlayerList});
    });
    
    socket.on('player_left', (data) => {
      console.log('data from player left event: ', data)
      dispatch({type: actions.UPDATE_PLAYERS, payload: data.newPlayerList});
    });
    
    socket.on('receive_new_scores', (data) => {
      console.log('data from receive new scores: ', data);
      dispatch({type: actions.UPDATE_PLAYERS, payload: data});
    });
    
    socket.on('receive_buzzer_change', data => {
      dispatch({type: actions.SET_BUZZERS_ACTIVE, payload: data.buzzersActive});
    });
    
    socket.on('receive_active_player', data => {
      console.log('active player from server', data.activePlayer)
      dispatch({type: actions.SET_ACTIVE_PLAYER, payload: data.activePlayer});
    });

    socket.on('receive_deactivate_clue', data => {
      dispatch({type: actions.SET_ACTIVE_CLUE, payload: false});
    })

    socket.on('receive_toggle_answer', data => {
      dispatch({type: actions.SET_SHOW_ANSWER, payload: data.show});
    })
    
  }, [socket, dispatch])
      
  const { userId, players, roomID, buzzersActive, activePlayer, activeClue, activeClueValue, password} = useSelector(state => state.game);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setEditModal] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  }

  const handleEditModal = (e) => {
    e.preventDefault();
    setEditModal(!showEditModal);
  }

  const toggleBuzzers = (e) => {
    e.preventDefault();
    socket.emit('send_buzzer_change', {roomID: roomID, active: !buzzersActive});
    dispatch({type: actions.SET_BUZZERS_ACTIVE, payload: !buzzersActive});
  }

  const sendResponse = (e, correct) => {
    e.preventDefault();
    socket.emit('send_new_scores', {roomID: roomID, playerName: activePlayer, value: activeClueValue, correct: correct});
    socket.emit('send_active_player', {roomID: roomID, name: ''});
  }

  const columns = currGame.clues.map((clue, i) => {
    return <HostColumn 
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
      <div className={`player-info ${activePlayer === p.name ? 'timed-player' : ''}`} key={i}>
        <p className="player-name-display">{p.name}</p> 
        <p className="player-score-display" style={{color: p.score >= 0 ? 'black' : 'red'}}>${p.score}</p> 
      </div>
    )
  })

  return (
    <div id="playGameContainer">
      <p className="back-to-prof-link" onClick={() => navigate(`/profile/${userId}`)}>← Back to Profile</p>
      <div className={"host-config"}>
        <p className="game-pw-display">Passcode: {password}</p>
        <p>Timer?</p>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
          <span>On</span>
        </label>

      </div>
      <div className="overlay" hidden={!showEditModal}></div>
      <h2>{currGame.name}</h2>
         <EditScoresModal hidden={!showEditModal} handleModal={handleEditModal} />
         <CluePlayModal hidden={!showModal}  handleModal={handleModal}/>
         <div className="playGameBoard">
          {activeClue ? < ActiveClue/> : columns}
         </div>
         <div className="player-list">
          {playerList.length ? playerList : 'No players yet'}
         </div>
         <br />
         <div className="host-options">
          <div className="host-btns">
            <button className="edit-scores-btn" onClick={handleEditModal}>Edit Scores</button>  
            {
              activeClue ?
              <button className="open-response-btn" onClick={toggleBuzzers}>{!buzzersActive ? 'Open Responses' : 'Reset'}</button>
              : null
            }
          </div>
          <div className="judge-response">
            <p>{activePlayer ? `Answering: ${activePlayer}` : ''}</p>
            { activePlayer ? <Timer seconds={5}/> : null }
            { buzzersActive ?  <Timer seconds={5}/> : null }
          </div>
          {
            activePlayer ?          
              <div className="judge-response-btns">
                <button onClick={(e) => sendResponse(e, true)}>Correct</button>
                <button onClick={(e) => sendResponse(e, false)}>Incorrect</button>
              </div> : 
              null
          }
         </div>
    </div>
  )
} 


export default HostGame;


/* 
TODOs:

- get clue card to expand and fill up the board with the question when it's clicked, FOR HOST AND PLAYERS
- add player list to server-side rooms to send to every client in a room
- update player list in state when a player leaves or the game is closed
- close the room when a game is closed
- if there's an active player then deactivate buzzers
- hide a clue after its been answered
- get active clue to expand more smoothly
- actually add user signup feature and bcrypt
*/