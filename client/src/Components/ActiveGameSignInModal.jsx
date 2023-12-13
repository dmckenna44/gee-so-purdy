import React from "react";


const ActiveGameSignInModal = (props) => {

  const {players, hidden, handleModal, handleActiveSignIn} = props;

  console.log('modal hidden? ', hidden)

  const playerList = players.map((player, i) => {
    return (
      <div key={i}>
        {/* <p>{player.name}</p> */}
        <button onClick={handleActiveSignIn}>{player.name}</button>
      </div>
    )
  })

  if (hidden) return null;
  return (
    <div className="active-game-signin help-modal">
      <h3>Who Are You?</h3>
      {playerList}

      <button onClick={handleModal}>Close</button>

    </div>
  )
}

export default ActiveGameSignInModal;