import React from "react";
import merge from "lodash/merge";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formType !== nextProps.formType) {
      this.props.clearSessionErrors();
      this.setState({
        email: "",
        password: "",
        passwordConfirmation: "",
      });
    }
  }

  updateField(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if ( this.props.formType === "signup" &&
    this.state.password !== this.state.passwordConfirmation ){
      this.props.receiveSessionErrors(["Password confirmation does not match."]);
    } else {
      const user = merge({}, this.state);
      delete user.passwordConfirmation;
      this.props.processForm(user);
    }
  }

  handleDemo(e) {
    e.preventDefault();
    this.props.processForm({ email: "guest@guest.com", password: "password" });
  }

  passwordConfirmationInput() {
    if (this.props.formType === "login") return null;
    const { passwordConfirmation } = this.state;

    return (
        <input key="passwordConfirmation" type="password"
          value={ passwordConfirmation }
          onChange={ this.updateField("passwordConfirmation") }
          className="session-form-input"
          placeholder="Confirm Password *"/>
    );
  }

  switchFormLink() {
    if (this.props.formType === "login") {
      return (
        <p className="switch-form-link">New to CalendR?&nbsp;
          <button onClick={ () => this.props.openModal("signup") }>Create Account</button>
        </p>
      );
    } else {
      return (
        <p className="switch-form-link">Already a member?&nbsp;
          <button onClick={ () => this.props.openModal("login") }>Log In</button>
        </p>
      );
    }
  }

  emailInput() {
    const placeholder = this.props.formType === "signup" ? "Enter Email *" : "Email";
    return (
      <input type="email" value={ this.state.email }
        onChange={ this.updateField("email") }
        className="session-form-input"
        placeholder={ placeholder } />
    );
  }

  passwordInput() {
    const placeholder = this.props.formType === "signup" ? "Enter Password *" : "Password";
    return (
      <input type="password" value={ this.state.password }
        onChange={ this.updateField("password") }
        className="session-form-input"
        placeholder={ placeholder } />
    );
  }

  submitButton() {
    const buttonText = this.props.formType === "signup" ? "Create Account" : "Sign In";
    return (<input className="session-submit" type="submit" value={ buttonText } />);
  }

  demoButton() {
    if (this.props.formType === "signup") return null;
    return (
      <button onClick={ this.handleDemo }
        className="session-submit demo-submit">Guest Login</button>
    );
  }

  formHeader() {
    const heading = this.props.formType === "signup" ? "Welcome to CalendR!" : "Please Sign In";
    return (<h3>{ heading }</h3>);
  }

  errorMessages() {
    const errors = this.props.errors;
    if (errors.length === 0) {
      return null;
    } else {
      const errorLis =  errors.map( (error,idx) => (
        <li className="session-error-message" key={ idx }>{ error }</li>
      ));

      return (
        <ul>
          {errorLis}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="session-form-container">
        <button onClick={this.props.closeModal}
          className="close-button">&times;</button>
        <div className="session-form-header">
          { this.formHeader() }
          { this.errorMessages() }
        </div>

        <form onSubmit={ this.handleSubmit } className="session-form">
          { this.emailInput() }
          { this.passwordInput() }
          { this.passwordConfirmationInput() }
          { this.submitButton() }
          { this.demoButton() }
        </form>

        { this.switchFormLink() }
      </div>
    );
  }
}

export default SessionForm;
