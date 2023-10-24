export default function adjustTimeData(date, hourStart, hourEnd) {
  const dateObject = new Date(date);
  const hourStartObject = new Date(hourStart);
  const hourEndObject = new Date(hourEnd);
  console.log(hourStartObject);

  const year = dateObject.getUTCFullYear();
  const month = dateObject.getUTCMonth();
  const day = dateObject.getUTCDate();

  hourStartObject.setUTCFullYear(year);
  hourStartObject.setUTCMonth(month);
  hourStartObject.setUTCDate(day);

  hourEndObject.setUTCFullYear(year);
  hourEndObject.setUTCMonth(month);
  hourEndObject.setUTCDate(day);

  if (hourEndObject < hourStartObject) {
    hourEndObject.setUTCDate(day + 1);
  }

  console.log(hourStartObject);
  console.log(hourEndObject);

  return {
    hourStart: hourStartObject,
    hourEnd: hourEndObject
  }
}