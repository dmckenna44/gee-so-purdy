import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteGameModal = (props) => {

  const navigate = useNavigate();

  const {hidden, handleDelete, gameId} = props;

  const deleteGame = async (e) => {
    e.preventDefault();
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: gameId
      })
    }

    const deleted = await fetch('http://localhost:3001/games', options);
    const deletedGame = await deleted.json();
    console.log('deleted game response', deletedGame)
    // navigate(0);
    handleDelete(e, '')
  }
  
  if (hidden) return null;
  return (
    <div className="delete-game-modal">
      {/* <p className="close-modal-btn" >Close</p> */}
      <h1>Are You Sure You Want to Delete This Game?</h1>
      <div className="topic-page-btns">
        <button onClick={deleteGame}>Delete</button>
        <button onClick={handleDelete}>Go Back</button>

      </div>

    </div>
  )

}

export default DeleteGameModal;