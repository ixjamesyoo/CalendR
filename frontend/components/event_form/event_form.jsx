import React from "react";
import merge from "lodash/merge";
import moment from 'moment';
import Datetime from "react-datetime";

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateStartTime = this.updateStartTime.bind(this);
    this.updateEndTime = this.updateEndTime.bind(this);
  }

  initialState(){
    if (this.props.formType === "createEvent") {
      const { date } = this.props;
      return {
        title: "",
        start_datetime: date.clone().startOf("hour"),
        end_datetime: date.clone().startOf("hour").add(1, "hours"),
        location: "",
        notes: ""
      };
    } else {
      const { event } = this.props;
      return {
        title: event.title,
        start_datetime: moment(event.start),
        end_datetime: moment(event.ending),
        location: event.location,
        notes: event.notes
      };
    }
  }

  updateField(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  updateStartTime(start_datetime) {
    this.setState({ start_datetime });
    if ( start_datetime.isAfter(this.state.end_datetime)){
      this.setState({end_datetime: start_datetime.clone().add(1, "hours")});
    }
  }

  updateEndTime(end_datetime) {
    this.setState({ end_datetime });
    if ( end_datetime.isBefore(this.state.start_datetime)){
      this.setState({start_datetime: end_datetime.clone().subtract(1, "hours")});
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const format = "YYYY-MM-DD h:mm a Z";
    const { title, location, notes, start_datetime, end_datetime }  = this.state;
    const start = `${start_datetime.format(format)}`;
    const ending = `${end_datetime.format(format)}`;
    let event = merge({}, { title, location, notes, start, ending });

    if (this.props.formType === "updateEvent") {
      event = merge({}, event, {id: this.props.eventId});
    }

    this.props.processForm(event);
  }

  startTime(){
    const timeFormat = 'h:mm a';
    const dateFormat = "YYYY-MM-DD";
    return (
      <label> Start
        <Datetime value={ this.state.start_datetime }
          onChange={ this.updateStartTime }
          timeFormat={ timeFormat }
          dateFormat={ dateFormat }
          inputProps={{ disabled: true }}
          className="event-form-datetime"
          />
      </label>
    );
  }

  endTime(){
    const timeFormat = 'h:mm a';
    const dateFormat = "YYYY-MM-DD";
    return (
      <label> End
        <Datetime value={ this.state.end_datetime }
          onChange={ this.updateEndTime }
          format={ timeFormat }
          dateFormat={ dateFormat }
          inputProps={{ disabled: true }}
          className="event-form-datetime"
          />
      </label>
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
        placeholder="Event Title/Description (Required)"
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
        <form className="event-form" onSubmit={ this.handleSubmit }>
          { this.errorMessages() }
          { this.titleInput() }
          { this.startTime() }
          { this.endTime() }
          { this.locationInput() }
          { this.notesInput() }
          { this.submitButton() }
        </form>
      </div>
    );
  }

}
