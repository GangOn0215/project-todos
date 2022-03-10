module.exports = () => {
  const timezoneOffset    = new Date().getTimezoneOffset() * 60000;
  const timezoneDate      = new Date(Date.now() - timezoneOffset);
  const register_datetime = timezoneDate.toISOString().slice(0, 19).replace('T', ' ');

  return register_datetime;
}