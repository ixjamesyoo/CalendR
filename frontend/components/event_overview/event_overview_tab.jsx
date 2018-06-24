import React from "react";
import moment from "moment";

export default ({event}) => {

  // onclick will open update modal
  return event.all_day ? (
    <li className="event-overview">
      <p className="event-overview-title">{ event.title }</p>
      <p className="event-overview-timing">All day</p>
    </li>
  ) : (
    <li className="event-overview">
      <p className="event-overview-title">{ event.title }</p>
      <p className="event-overview-timing">
        { moment(event.start).format("h:mm a") } - { moment(event.ending).format("h:mm a")}
      </p>
    </li>
  );
};
