import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../constants/actionTypes.js';
import PlayerColumn from "./PlayerColumn.jsx";
import Buzzer from "./Buzzer.jsx";
import Timer from "./Timer.jsx";
import ActiveClue from "./ActiveClue.jsx";
import {socket} from '../apiRoutes.js';
import buzzerSound from '../buzzersound.wav'


const PlayerGame = (props) => {

  const { players, activePlayer, playerName, activeClue, buzzersActive} = useSelector(state => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    // Receive updated player list after a new player joins
    socket.on('player_joined', (data) => {
      dispatch({type: actions.UPDATE_PLAYERS, payload: data.newPlayerList});
    })

    // Receive updated player list after a player leaves
    socket.on('player_left', (data) => {
      dispatch({type: actions.UPDATE_PLAYERS, payload: data.newPlayerList});
    })

    // Get updated player scores after a clue is responded to
    socket.on('receive_new_scores', (data) => {
      dispatch({type: actions.UPDATE_PLAYERS, payload: data});
    })

    // Get the value of the currently selected clue
    socket.on('receive_clue_value', (data) => {
      dispatch({type: actions.SET_ACTIVE_CLUE_VALUE, payload: data});
    })

    socket.on('receive_buzzer_change', data => {
      dispatch({type: actions.SET_BUZZERS_ACTIVE, payload: data.buzzersActive});
    })

    socket.on('receive_update_buzzers', data => {
      if(data.activePlayer !== playerName) {
        dispatch({type: actions.SET_CAN_ANSWER, payload: true})
      }
    })

    socket.on('receive_active_player', data => {
      const sound = new Audio(buzzerSound);
      if (data.activePlayer !== "") sound.play();
      dispatch({type: actions.SET_ACTIVE_PLAYER, payload: data.activePlayer});
    })

    socket.on('receive_clue_visibility', data => {
      const newClue = {
        question: data.question,
        answer: data.answer,
        answered: data.answered
      }
      dispatch({type: actions.UPDATE_CLUE, payload: [data.index[0], data.index[1], newClue]});
      dispatch({type: actions.SET_CURRENT_Q, payload: data.question});
      dispatch({type: actions.SET_CURRENT_A, payload: data.answer});
      dispatch({type: actions.SET_ACTIVE_CLUE, payload: true})
    })

    socket.on('receive_deactivate_clue', data => {
      dispatch({type: actions.SET_ACTIVE_CLUE, payload: false})
    })

    socket.on('receive_reset_buzzers', data => {
      dispatch({type: actions.SET_CAN_ANSWER, payload: true});
    })

    socket.on('receive_toggle_answer', data => {
      dispatch({type: actions.SET_SHOW_ANSWER, payload: data.show});
    })

    return () => {
      dispatch({type: actions.CLEAR_GAME});
      socket.close(); // disconnect user from socket when they hit back button
    }

  }, [socket, dispatch])

  const currentGame = useSelector(state => state.game);

  const columns = currentGame.clues.map((clue, i) => {
    return <PlayerColumn
        key={i} 
        index={i} 
        category={currentGame.categories[i]} 
        clues={clue}
      />
  })

  const playerList = players.map((player, i) => {
    return (
      <div className={`player-info ${activePlayer === player.name ? 'timed-player' : ''}`} key={i}>
        <p className="player-name-display">{player.name}</p> 
        <p className="player-score-display" style={{color: player.score >= 0 ? 'black' : 'red'}}>${player.score}</p> 
      </div>
    )
  })

  return (
    <div id="playGameContainer">
      <h2 className="player-game-title">{currentGame.name}</h2>
      <div className="playGameBoard player-game">
        {activeClue ? <ActiveClue/> : columns}
      </div>
      
      {
      !currentGame.buzzersActive ? 
            <div className="player-list">
              {playerList}
            </div> :
            null  
      }
      <Buzzer />
      {activePlayer === playerName ? <Timer seconds={5}/> : null}
      {activePlayer === playerName ? <div className="timer-bar"></div> : null}
      {buzzersActive ? <Timer seconds={5}/> : null}
  </div>
  )
}

export default PlayerGame;