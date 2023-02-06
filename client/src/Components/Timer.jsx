import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../constants/actionTypes.js';
import {socket} from '../apiRoutes.js';


const Timer = (props) => {
  
  const {seconds} = props;
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const dispatch = useDispatch();
  const {roomID} = useSelector(state => state.game);

  useEffect(() => {
    const time = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1)
      } else {
        clearInterval(time)
        // socket.emit('send_active_player', {roomID: roomID, name: ''});
      }
    }, 1000);

    return () => clearInterval(time)
  })

  return (
      <p>Time to Respond: {secondsLeft}</p>
  )
}

export default Timer;