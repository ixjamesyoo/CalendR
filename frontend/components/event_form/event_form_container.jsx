import { connect } from 'react-redux';
import {
  createEvent,
  updateEvent,
  clearEventErrors,
} from '../../actions/event_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import EventForm from "./event_form";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.event,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.formType === "createEvent" ? createEvent : updateEvent;

  return {
    processForm: event => dispatch(processForm(event)),
    closeModal: () => dispatch(closeModal()),
    clearEventErrors: () => dispatch(clearEventErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
