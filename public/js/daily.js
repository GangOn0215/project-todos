import * as time from './common.js';

// console.log(time);
const today = time.getToday();
const dateInfoElement               = document.getElementById('date-day');
const todosInputButtonElement       = document.getElementById('todos-input-button');
const todoListsElement              = document.querySelectorAll('.todo-lists');
const todolistsSpanElements         = document.querySelectorAll('.todo-lists-span');
const todolistDeleteBtnElements     = document.querySelectorAll('.button-todo-delete');
const todolistEditBtnElements       = document.querySelectorAll('.button-todo-edit');
const todolistEditUpdateBtnElements = document.querySelectorAll('.button-todo-edit-update')

time.getYesterDay(new Date(today));

const getCookieValue = (key) => {
  let cookieKey = key + "="; 
  let result = "";
  const cookieArr = document.cookie.split(";");
  
  for(let i = 0; i < cookieArr.length; i++) {
    if(cookieArr[i][0] === " ") {
      cookieArr[i] = cookieArr[i].substring(1);
    }
    
    if(cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
}

/* ajax 보내는 함수 */
const sendAjax = (xhrMethod, url, data) => {
  const sendData = JSON.stringify(data);
  console.log(sendData);

  const xhr = new XMLHttpRequest();

  xhr.open(xhrMethod, url);
  xhr.setRequestHeader('Content-type', "application/json");
  xhr.send(sendData);

  xhr.addEventListener('load', () => {
    console.log('break');
    console.log(xhr.responseText);
  })
}

dateInfoElement.innerHTML = today;
// dateInfoElement.value = today;

/* input button Clicked Event */
todosInputButtonElement.addEventListener('click', (e) => {
  const todosInputValue = document.getElementById('todos-input').value;
  if (todosInputValue === '') {
    alert('todos input 폼이 Empty 입니다.');
    return;
  }

  let sendData = {
    mem_id: getCookieValue('uid'),
    todo_content: todosInputValue,
    todo_daily: 1
  }

  const xhrLoadedProccess = (sendData, todoID, user_id) => {
    const li = document.createElement('li');
    li.classList.add('todo-lists');
    li.dataset['todo-id'] = user_id;
    li.id = todoID;
    const todoListContainer     = document.createElement('div');
    todoListContainer.classList.add('todo-list-container');

    const todoCheckIcon         = document.createElement('i');
    todoCheckIcon.className = 'fa-solid fa-check todo-check-icon';
    const todoListContent       = document.createElement('span');
    // todoListContent.
    const todoEditIcon          = document.createElement('i');
    const todoDeleteButton      = document.createElement('i');
    const todoEditContainer     = document.createElement('div');
    const todoEditInput         = document.createElement('input');
    const todoEditSubmitButton  = document.createElement('i');
    // const 
  }

  sendAjax('POST', 'http://localhost:3000/rest/daily/insert', sendData);
});

/*  Todo Clicked Event */
todolistsSpanElements.forEach((item) => {
  // Todos list item 을 클릭 했을때 발생하는 이벤트
  item.addEventListener('click', (e) => {
    const itemParentNode       = e.target.parentNode.parentNode;
    const todoID               = itemParentNode.dataset.todoId;
    const checked              = itemParentNode.classList.contains('checked');
    const todoCheckIconElement = document.querySelector(`[data-todo-id="${todoID}"] .todo-check-icon`);

    const sendData = [
      { "todo_checked": checked ? 0 : 1 },
      todoID
    ];

    console.log(sendData);
    itemParentNode.classList.toggle('checked');
    todoCheckIconElement.classList.toggle('hide');

    sendAjax('PUT', 'http://localhost:3000/todo/rest/daily/update', sendData);
  })
});

/* Delete Event */
todolistDeleteBtnElements.forEach((item) => {
  // Todos List Delete Button Click 할 때 발생하는 이벤트
  item.addEventListener('click', (e) => {
    const chooseResult = confirm('정말 삭제 하시겠습니까?');

    // 만약 삭제 하지 않겠다면 return 해줍니다.
    if (!chooseResult)
      return;

    const itemParentNode = e.target.parentNode.parentNode;
    const todoID = itemParentNode.dataset.todoId;

    sendAjax('DELETE', `http://localhost:3000/todo/rest/daily/delete/${todoID}`);
  })
});

/* Edit Event */
todolistEditBtnElements.forEach((item) => {
  item.addEventListener('click', (e) => {
    const itemParentNode = e.target.parentNode.parentNode;
    const itemListNode   = e.target.parentNode;
    const itemEditNode   = itemParentNode.children[1];

    itemListNode.classList.toggle('hide');
    itemEditNode.classList.toggle('hide');
  })
});

/* Update  */
todolistEditUpdateBtnElements.forEach((item) => {
  item.addEventListener('click', (e) => {
    const itemParentNode = e.target.parentNode.parentNode;
    const itemEditValue = e.target.parentNode.children[0].value;
    const todoID = itemParentNode.dataset.todoId;

    const sendData = [
      { "todo_content": itemEditValue },
      todoID
    ];

    console.log(sendData);

    sendAjax('PUT', 'http://localhost:3000/todo/rest/daily/update', sendData);
  })
});