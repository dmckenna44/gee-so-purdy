import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index.js';

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


store.subscribe(saveState);

export default store;