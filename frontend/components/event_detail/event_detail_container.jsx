import { connect } from "react-redux";
import { openModal, closeModal } from '../../actions/modal_actions';
import { deleteEvent } from "../../actions/event_actions";
import EventDetail from "./event_detail";

const mapStateToProps = ({ entities }, { eventId }) => {
  return {
    event: entities.events[eventId]
  };
};

const mapDispatchToProps = (dispatch, { eventId }) => {
  return {
    closeModal: () => dispatch(closeModal()),
    deleteEvent: () => dispatch(deleteEvent(eventId)),
    openUpdateModal: () => dispatch(openModal("updateEvent", null, eventId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
