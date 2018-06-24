import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { openModal } from "../../actions/modal_actions";
import { fetchEvents } from "../../actions/event_actions";
import DayCell from "./day_cell";


const mapStateToProps = ({ entities }, { date }) => {
  const events = Object.values(entities.events);

  const relevantEvents = events.filter(event => {
    const start = moment(event.start.slice(0,10));
    return start.isSame(date, "day");
  });

  return {
    events: relevantEvents
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: (modal, date) => dispatch(openModal(modal, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayCell);
