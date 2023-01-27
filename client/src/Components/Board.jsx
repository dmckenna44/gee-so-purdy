import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Column from './Column.jsx';
import ClueInputModal from "./ClueInputModal.jsx";

/*
state passed in: {
    userId: number,
    name: string,
    numCategories: number,
    numQuestions: number,
    categories: array,
    clues: array of arrays
}
*/


const Board = (props) => {

  const [showModal, setShowModal] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    console.log('button clicked')
    setShowModal(!showModal);
  }

  // create an array of columns
  // each column will be an array with the category at index 0 and the clues as the rest of the elements
  const columns = props.state.categories.map((cat, i) => {
    return <Column 
        key={i} 
        index={i} 
        category={cat} 
        clues={props.state.clues[i]} 
        state={props.state}
        saveGame={props.saveGame}
        handleModal={handleModal}
      />
  })

  return (
    <div className="game-board">
      <button onClick={handleModal} >change modal</button>
      <ClueInputModal hidden={false} handleModal={handleModal} />
      { columns }
    </div>
  )
}


export default Board;