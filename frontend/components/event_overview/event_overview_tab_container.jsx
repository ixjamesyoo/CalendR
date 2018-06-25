import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import EventTab from "./event_overview_tab";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openEventModal: () => dispatch(openModal("eventDetail", null, ownProps.event.id))
  };
};

export default connect(null, mapDispatchToProps)(EventTab);
