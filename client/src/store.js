import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index.js';
import { applyMiddleware } from 'redux';


const store = createStore(
  reducers, 
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;