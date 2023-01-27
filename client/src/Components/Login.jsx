import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Login = (props) => {

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
    const response = await fetch('http://localhost:3001/login', options)
    const user = await response.json()
    console.log(user)
    if (user.found) {
      dispatch({type: 'SET_USERNAME', payload: user.user.username});
      console.log()
      navigate(`/profile/${user.user._id.toString()}`);
    }
  }


  return (
    <div id="welcome-page-container">
      <section id="accounts-container">
        <h3>Have an Account? Log in here</h3>
        <form action="submit" className="account-form">
          <label htmlFor="">Username</label>
          <input type="text" name="username" onChange={nameChange} />
          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={passwordChange} />
          <button type="submit" onClick={logIn}>Log in</button>
          <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
        </form>
      </section>
    </div>
  )
}

export default Login;