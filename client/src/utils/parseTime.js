import moment from "moment";

function parseTime(timeStamp) {
  moment.locale("en");
  return moment(timeStamp).format("llll");
}

export default parseTime;
