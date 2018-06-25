import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";
import { fetchEvents } from "../../actions/event_actions";
import { datetimeSort } from "../../util/date_util";
import DayCell from "./day_cell";


const mapStateToProps = ({ entities }, { date }) => {
  const events = Object.values(entities.events);

  const relevantEvents = events.filter(event => {
    const start = moment(event.start.slice(0,10));
    return start.isSame(date, "day");
  });

  return {
    events: relevantEvents.sort(datetimeSort)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: (modal, date) => dispatch(openModal(modal, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayCell);
