import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_Q, SET_CURRENT_A, UPDATE_CLUE } from '../constants/actionTypes';
import { updateGame } from '../reducers/gameReducer.js';
import TextEditor from "./TextEditor.jsx";

const ClueInputModal = (props) => {

  const {handleModal, hidden} = props;
  const dispatch = useDispatch();
  const { currentIndex, currentQuestion, currentAnswer } = useSelector(state => state.game);
  // const [image, setImage] = useState('');
  
  const submitClue = (e) => {
    const newClue = {
      question: currentQuestion,
      answer: currentAnswer
    }
    dispatch({type: UPDATE_CLUE, payload: [currentIndex[0], currentIndex[1], newClue]})
    dispatch({type: SET_CURRENT_Q, payload: ''});
    dispatch({type: SET_CURRENT_A, payload: ''});
    dispatch(updateGame());
    handleModal(e);
  };

  // const addMediaClue = (e) => {
  //   e.preventDefault();

  // }


  // const setMediaFile = (e) => {
  //   console.log('file upload', e.target.files);
  //   const fileURL = URL.createObjectURL(e.target.files[0]);
  //   console.log(fileURL)
  //   setImage(fileURL);

  // }

  // const handleFocus = (e) => e.target.select();

  if (hidden) return null;
  return (
    <div id='input-modal'>
      <h2>Add a New Clue</h2>
      <div className="inputDisplay">
        <h3>Question</h3>
        <TextEditor type="question" id="question-editor" className="text-editor" />
        {/* <input type="file" onChange={setMediaFile} /> */}
        {/* {image ? <img src={image}/> : ''} */}
      </div>
      <div className="inputDisplay">
        <h3>Answer</h3>
        <TextEditor type="answer" id="answer-editor" />
        {/* <input type="text" id="input-answer" onFocus={handleFocus} value={currentAnswer} onChange={(e) => dispatch({type: SET_CURRENT_A, payload: e.target.value})} /> */}
      </div>
      {/* <button onClick={addMediaClue}>Add Picture/Video/Audio</button> */}
      <div className="clue-input-btns">
        <button type="button" onClick={submitClue}>Submit</button>
        <button className="close-btn" onClick={handleModal}>Close</button>
      </div>
  </div>
  )
}


export default ClueInputModal;