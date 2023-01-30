import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index.js';
import { applyMiddleware } from 'redux';
import throttle from 'lodash';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = () => {
  try {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem('state', serializedState);
    return serializedState;
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();


const store = configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware],
  preloadedState: peristedState
})

// store.subscribe(throttle(() => {
//   saveState(store.getState());
// }, 1000));

store.subscribe(saveState);

export default store;