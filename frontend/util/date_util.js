import moment from "moment";

export const datetimeSort = (a,b) => {
  const aStart = moment(a.start);
  const bStart = moment(b.start);

  if (aStart.isBefore(bStart, "minute")){
    return -1;
  } else if (bStart.isBefore(aStart, "minute")) {
    return 1;
  } else {
    return 0;
  }
};
