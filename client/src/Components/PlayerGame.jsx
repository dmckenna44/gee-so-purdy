import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../constants/actionTypes.js';
import PlayerColumn from "./PlayerColumn.jsx";
import Buzzer from "./Buzzer.jsx";
import Timer from "./Timer.jsx";
import ActiveClue from "./ActiveClue.jsx";
import {socket} from '../apiRoutes.js';


const PlayerGame = (props) => {

  const {name, players, password, roomID, activePlayer, activeClue} = useSelector(state => state.game);
  console.log('players from playergame', players)
  const dispatch = useDispatch();

  useEffect(() => {
    // Receive updated player list after a new player joins
    socket.on('player_joined', (data) => {
      console.log('data from player joined event: ', data)
      dispatch({type: actions.UPDATE_PLAYERS, payload: data.newPlayerList});
    })

    // Receive updated player list after a player leaves
    socket.on('player_left', (data) => {
      console.log('data from player left event: ', data)
      dispatch({type: actions.UPDATE_PLAYERS, payload: data.newPlayerList});
    })

    // Get updated player scores after a clue is responded to
    socket.on('receive_new_scores', (data) => {
      console.log('data from receive new scores: ', data);
      dispatch({type: actions.UPDATE_PLAYERS, payload: data});
    })

    // Get the value of the currently selected clue
    socket.on('receive_clue_value', (data) => {
      console.log('data from receive clue value: ', data);
      dispatch({type: actions.SET_ACTIVE_CLUE_VALUE, payload: data});
    })

    socket.on('receive_buzzer_change', data => {
      dispatch({type: actions.SET_BUZZERS_ACTIVE, payload: data.buzzersActive});
    })

    socket.on('receive_active_player', data => {
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

  }, [socket, dispatch])

  const currentGame = useSelector(state => state.game);
  // console.log('game from playergame', currentGame)

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
      <div className="player-info" key={i}>
        <p className="player-name-display">{player.name}</p> 
        
        <p className="player-score-display" style={{color: player.score >= 0 ? 'black' : 'red'}}>${player.score}</p> 
        
      </div>
    )
  })

  return (
    <div id="playGameContainer">
    {/* <div className="overlay" hidden={!showModal}></div> */}
    <h2>{currentGame.name}</h2>
       {/* <CluePlayModal hidden={!showModal}  handleModal={handleModal}/> */}
       <div className="playGameBoard player-game">
       {activeClue ? <ActiveClue/> : columns}
        {/* {columns} */}
       </div>
       <h2><em>Players</em></h2>
         <div className="player-list">
          {playerList}
         </div>
       <Buzzer />
       {activePlayer ? <Timer seconds={5}/> : null}
  </div>
  )
}

export default PlayerGame;