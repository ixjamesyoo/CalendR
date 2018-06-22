import { combineReducers } from 'redux';
import users from './users_reducer';
import events from "./events_reducer";

const entitiesReducer = combineReducers({
  users,
  events
});

export default entitiesReducer;
