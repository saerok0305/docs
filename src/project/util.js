export function toDateString(date) {
  // date: local date, but +9 hour beacuse of toISOString
  // const tempDate = new Date(date.setHours(date.getHours() + 9));
  // return tempDate.toISOString().split('T')[0];
  if (date) {
    const dateString = date.toISOString().split("T")[0];
    const dateformat = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    // Match the date format through regular expression
    if (dateString.match(dateformat)) {
      return dateString;
    }
  }
  return null;
}

export function toDateTimeString(date) {
  if (date) {
    // date: local date, but +9 hour beacuse of toISOString
    const tempDate = new Date(date.setHours(date.getHours() + 9));
    return tempDate.toISOString().split(".")[0];
    // if (date) {
    //     return date.toISOString().substring(0, 19);
    // }
    // return null;
  }
}

export function toKSTDateTimeString(date) {
  if (date) {
    // date: local date, but +9 hour beacuse of toISOString
    const tempDate = new Date(date);
    const kst = new Date(tempDate.setHours(tempDate.getHours() + 9));
    return kst.toISOString().split(".")[0];
    // if (date) {
    //     return date.toISOString().substring(0, 19);
    // }
    // return null;
  }
}

export function toDateObj(dateString) {
  return new Date(dateString);
}
