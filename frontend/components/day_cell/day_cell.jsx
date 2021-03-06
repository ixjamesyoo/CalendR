import React from "react";
import moment from "moment";

export default ({ date, selected, setDate, events, openModal }) => {

  function handleClick() {
    if (selected.isSame(date, "month")) {
      openModal("dayOverview", date);
    }
    setDate(date);
  }

  function eventOverview() {
    return events.map((event, idx) => (
        <p key={ idx } className="event-preview">
          <span>{ moment(event.start).format("h:mma") }</span> { event.title }
        </p>
      )
    );
  }

  function dateTitle() {
    const sameAsToday = date.isSame(moment(), "day") ? "today" : "";
    const sameAsSelected = date.isSame(selected, "day") ? "highlight" : "";
    const inactive = date.month() === selected.month() ? "" : "inactive";
    return (
      <span className={`${sameAsToday} ${sameAsSelected} ${inactive}`}>{ date.date() }</span>
    );
  }

  return (
    <div onClick={ handleClick } className="calendar-day">
      { dateTitle() }
      { eventOverview() }
    </div>
  );
};
