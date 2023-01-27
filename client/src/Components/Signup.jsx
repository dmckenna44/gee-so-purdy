import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Signup = (props) => {

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

  const signUp = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    };
    const response = await fetch('http://localhost:3001/signup', options);
    const newUser = await response.json();
    console.log(newUser);
    if (newUser) {
      // dispatch({type: 'SET_USERNAME', payload: newUser.username});
      navigate(`/profile/${newUser._id.toString()}`);
    }
  
  }

  return (
    <div id="welcome-page-container">
      <section id="accounts-container">
        <h3>Make an Account</h3>
        <form action="submit" className="account-form">
          <label htmlFor="">Username</label>
          <input type="text" name="newUsername" onChange={nameChange}/>
          <label htmlFor="">Password</label>
          <input type="password" name="newPassword" onChange={passwordChange}/>
          <button type="button" onClick={signUp} >Sign Up</button>
        </form>
      </section>
      <section>
      </section>
    </div>
  )
}

export default Signup;