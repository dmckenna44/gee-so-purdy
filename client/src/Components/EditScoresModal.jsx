import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {socket} from '../apiRoutes.js';


const EditScoresModal = (props) => {

  const {players, roomID} = useSelector(state => state.game);
  const { handleModal, hidden } = props;
  const [score, setScore] = useState(0);

  const playerList = players.map(player => {
    return (
      <div className="edit-modal-player-data">
        <label htmlFor="">{player.name}</label>
        <input type="number" placeholder={player.score} onChange={(e) => {setScore(e.target.value)}}/>
        <button onClick={(e) => {sendScore(score, player.name)}}>Update</button>
      </div>
    )
  });

  const sendScore = (score, name) => {
      socket.emit('send_updated_score', {roomID: roomID, playerName: name, value: score});
  };


  if (hidden) return null;
  return (
    <div className="edit-scores-modal">
      <div className="edit-modal-player-list">
        {playerList.length ? playerList : 'No players yet'}  
      </div>
      <button onClick={handleModal}>Close</button>
    </div>
  )
}


export default EditScoresModal;