import React from "react";

export default ({ date, selected, setDate, events }) => {
  const inactive = date.month() === selected.month() ? "" : "inactive";

  function setCalendarDate() {
    setDate(date);
  }

  function eventOverview() {
    if (events.length) {
      return events.map((event, idx) => (
        <span key={ idx }>{ event.title }</span>
      ));
    }

  }

  return (
    <div onClick={ setCalendarDate }className={ `calendar-day ${inactive}`}>
      { date.date() }
      { eventOverview() }
    </div>
  );
};
