import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadGames } from "../reducers/gameReducer";
import { baseUrl } from "../apiRoutes";

const DeleteGameModal = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {hidden, handleDelete, gameId, userId} = props;

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

    const deleted = await fetch(`${baseUrl}/api/games`, options);
    const deletedGame = await deleted.json();
    dispatch(loadGames(userId));
    handleDelete(e, '')
  }
  
  if (hidden) return null;
  return (
    <div className="delete-game-modal">
      <h1>Are You Sure You Want to Delete This Game?</h1>
      <div className="topic-page-btns">
        <button className="delete-btn" onClick={deleteGame}>Delete</button>
        <button onClick={handleDelete}>Go Back</button>

      </div>

    </div>
  )

}

export default DeleteGameModal;