import { connect } from "react-redux";
import { openModal, closeModal } from "../../actions/modal_actions";
import Modal from "./modal";

const mapStateToProps = ({ entities, ui }) => {
  return {
    events: entities.events,
    modalType: ui.modal.modalType,
    date: ui.modal.date,
    eventId: ui.modal.eventId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: (...args) => dispatch(openModal(...args)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
