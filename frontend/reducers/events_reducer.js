import merge from "lodash/merge";
import {
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
  REMOVE_EVENT
} from "../actions/event_actions";

export default (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_EVENTS:
      return action.events;
    case RECEIVE_EVENT:
      return merge({}, state, { [action.event.id]: action.event });
    case REMOVE_EVENT:
      const newState = merge({}, state);
      delete newState[action.event.id];
      return newState;
    default:
      return state;
  }
};
