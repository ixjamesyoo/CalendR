import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import event from "./event_errors_reducer";

const errorsReducer = combineReducers({
  session,
  event
});

export default errorsReducer;
