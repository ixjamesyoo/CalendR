import React from "react";
import moment from "moment";
import { datetimeSort } from "../../util/date_util";
import EventTab from "../event_overview/event_overview_tab_container";
import SessionForm from "../session_form/session_form_container";
import EventForm from "../event_form/event_form_container";
import EventDetail from "../event_detail/event_detail_container";

export default ({ events, modalType, date, eventId, openModal, closeModal }) => {
  if (!modalType) return null;

  const detailedEventOverview = () => {
    const allEvents = Object.values(events);
    const relevantEvents = allEvents.filter(event => {
      const start = moment(event.start.slice(0,10));
      return start.isSame(date, "day");
    });

    relevantEvents.sort(datetimeSort);
    
    return relevantEvents.length ? (
      relevantEvents.map((event, idx) => <EventTab event={ event } key={ idx }/>)
    ) : (
      <li>No events scheduled for today!</li>
    );
  };

  function createEvent() {
    openModal("createEvent", date);
  }

  function innerContent() {
    switch(modalType) {
      case "login":
      case "signup":
        return <SessionForm formType={ modalType }/>;
      case "dayOverview":
        return (
          <div className="day-overview-modal">
            <button onClick={ closeModal }
              className="close-button">&times;</button>
            <h1>{ date.format("dddd, MMMM Do YYYY") }</h1>
            <button className="day-view-add-event" onClick={ createEvent }>Add Event</button>
            <ul>
              { detailedEventOverview() }
            </ul>
          </div>
        );
      case "createEvent":
        return <EventForm formType={ modalType } date={ date }/>;
      case "updateEvent":
        return <EventForm formType={ modalType } eventId={ eventId } />;
      case "eventDetail":
        return <EventDetail eventId={ eventId } />;
    }
  }

  return (
    <div className="modal-background" onClick={ closeModal }>
      <div className="modal-child" onClick={ e => e.stopPropagation() }>
        { innerContent() }
      </div>
    </div>
  );
};
