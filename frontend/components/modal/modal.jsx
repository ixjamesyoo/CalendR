import React from "react";
import moment from "moment";
import EventTab from "../event_overview/event_overview_tab";
import SessionForm from "../session_form/session_form_container";
import EventForm from "../event_form/event_form_container";

export default ({ events, modalType, date, eventId, openModal, closeModal }) => {
  if (!modalType) return null;

  const detailedEventOverview = () => {
    const allEvents = Object.values(events);
    const relevantEvents = allEvents.filter(event => {
      const start = moment(event.start.slice(0,10));
      return start.isSame(date, "day");
    });

    return relevantEvents.length ? (
      relevantEvents.map((event, idx) => (
        <EventTab event={ event } key={ idx }/>
      ))
    ) : (
      <li>No events scheduled for today!</li>
    );
  };

  function createEvent() {
    openModal("createEvent", date);
  }

  switch(modalType) {
    case "login":
    case "signup":
      return (
        <div className="modal-background" onClick={ closeModal }>
          <div className="modal-child" onClick={ e => e.stopPropagation() }>
            <SessionForm formType={ modalType }/>
          </div>
        </div>
      );
    case "dayOverview":
      return (
        <div className="modal-background" onClick={ closeModal }>
          <div className="modal-child" onClick={ e => e.stopPropagation() }>
            <div className="day-overview-modal">
              <button onClick={ closeModal }
                className="close-button">&times;</button>
              <h1>{ date.format("dddd, MMMM Do YYYY") }</h1>
              <button onClick={ createEvent }>Add Event</button>
              <ul>
                { detailedEventOverview() }
              </ul>
            </div>
          </div>
        </div>
      );
    case "createEvent":
      return (
        <div className="modal-background" onClick={ closeModal }>
          <div className="modal-child" onClick={ e => e.stopPropagation() }>
            <EventForm formType={ modalType } date={ date }/>
          </div>
        </div>
      );
  }
};
