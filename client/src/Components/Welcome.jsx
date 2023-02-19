import React from "react";
import { useNavigate} from "react-router-dom";

const Welcome = (props) => {

  const navigate = useNavigate();

  return (
    <div id="welcome-page-container">
      <h1>Welcome to <span className="welcome-title" style={{fontSize: '3rem'}}>Gee-So-Purdy!</span></h1>
      <h3>What do you want to do?</h3>
      <div id="welcome-options">
        <button onClick={() => navigate('/login')}>Host/Create</button>
        <h1>|</h1>
        <button onClick={() => navigate('/playerlogin')}>Play</button>
      </div>
    </div>
  )
}

export default Welcome;