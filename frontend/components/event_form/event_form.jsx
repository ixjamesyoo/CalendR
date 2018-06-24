import React from "react";
import merge from "lodash/merge";
import moment from 'moment';
import TimePicker from 'rc-time-picker';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  initialState(){
    const { formType, date } = this.props;
    const dateFormat = "YYYY-MM-DD";
    if (formType === "createEvent") {
      return {
        title: "",
        start_date: date.format(dateFormat),
        end_date: date.format(dateFormat),
        start_time: moment().startOf("hour").add(1, "hours"),
        end_time: moment().startOf("hour").add(2, "hours"),
        all_day: 0,
        location: "",
        notes: ""
      };
    }
    // else {
    // }
  }

  updateField(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e){
    e.preventDefault();
    const timeFormat = 'h:mm a';
    const { title, all_day, location, notes, start_time, end_time, start_date, end_date }  = this.state;
    const start = `${start_date} ${start_time.format(timeFormat)}`;
    const ending = `${end_date} ${end_time.format(timeFormat)}`;
    let event = merge({}, { title, all_day, location, notes, start, ending });

    if (this.props.formType === "updateEvent") {
      event = merge({}, event, {id: this.props.eventId});
    }

    this.props.processForm(event);
  }

  startTime(){
    return (
      <TimePicker value={ this.state.start_time }
        />
    );
  }

  errorMessages() {
    const errors = this.props.errors;
    if (errors.length === 0) {
      return null;
    } else {
      const errorLis =  errors.map( (error,idx) => (
        <li className="session-error-message" key={ idx }>{ error }</li>
      ));

      return <ul>{errorLis}</ul>;
    }
  }

  titleInput(){
    return (
      <input type="text" value={ this.state.title }
        onChange={ this.updateField("title") }
        placeholder="Event Title/Description"
        className="session-form-input"/>
    );
  }

  locationInput(){
    return (
      <input type="text" value={ this.state.location}
        onChange={ this.updateField("location") }
        placeholder="Location"
        className="session-form-input"/>
    );
  }

  notesInput(){
    return (
      <textarea value={ this.state.notes }
        onChange={ this.updateField("notes")}
        placeholder="Notes"
        className="session-form-input"/>
    );
  }

  submitButton() {
    const buttonText = this.props.formType === "createEvent" ? "Create Event" : "Update Event";
    return (<input className="session-submit" type="submit" value={ buttonText } />);
  }

  render() {
    return (
      <div className="event-form-container">
        <form onSubmit={ this.handleSubmit }>
          { this.errorMessages() }
          { this.titleInput() }
          { this.startTime() }
          { this.locationInput() }
          { this.notesInput() }
          { this.submitButton() }
        </form>
      </div>
    );
  }

}
