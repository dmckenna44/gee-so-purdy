import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { loadGames, randomGame } from '../reducers/gameReducer.js';


const Profile = props => {
  
  const { userid, name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userGames = useSelector(
    (state) => state.game.userGames
  )
  let updateList = true;
  // const currState = useSelector(
  //   (state) => state.game
  //   )
  const username = useSelector(
    (state) => state.game.username
  )
  // console.log(currState);
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
    updateList = !updateList;
    console.log('deleted game response', deletedGame, updateList);
    navigate(0);
  }
  console.log('links', userGames)
  const gameLinks = userGames.map((game, i) => {
    return (
      <div className="game-list-choice" key={i}>
        <h4 className="game-list-name">{game.name}</h4>
        <div className="game-list-options">
          <h4 onClick={() => navigate(`/playgame/${userid}/${game.name}`)}>Play</h4>
          <h3>|</h3>
          <h4>Edit</h4>
          <h3>|</h3>
          <h4 onClick={(e) => deleteGame(e, game._id)}>Delete</h4>
        </div>
      </div>
    )
    // return <Link key={i} to={`/playgame/${userid}/${game.name}`}>{game.name}</Link>
  })
  // const state = useSelector(state => state.game);

  dispatch({type: 'SET_USERID', payload: userid});

  useEffect(() => {
    dispatch(loadGames(userid));
  }, [dispatch, userid, updateList])

  const setRandomGame = () => {
    dispatch(randomGame());
    // console.log('state after? random func', currGame)
    setTimeout(() => {
      navigate(`/playgame/random`);
    }, 2500)
  }

  return (
    <div id="profileContainer">
      <h1>Welcome, {username}!</h1>
      <div className="profile-options">
        <section id='goToBuilder'>
          <button onClick={() => navigate('/buildgame')}>Create a New Game</button>
        </section>
        <section>
          {/* <button onClick={() => navigate(`/playgame/${userid}/random`)}>Random Game</button> */}
          <button onClick={setRandomGame}>Random Game</button>
        </section>
      </div>

      <div id="savedGameList">
        <h2>Your Saved Games</h2>
        {gameLinks}
      </div>
      
    </div>
  )
}

export default Profile;