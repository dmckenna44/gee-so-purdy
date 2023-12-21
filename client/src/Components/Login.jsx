import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseUrl } from "../apiRoutes";

const Login = (props) => {

  const cookies = new Cookies();
  
  const navigate = useNavigate();
  const { userid } = useParams();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const nameChange = e => {
    setUsername(e.target.value);
  }

  const passwordChange = e => {
    setPassword(e.target.value);
  }

  const logIn = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    }
    const response = await fetch(`${baseUrl}/api/login`, options)
    const user = await response.json()
    if (user.found) {
      sessionStorage.setItem('session', `${user.user.id.toString()}`);
      console.log('response on client: ', response)
      console.log('cookies', response.cookies)
      dispatch({type: 'SET_USERNAME', payload: user.user.name});
      navigate(`/profile/${user.user.id.toString()}`);
    }
  }


  return (
    <div id="login-page-container">
      <h1 className="welcome-title">Gee-So-Purdy!</h1>
      <p className="back-to-prof-link" onClick={() => navigate('/')}>← Back to Home</p>
      <section className="accounts-container">
        <h1>Sign In to Host or Create a Game</h1>
        <h3>Make Your Own Trivia Games to Play With Friends and Family!</h3>
        <form action="submit" className="account-form">
          <label htmlFor="">Username</label>
          <input type="text" name="username" onChange={nameChange} />
          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={passwordChange} />
          <button type="submit" onClick={logIn}>Log in</button>
        </form>
        <h3>Don't Have an Account? Sign Up <span id="sign-up-link" onClick={() => navigate('/signup')}>Here</span></h3>
      </section>
    </div>
  )
}

export default Login;