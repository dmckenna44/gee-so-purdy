import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_Q, SET_CURRENT_A, SET_CURRENT_MEDIA_URL, UPDATE_CLUE } from '../constants/actionTypes';
import { updateGame } from '../reducers/gameReducer.js';
import TextEditor from "./TextEditor.jsx";
import YouTubeEmbed from "./YoutubeEmbed.jsx";


const ClueInputModal = (props) => {

  const {handleModal, hidden} = props;
  const dispatch = useDispatch();
  const { currentIndex, currentQuestion, currentAnswer, currentMediaURL, clues } = useSelector(state => state.game);

  const [image, setImage] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [mediaURL, setMediaURL] = useState('');
  const [mediaFile, setMediaFile] = useState();
  const [mediaInputDisplay, setMediaInputDisplay] = useState(false);
  
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

  const addMediaClue = (e) => {
    e.preventDefault();
    setMediaInputDisplay(!mediaInputDisplay);
    // setMediaType('image');
  }

  const createMediaFile = (e) => {
    // console.log('file upload', e.target.files);
    // const fileURL = URL.createObjectURL(e.target.files[0]);
    // console.log(fileURL)
    // setImage(fileURL);
    dispatch({type: SET_CURRENT_MEDIA_URL, payload: e.target.value})
    setMediaURL(e.target.value);
  }

  const mediaPrompt = () => {
    if (mediaType === 'image') {
      return <div>
          <p>Upload an image, or paste an image URL from the web</p>
          {/* <input type="text" className="image-upload-input"/> */}
        </div>
    } else if (mediaType === 'audio') {
      return <p>Upload a file from your computer</p>
    } else if (mediaType === 'video') {
      return <p>Upload a video or paste a YouTube URL</p>
    }
  }

  // const handleFocus = (e) => e.target.select();

  if (hidden) return null;
  return (
    <div id='input-modal'>
      <h2>Add a New Clue</h2>
      {
        mediaInputDisplay ? 
        <div className="inputDisplay">
          <label htmlFor="mediaOptions">What Type of Media?</label>
          <select name="mediaOptions" id="mediaOptions" onChange={(e) => setMediaType(e.target.value)}>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
          {mediaPrompt()}
          {mediaType === 'image' || mediaType === 'video' ? <input type="text" onChange={createMediaFile}></input> : ''}
          {/* <input type="file" onChange={createMediaFile} /> */}
          {image ? <img src={image}/> : ''}
        </div> 
          :
        <div className="inputDisplay">
          <h3>Question</h3>
          <TextEditor type="question" id="question-editor" className="text-editor" />
        </div>
      }
      {currentMediaURL && <h3>Media</h3>}
      {currentMediaURL && <YouTubeEmbed videoId={currentMediaURL.slice(-11)} width="100%" height="30%" />}
      <div className="clue-input-btns">
        <button onClick={addMediaClue}>{currentMediaURL ? 'Update Media' : 'Add Media'}</button>
        {mediaInputDisplay && <button>Cancel</button>}
      </div>
      <div className="inputDisplay">
        <h3>Answer</h3>
        <TextEditor type="answer" id="answer-editor" />
      </div>
      <div className="clue-input-btns">
        <button type="button" onClick={submitClue}>Submit</button>
        <button className="close-btn" onClick={handleModal}>Close</button>
      </div>
  </div>
  )
}


export default ClueInputModal;