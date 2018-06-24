import merge from "lodash/merge";
import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

const defaultState = {
  modalType: null,
  date: null,
  eventId: null
};

export default (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case OPEN_MODAL:
      const modalType = action.modal;
      const date = action.date ? action.date : null;
      const eventId = action.eventId ? action.eventId : null;
      return merge({}, state, { modalType, date, eventId });
    case CLOSE_MODAL:
      return defaultState;
    default:
      return state;
  }
};
