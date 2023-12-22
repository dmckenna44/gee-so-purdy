import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_Q, SET_CURRENT_A, SET_CURRENT_MEDIA_URL, UPDATE_CLUE } from '../constants/actionTypes';
import { updateGame } from '../reducers/gameReducer.js';
import TextEditor from "./TextEditor.jsx";
import {socket} from '../apiRoutes.js';



const ClueInputModal = (props) => {

  const {handleModal, hidden} = props;
  const dispatch = useDispatch();
  const { currentIndex, currentQuestion, currentAnswer, currentMediaURL } = useSelector(state => state.game);

  const [mediaURL, setMediaURL] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [mediaInputDisplay, setMediaInputDisplay] = useState(false);

  useEffect(() => {
    if (currentMediaURL) {
      socket.emit('get_video_desc', {videoID: currentMediaURL.slice(-11)});
    };

    socket.on('send_video_desc', data => {
      setVideoDesc(data.items[0].snippet.title);
    });
  }, [currentMediaURL])
  
  const submitClue = (e) => {
    const newClue = {
      question: currentQuestion,
      answer: currentAnswer,
      mediaURL: currentMediaURL
    }
    dispatch({type: UPDATE_CLUE, payload: [currentIndex[0], currentIndex[1], newClue]})
    dispatch({type: SET_CURRENT_Q, payload: ''});
    dispatch({type: SET_CURRENT_A, payload: ''});
    dispatch({type: SET_CURRENT_MEDIA_URL, payload: ''});
    setMediaInputDisplay(false);
    dispatch(updateGame());
    handleModal(e);
  };

  const addMediaClue = (e) => {
    e.preventDefault();
    setMediaInputDisplay(!mediaInputDisplay);
  }
  
  const createMediaFile = (e) => {
    setMediaInputDisplay(!mediaInputDisplay);
    dispatch({type: SET_CURRENT_MEDIA_URL, payload: mediaURL});
  }
  
  const removeMediaFile = (e) => {
    e.preventDefault();
    dispatch({type: SET_CURRENT_MEDIA_URL, payload: ''})
    setVideoDesc('');
  }

  const updateURL = (e) => {
    e.preventDefault();
    setMediaURL(e.target.value);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setMediaURL('');
    setMediaInputDisplay(false);
    handleModal(e)
  }

  if (hidden) return null;
  return (
    <div id='input-modal'>
      <h2>Add a New Clue</h2>
      <div className="inputDisplay">
          <h3>Question</h3>
          <TextEditor type="question" id="question-editor" className="text-editor" />
        </div>
      {
        mediaInputDisplay ? 
        <div className="inputDisplay">
          <p>Paste YouTube link here</p>
          <input type="text" onChange={updateURL}></input>
        </div> 
          :
        null
      }
      {currentMediaURL && <h4>Current Video</h4>}
      {/* {currentMediaURL && <YouTubeEmbed videoId={currentMediaURL.slice(-11)} width="100%" height="100%" />} */}
      {currentMediaURL && videoDesc && <a href={currentMediaURL}>{videoDesc}</a>}
      <div className="clue-input-btns">
        {!mediaInputDisplay && <button onClick={(e) => addMediaClue(e)}>{`${!currentMediaURL ? 'Add' : 'Update'} YouTube Video`}</button> }
        
        {mediaInputDisplay && <button onClick={createMediaFile}>Set Video</button> }
        {mediaInputDisplay && <button onClick={removeMediaFile}>Remove Video</button> }
        {mediaInputDisplay && <button onClick={(e) => addMediaClue(e)}>Cancel</button>}
      </div>
      <div className="inputDisplay">
        <h3>Answer</h3>
        <TextEditor type="answer" id="answer-editor" />
      </div>
      <div className="clue-input-btns">
        <button type="button" onClick={submitClue}>Save Changes</button>
        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
  </div>
  )
}


export default ClueInputModal;