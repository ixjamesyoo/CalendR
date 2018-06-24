import {
  RECEIVE_EVENT_ERRORS,
  RECEIVE_EVENT,
  RECEIVE_EVENTS,
  CLEAR_EVENT_ERRORS
} from '../actions/event_actions';
import { CLOSE_MODAL } from "../actions/modal_actions";

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_EVENT:
    case RECEIVE_EVENTS:
    case CLEAR_EVENT_ERRORS:
    case CLOSE_MODAL:
      return [];
    default:
      return state;
  }
};
