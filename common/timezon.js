// const getCurrentTime = ()

const setTimeZon = (date) => {
  timezoneOffset = date.getTimezoneOffset() * 60000;
  timezoneDate = new Date(date - timezoneOffset);

  return timezoneDate.toISOString().slice(0, 19).replace('T', ' ')
}

const setConvertTime = (date, checkFullDate) => {
  timezoneDate = setTimeZon(date);
  
  if(checkFullDate)
    return timezoneDate;
  
  return timezoneDate.split(' ')[0];
}

const getToday = (checkFullDate = false) => {
  return setConvertTime(new Date(), checkFullDate);
}

const getWeekDay = () => {
  const todayDate = new Date();
  let firstDay = null;
  let lastDay = null;
  let subDay = 0;

  if(todayDate.getDay() === 0) {
    subDay = 6;
  }
  
  firstDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - subDay);
  lastDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate() + (6 - subDay)));

  const weekOBJ = {
    firstDay: setConvertTime(firstDay),
    lastDay: setConvertTime(lastDay),
  }

  return weekOBJ;
}

module.exports = {
  getToday,
  getWeekDay
}
