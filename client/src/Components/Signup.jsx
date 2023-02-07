import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../apiRoutes";

const Signup = (props) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [requiredMsg, setRequiredMsg] = useState('');
  const [userExistsMsg, setUserExistsMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const nameChange = e => {
    setUsername(e.target.value);
    setRequiredMsg('');
    setUserExistsMsg('');
  }

  const passwordChange = e => {
    setPassword(e.target.value);
    setRequiredMsg('');
    setUserExistsMsg('');
  }

  const signUp = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    };
    if (username && password) {
      try {
        const response = await fetch(`${baseUrl}/api/signup`, options);
        const newUser = await response.json();
        dispatch({type: 'SET_USERNAME', payload: newUser.username});
        setShowLoader(false);
        setSuccessMsg('You\'re signed up! Redirecting to profile page');
        navigate(`/profile/${newUser._id.toString()}`);
      } catch(err) {
        setShowLoader(false);
        setUserExistsMsg('Username already exists! Try another.');
      }
    } else {
      setShowLoader(false);
      setRequiredMsg('Both fields are required!');
    }
  
  }

  return (
    <div id="signup-page-container">
      <p className="back-to-prof-link" onClick={() => {navigate(`/login`)}} >← Back to Login</p>

      <section className="accounts-container">
        <h1>Welcome to Gee-So-Purdy!</h1>
        <h3>Create a New Account</h3>
        <form action="submit" className="account-form">
          <label htmlFor="">Username</label>
          <input type="text" name="newUsername" onChange={nameChange}/>
          <label htmlFor="">Password</label>
          <input type="password" name="newPassword" onChange={passwordChange}/>
          <button type="button" onClick={signUp} >Sign Up</button>
        </form>
        <p className="error-msg">{requiredMsg}</p>
        <p className="error-msg">{userExistsMsg}</p>
        {showLoader ? <div className="hourglass"></div> : null}
        <p>{successMsg}</p>
        
      </section>
    </div>
  )
}

export default Signup;