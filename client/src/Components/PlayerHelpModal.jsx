import React from "react";

const PlayerHelpModal = (props) => {

  const {hidden, handleModal, component} = props;


  if (hidden) return null;
  return (
    <div className="help-modal">
      <h1><span className="welcome-title">Gee-So-Purdy</span></h1>
      <h1>Let's Get Started!</h1>
      <section>
        <h3><em>Create a New Game</em></h3>
        <p>Click this to start making a new trivia game. You'll get to give your game a name and choose the number of categories and questions first.</p>
      </section>
      <section>
        <h3><em>Random Game</em></h3>
        <p>Click this to have a new trivia game created for you! The clues will come from an external service so their quality/formatting isnt't guaranteed.</p>
      </section>
      <section>
        <h3><em>Your Saved Games</em></h3>
        <p>This is a list of all the games you've made, random or custom. Click Play to play the game, Edit to customize it, or Delete to delete it!</p>
      </section>

      <button onClick={handleModal}>Close</button>
    </div>
  )
}

export default PlayerHelpModal;