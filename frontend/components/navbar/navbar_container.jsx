import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login, logout } from '../../actions/session_actions';
import { openModal } from "../../actions/modal_actions";
import NavBar from "./navbar";

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.entities.users[state.session.currentUser]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
