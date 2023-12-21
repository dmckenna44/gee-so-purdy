import React from "react";

const HostHelpModal = (props) => {

  const {hidden, handleModal, component} = props;


  if (hidden) return null;
  return (
    <div className="help-modal">
      {/* <h1><span className="welcome-title">Gee-So-Purdy</span></h1> */}
      <h1>How to Play</h1>
      <section>
        <h3><em>1 - Get Some Players!</em></h3>
        <p>Make sure all your players have the passcode to sign in to your game. Once they do you'll see them show up underneath the game board.</p>
      </section>
      <section>
        <h3><em>2 - Click On a Clue to Get Started</em></h3>
        <p>Once you or a player decides on a category and a "dollar" amount, click on that clue to display the question to everyone.</p>
      </section>
      <section>
        <h3><em>3 - Click <span><button className="inactive-btn">Activate Buzzers</button></span></em></h3>
        <p>Once a question is displayed, this button will let the players ring in if they want to try and answer the question.</p>
      </section>
      <section>
        <h3><em>4 - Choose <span><button className="inactive-btn">Correct</button></span> or <span><button className="inactive-btn">Incorrect</button></span></em></h3>
        <p>Once a player has buzzed in and responded, choose correct or incorrect to adjust their score accordingly.</p>
      </section>
      <section>
        <h3><em> 5 - Click <span><button className="inactive-btn">Show Answer</button></span> (optional)</em></h3>
        <p>If the clue was answered correctly, or no one knew the answer, you can click here to display the answer to everyone.</p>
      </section>
      <section>
        <h3><em> 6 - Click on <span><button className="inactive-btn">Done</button></span> to Keep Playing</em></h3>
        <p>Click this button to return to the game board (with any answered questions removed) so you can keep playing!</p>
        <p>If you need to adjust the scores for any reason, just click <span><button className="inactive-btn">Edit Scores</button></span>  </p>
      </section>

      <button onClick={handleModal}>Close</button>
    </div>
  )
}

export default HostHelpModal;