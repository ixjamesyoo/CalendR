import * as SessionAPIUtil from "../util/session_api_util";
import { closeModal } from './modal_actions';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_DETAILED_USER = "RECEIVE_DETAILED_USER";

export const receiveCurrentUser = ({ user, favorites }) => {
  return ({
    type: RECEIVE_CURRENT_USER,
    user,
    favorites
  });
};

export const logoutCurrentUser = () => {
  return ({
    type: LOGOUT_CURRENT_USER
  });
};

export const receiveSessionErrors = errors => {
  return  ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  });
};

export const clearSessionErrors = () => {
  return ({type: CLEAR_SESSION_ERRORS,
  });
};

export const signup = user => dispatch => {
  return SessionAPIUtil.signup(user).then(payload => {
    dispatch(receiveCurrentUser(payload));
    dispatch(closeModal());
  }, err => {
    dispatch(receiveSessionErrors(err.responseJSON));
  });
};

export const login = user => dispatch => {
  return SessionAPIUtil.login(user).then(payload => {
    dispatch(receiveCurrentUser(payload));
    dispatch(closeModal());
  }, err => (
    dispatch(receiveSessionErrors(err.responseJSON))
  ));
};

export const logout = () => dispatch => {
  return SessionAPIUtil.logout().then( () => (
    dispatch(logoutCurrentUser())
  ), err => (
    dispatch(receiveSessionErrors(err.responseJSON))
  ));
};
