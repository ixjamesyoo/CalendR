import React from "react";
import moment from "moment";

export default ({event, openEventModal}) => {
  const handleClick = () => {
    openEventModal();
  };

  return (
    <li className="event-overview" onClick={ handleClick }>
      <p className="event-overview-title">{ event.title }</p>
      <p className="event-overview-timing">
        { moment(event.start).format("h:mm a") } - { moment(event.ending).format("h:mm a")}
      </p>
    </li>
  );
};
