import React from "react";
import { useDispatch } from "react-redux";
import { SET_CAT_NAME } from "../constants/actionTypes.js";
import Clue from './Clue.jsx';

const Column = (props) => {
  const {category, clues, index, handleModal} = props;
  const dispatch = useDispatch();
  console.log('props from column', clues)

  const clueList = clues.map((clue, i) => {
    return <Clue 
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
        <input type="text" value={category} onChange={setCategoryName}/>
      </div>
      {clueList}
    </div>
  )
}

export default Column;