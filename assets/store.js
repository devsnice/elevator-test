import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// reducers
import elevatorReducer from './containers/ElevatorContainer/redux/reducer.js';

const createLogger = require('redux-logger');
const logger = createLogger();


const store = createStore(elevatorReducer, applyMiddleware(thunk, logger));

export default store;
