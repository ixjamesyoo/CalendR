import { connect } from 'react-redux';
import { login,
  signup,
  clearSessionErrors,
  receiveSessionErrors
} from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import SessionForm from "./session_form";

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const processForm = ownProps.formType === "signup" ? signup : login;

  return {
    processForm: user => dispatch(processForm(user)),
    receiveSessionErrors: (errors) => dispatch(receiveSessionErrors(errors)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
