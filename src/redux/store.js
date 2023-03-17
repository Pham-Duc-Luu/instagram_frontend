import { createStore } from 'redux';
import userReducer from './reducers';

// Create your Redux store
const store = createStore(userReducer);

export default store;
