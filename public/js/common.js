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
      })
    })
  }
}