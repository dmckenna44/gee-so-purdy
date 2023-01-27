import React from "react";
import { useNavigate} from "react-router-dom";

const Welcome = (props) => {

  const navigate = useNavigate();

  return (
    <div id="welcome-page-container">
      <h1>Welcome to Gee-So-Purdy!</h1>
      <h3>What do you want to do?</h3>
      <div id="welcome-options">
        <h2 onClick={() => navigate('/login')}>Host/Create</h2>
        <h1>|</h1>
        <h2 onClick={() => navigate('/signup')}>Play</h2>
      </div>
    </div>
  )
}

export default Welcome;