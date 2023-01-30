import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';
import PlayerColumn from "./PlayerColumn.jsx";

const socket = io.connect('http://localhost:3001');

const PlayerGame = (props) => {

  const {name, players, password} = useSelector(state => state.game);

  // const currentGame = useSelector(
  //   state => state.game.userGames.find(game => {
  //     return game.name === name
  //   })
  // )
  const currentGame = useSelector(state => state.game);
  console.log('game from playergame', currentGame)

  useEffect(() => {
    // joinRoom(currentGame.name, currentGame.userId)
    socket.emit('join_room', currentGame);

  }, [currentGame])

  const joinRoom = (title, user_id) => {
    const room = {game: title, user_id: user_id}
    if (title !== '') {
      socket.emit('join_room', room);
    }
  }

  const columns = currentGame.clues.map((clue, i) => {
    return <PlayerColumn
        key={i} 
        index={i} 
        category={currentGame.categories[i]} 
        clues={clue}
      />
  })

  // const columns = currGame.clues.map((clue, i) => {
  //   return <ColumnPlay 
  //       key={i} 
  //       index={i} 
  //       category={clue.category} 
  //       questions={clue.questions}
  //       answers={clue.answers} 
  //       handleModal={handleModal}
  //     />
  // })

  const playerList = players.map(p => {
    return (
      <div>
        {p}
      </div>
    )
  })

  return (
    <div id="playGameContainer">
    {/* <div className="overlay" hidden={!showModal}></div> */}
    <h2>{currentGame.name}</h2>
       {/* <CluePlayModal hidden={!showModal}  handleModal={handleModal}/> */}
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

export default PlayerGame;