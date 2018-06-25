import * as EventAPIUtil from "../util/event_api_util";
import { closeModal } from './modal_actions';

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";
export const CLEAR_EVENT_ERRORS = "CLEAR_EVENT_ERRORS";

export const receiveEvents = events => {
  return ({
    type: RECEIVE_EVENTS,
    events
  });
};

export const receiveEvent = event => {
  return ({
    type: RECEIVE_EVENT,
    event
  });
};

export const removeEvent = event => {
  return ({
    type: REMOVE_EVENT,
    event
  });
};

export const receiveEventErrors = errors => {
  return  ({
    type: RECEIVE_EVENT_ERRORS,
    errors
  });
};

export const clearEventErrors = () => {
  return ({type: CLEAR_EVENT_ERRORS,
  });
};

export const fetchEvents = () => dispatch => {
  return EventAPIUtil.fetchEvents().then(events => {
    dispatch(receiveEvents(events));
  });
};

export const createEvent = event => dispatch => {
  return EventAPIUtil.createEvent(event).then(newEvent => {
    dispatch(receiveEvent(newEvent));
    dispatch(closeModal());
  }, err => {
    dispatch(receiveEventErrors(err.responseJSON));
  });
};

export const updateEvent = event => dispatch => {
  return EventAPIUtil.updateEvent(event).then(newEvent => {
    dispatch(receiveEvent(newEvent));
    dispatch(closeModal());
  }, err => {
    dispatch(receiveEventErrors(err.responseJSON));
  });
};

export const deleteEvent = id => dispatch => {
  return EventAPIUtil.deleteEvent(id).then(event => {
    dispatch(closeModal());
    dispatch(removeEvent(event));
  }, err => {
    dispatch(receiveEventErrors(err.responseJSON));
  });
};
