import { combineReducers } from "redux";

import gameReducer from './gameReducer.js';


const reducers = combineReducers({
  game: gameReducer,
});

export default reducers;