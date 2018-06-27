import React from "react";
import moment from "moment";
import DayCell from "../day_cell/day_cell";
import ViewUnit from "../view_unit/view_unit";

const MONTHS = "months";
const WEEKS = "weeks";
const DAYS = "days";

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    let today = moment();
    this.state = {
      today,
      selected: today,
      view: MONTHS
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setView = this.setView.bind(this);
    this.createEventModal = this.createEventModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  previous() {
    const { selected, view } = this.state;
    this.setState({ selected: selected.subtract(1, view)});
  }

  next() {
    const { selected, view } = this.state;
    this.setState({ selected: selected.add(1, view)});
  }

  createEventModal() {
    const { openModal } = this.props;
    openModal("createEvent", this.state.selected);
  }

  setDate(newDate) {
    this.setState({ selected: newDate });
  }

  setView(view) {
    return () => this.setState({ view });
  }

  headerRow() {
    const { today, selected, view } = this.state;

    let title;
    if (view === MONTHS || view === WEEKS) {
      const month = `${monthNamesFull[selected.month()]}`;
      const year = selected.year();
      title = `${month} ${year}`;
    }
    return (
      <header className="calendar-header">
        <button onClick={ this.previous }>
          <i className="fas fa-2x fa-chevron-circle-left"></i>
        </button>
        <div className="calendar-header-middle">
          <p className="calendar-title">{ title }</p>
          <button onClick={ this.createEventModal }>
            <i className="fa fa-lg fa-plus-circle" aria-hidden="true"></i>
          </button>
          <div className="calendar-buttons">
            { this.viewButtons() }
          </div>
        </div>
        <button onClick={ this.next }>
          <i className="fas fa-2x fa-chevron-circle-right"></i>
        </button>
      </header>
    );
  }

  viewButtons() {
    const { view } = this.state;
    const activeMonth = view === MONTHS ? "active-view" : "";
    const activeWeek = view === WEEKS ? "active-view" : "";

    return (
      <React.Fragment>
        <button className={`view-button ${activeMonth}`} onClick={ this.setView(MONTHS) }>Month</button>
        <button className={`view-button ${activeWeek}`} onClick={ this.setView(WEEKS) }>Week</button>
      </React.Fragment>
    );
  }

  weekdayNames() {
    const { view } = this.state;

    return view === MONTHS || view === WEEKS ? (
      <div className="weekday-namebar">
        <p>Sunday</p>
        <p>Monday</p>
        <p>Tuesday</p>
        <p>Wednesday</p>
        <p>Thursday</p>
        <p>Friday</p>
        <p>Saturday</p>
      </div>
    ) : null;
  }

  dates() {
    const { today, selected, view } = this.state;

    const dates = [];
    if (view === MONTHS) {
      for (let counter = selected.clone().startOf("month"); counter.month() === selected.month(); counter.add(1, "day")) {
        const _date = counter.clone();
        dates.push(_date);
      }
    } else if (view === WEEKS) {
      for (let counter = selected.clone().startOf("week"); counter.week() === selected.week(); counter.add(1, "day")) {
        const _date = counter.clone();
        dates.push(_date);
      }
    }

    return dates;
  }

  render() {
    const { today, selected, view } = this.state;
    return (
      <div className="calendar-master">
        <div className="calendar-container">
          { this.headerRow() }
          { this.weekdayNames() }
          <ViewUnit view={ view } dates={ this.dates() }
            selected={ selected } setDate={ this.setDate }/>
        </div>
      </div>
    );
  }
}
