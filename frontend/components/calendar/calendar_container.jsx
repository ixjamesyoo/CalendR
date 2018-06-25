import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchEvents } from "../../actions/event_actions";
import Calendar from "./calendar";

const mapStateToProps = ({ entities }) => {
  return {
    events: entities.events
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: (...args) => dispatch(openModal(...args)),
    fetchEvents: () => dispatch(fetchEvents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
