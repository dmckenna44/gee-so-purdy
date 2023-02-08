import React from "react";
import { useDispatch } from "react-redux";
import { SET_CAT_NAME } from "../constants/actionTypes.js";
import EditClue from './EditClue.jsx';

const EditColumn = (props) => {
  const {category, clues, index, handleModal} = props;
  const dispatch = useDispatch();
  const handleFocus = (e) => e.target.select();

  const clueList = clues.map((clue, i) => {
    return <EditClue 
        key={i}  
        column={index}
        index={i} 
        value={(i+1)*100} 
        question={clue.question} 
        answer={clue.answer} 
        handleModal={handleModal}
      />
  })

  const setCategoryName = (e) => {
    e.preventDefault();
    dispatch({type: SET_CAT_NAME, payload: [e.target.value, index]})
  }

  return (
    <div className="column">
      <div className="category-card">
        <label htmlFor="">Category Name</label>
        <input type="text" onFocus={handleFocus} value={category} onChange={setCategoryName}/>
      </div>
      {clueList}
    </div>
  )
}

export default EditColumn;