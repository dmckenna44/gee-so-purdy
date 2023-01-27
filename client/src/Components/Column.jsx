import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Clue from './Clue.jsx';

/*
props: {
  category: string
  clues: array
}

*/

const Column = (props) => {
  const currGame = useSelector(state => state.game);
  const dispatch = useDispatch();

  const clueList = currGame.clues.map((clue, i) => {
    return <Clue 
        key={i}  
        column={props.index}
        index={i} 
        value={(i+1)*100} 
        question={clue.question} 
        answer={clue.answer} 
        state={props.state}
        saveGame={props.saveGame} 
        handleModal={props.handleModal}
      />
  })

  const setCategoryName = (e) => {
    e.preventDefault();
    dispatch({type: 'SET_CAT_NAME', payload: [e.target.value, props.index]})
    console.log('category index, name', props.index, currGame.categories)
  }

  return (
    <div className="column">
      <div className="category-card">
        <label htmlFor="">Category Name</label>
        <input type="text" onChange={setCategoryName}/>
        {/* <h2 contentEditable={true} onInput={setCategoryName} className="category-name" >{props.category}</h2> */}
      </div>
      {clueList}

    </div>
  )
}

export default Column;