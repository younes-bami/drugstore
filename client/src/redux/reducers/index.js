import { combineReducers } from 'redux';
import drugstoreReducer from './drugstoreReducer';

export default combineReducers({
  drugstores: drugstoreReducer,
});
