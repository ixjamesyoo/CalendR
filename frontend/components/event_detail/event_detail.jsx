import React from "react";
import moment from "moment";

export default ({ event, closeModal, deleteEvent, openUpdateModal }) => {
  function locationText() {
    return event.location ? <p><strong>Location:</strong> {event.location}</p> : null;
  }

  function notes() {
    return event.notes ? <p><strong>Notes:</strong> {event.notes}</p> : null;
  }


  return (
    <div className="event-detail-container">
      <header>
        <h2>{event.title}</h2>
        <section>
          <i className="fas fa-edit" onClick={ openUpdateModal }/>
          <i className="fas fa-trash-alt" onClick={ deleteEvent }/>
        </section>
      </header>

      <p><strong>Start:</strong> {moment(event.start).format("dddd, MMMM Do YYYY h:mm a")}</p>
      <p><strong>End: </strong> {moment(event.ending).format("dddd, MMMM Do YYYY h:mm a")}</p>
      { locationText() }
      { notes() }
    </div>
  );
};
