import React from "react";
import { first, last } from "lodash";
import DayCell from "../day_cell/day_cell_container";

const MONTHS = "months";
const WEEKS = "weeks";
const DAYS = "days";

export default ({ view, dates, selected, setDate }) => {

  const monthExtension = (datesArray) => {
    while (first(datesArray).day()) {
      const firstDate = first(datesArray);
      datesArray.unshift(firstDate.clone().subtract(1, "day"));
    }
    while (last(datesArray).day() !== 6) {
      const lastDate = last(datesArray);
      datesArray.push(lastDate.clone().add(1, "day"));
    }
    return datesArray;
  };

  const viewGrid = () => {
    switch (view) {
      case MONTHS:
        const allDates = monthExtension(dates);
        const monthGrid = [];
        let weekGrid = [];
        for (let i = 0; i < allDates.length; i++) {
          weekGrid.push(<DayCell key={allDates[i]} date={ allDates[i] }
            setDate={ setDate }
            selected={ selected }/>);
          if (allDates[i].day() === 6) {
            monthGrid.push(weekGrid);
            weekGrid = [];
          }
        }

        return monthGrid.map((week, idx) => (
          <div key={ idx } className="calendar-week">
            { week }
          </div>
        ));

      case WEEKS:
        const dayCells = dates.map(date => (
          <DayCell key={ date } date={ date }
          setDate={ setDate }
          selected={ selected }/>
        ));

        return (
          <div className="calendar-week">
            { dayCells }
          </div>
        );

    }
  };

  return (
    <div className="calendar-month">
      { viewGrid() }
    </div>
  );
};
