const setConvertTime = (date) => {
  timezoneOffset = date.getTimezoneOffset() * 60000;
  timezoneDate = new Date(date - timezoneOffset);
  
  return timezoneDate.toISOString().slice(0, 19).replace('T', ' ').split(' ')[0];
};

const timeZon = () => {
  const timezoneOffset    = new Date().getTimezoneOffset() * 60000;
  const timezoneDate      = new Date(Date.now() - timezoneOffset);
  const time              = timezoneDate.toISOString().slice(0, 19).replace('T', ' ');

  return time;
};

const getToday = () => {
  return setConvertTime(new Date());
};

const getWeekDay = () => {
  const todayDate = new Date();
  let firstDay = null;
  let lastDay = null;
  let subDay = todayDate.getDay() - 1;

  if(todayDate.getDay() === 0) {
    subDay = 6;
  }
  
  firstDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - subDay);
  lastDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), (todayDate.getDate() + (6 - subDay)));

  const weekOBJ = {
    firstDay: setConvertTime(firstDay),
    lastDay: setConvertTime(lastDay),
  };

  console.log(lastDay);
  return weekOBJ;
};

window.onload = () => {
  const btnLogout = document.querySelector('#btn-logout');

  if (btnLogout !== null) {
    btnLogout.addEventListener('click', (e) => {
      console.log('test');
      const xhr = new XMLHttpRequest();
      const url = '/account/logout';
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', "application/json");
      xhr.send();
      
      xhr.addEventListener('load', () => {
        location.reload();
      });
    });
  }
};