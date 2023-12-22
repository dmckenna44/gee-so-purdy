import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_Q, SET_CURRENT_A, SET_CURRENT_MEDIA_URL, UPDATE_CLUE } from '../constants/actionTypes';
import { updateGame } from '../reducers/gameReducer.js';
import TextEditor from "./TextEditor.jsx";
import {socket} from '../apiRoutes.js';



const ClueInputModal = (props) => {

  const {handleModal, hidden} = props;
  const dispatch = useDispatch();
  const { currentIndex, currentQuestion, currentAnswer, currentMediaURL, clues } = useSelector(state => state.game);

  const [image, setImage] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [mediaURL, setMediaURL] = useState('');
  const [mediaFile, setMediaFile] = useState();
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
    console.log(clues)
    console.log('media url: ', currentMediaURL)
    dispatch({type: SET_CURRENT_Q, payload: ''});
    dispatch({type: SET_CURRENT_A, payload: ''});
    dispatch({type: SET_CURRENT_MEDIA_URL, payload: ''});
    setMediaInputDisplay(false);
    dispatch(updateGame());
    handleModal(e);
  };

  const addMediaClue = (e, type) => {
    e.preventDefault();
    switch (type) {
      case 'image':
        setMediaType('image')
        break;
      case 'audio':
        setMediaType('audio')
        break;
      default:
        setMediaType('video')
    }
    setMediaInputDisplay(!mediaInputDisplay);
  }
  
  const createMediaFile = (e) => {
    // console.log('file upload', e.target.files);
    // const fileURL = URL.createObjectURL(e.target.files[0]);
    // console.log(fileURL)
    // setImage(fileURL);
    setMediaInputDisplay(!mediaInputDisplay);
    dispatch({type: SET_CURRENT_MEDIA_URL, payload: mediaURL});
  }
  
  const removeMediaFile = (e) => {
    e.preventDefault();
    dispatch({type: SET_CURRENT_MEDIA_URL, payload: ''})
    setVideoDesc('');
  }

  const updateImgFile = (e) => {
    
  }

  const updateURL = (e) => {
    e.preventDefault();
    setMediaURL(e.target.value);
  }

  const mediaInput = (type) => {

    switch (type) {
      default:
        return (
          <div className="inputDisplay">
          <p>Paste a link to a YouTube video</p>
          <input type="text" onChange={updateURL}></input>
        </div> 
        )
      case 'audio':
        return (
          <div className="inputDisplay">
          <p>Paste a link to a YouTube video</p>
          <input type="text" onChange={updateURL}></input>
          </div> 
        );
      case 'image':
        return (
          <div className="inputDisplay">
          <p>Upload an image or paste a link</p>
          <input type="text" onChange={updateURL}></input>
          <input type="file" onChange={updateImgFile}></input>
          </div> 
        )
    }
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
          <p>Paste a link to a YouTube video</p>
          <input type="text" onChange={updateURL}></input>
        </div> 
          :
        null
      }
      {currentMediaURL && <h4>Current Video</h4>}
      {/* {currentMediaURL && <YouTubeEmbed videoId={currentMediaURL.slice(-11)} width="100%" height="100%" />} */}
      {currentMediaURL && videoDesc && <a href={currentMediaURL}>{videoDesc}</a>}
      <div className="clue-input-btns">
        {!mediaInputDisplay && currentMediaURL && <button onClick={(e) => addMediaClue(e)}>Update Media</button> }
        {!mediaInputDisplay && <button onClick={(e) => addMediaClue(e, 'video')}>Add YouTube Video</button> }
        {!mediaInputDisplay && <button onClick={(e) => addMediaClue(e, 'image')}>Add Image</button> }
        {!mediaInputDisplay && <button onClick={(e) => addMediaClue(e, 'audio')}>Add YouTube Audio</button> }


        {mediaInputDisplay && <button onClick={createMediaFile}>Save Video</button> }
        {mediaInputDisplay && <button onClick={removeMediaFile}>Remove Video</button> }
        {mediaInputDisplay && <button onClick={(e) => addMediaClue(e)}>Cancel</button>}
      </div>
      <div className="inputDisplay">
        <h3>Answer</h3>
        <TextEditor type="answer" id="answer-editor" />
      </div>
      <div className="clue-input-btns">
        <button type="button" onClick={submitClue}>Save Clue</button>
        <button className="close-btn" onClick={handleModal}>Close</button>
      </div>
  </div>
  )
}


export default ClueInputModal;