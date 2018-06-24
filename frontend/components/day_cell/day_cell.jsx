import React from "react";
import moment from "moment";

export default ({ date, selected, setDate, events, openModal }) => {
  const inactive = date.month() === selected.month() ? "" : "inactive";

  function handleClick() {
    if (selected.month() === date.month()) {
      openModal("dayOverview", date);
    }
    setDate(date);
  }

  function eventOverview() {
    if (events.length) {
      return events.map((event, idx) => (
        event.all_day ? (
          <p key={ idx } className="event-preview all-day">
            { event.title }
          </p>
        ) : (
          <p key={ idx } className="event-preview">
            <span>{ moment(event.start).format("h:mma") }</span> { event.title }OVERFLOWWW
          </p>
        )
      ));
    }
  }

  return (
    <div onClick={ handleClick }className={ `calendar-day ${inactive}`}>
      { date.date() }
      { eventOverview() }
    </div>
  );
};
