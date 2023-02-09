import React from "react";

const HelpModal = (props) => {

  const {hidden, handleModal, component} = props;


  if (hidden) return null;
  return (
    <div className="help-modal">
      <section>
        <h3>Create a New Game</h3>
        <p>Click this to start making a new trivia game. You'll get to give your game a name and choose the number of categories and questions first.</p>
      </section>
      <section>
        <h3>Random Game</h3>
        <p>Click this to have a new trivia game created for you! The clues will come from an external service so their quality/formatting isnt't guaranteed.</p>
      </section>
      <section>
        <h3>Your Saved Games</h3>
        <p>This is a list of all the games you've made, random or custom. Click Play to play the game, Edit to customize it, or Delete to delete it!</p>
      </section>

      <button onClick={handleModal}>Close</button>
    </div>
  )
}

export default HelpModal;