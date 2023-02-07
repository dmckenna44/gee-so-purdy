import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {socket} from '../apiRoutes.js';


const Timer = (props) => {
  
  const {seconds} = props;
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    const time = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1)
      } else {
        clearInterval(time)
      }
    }, 1000);

    return () => clearInterval(time)
  })

  return (
      <p>Time to Respond: {secondsLeft}</p>
  )
}

export default Timer;