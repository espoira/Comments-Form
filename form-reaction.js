'use strict';

let flag;

function changeText() {
   
  if (!flag) {
    document.querySelector('p').textContent = '* Поле со звёздочкой обязательно для заполнения';
    document.querySelector('p').style.color = 'rgb(100, 100, 100)';	
    document.querySelector('input').value = '';
    document.getElementById('date').value = '';
    flag = true;
  }				  
}

function dateChecking () {

  let date = document.getElementById('date');

  let validformat = /^[0-3]\d\.[0-1]\d\.\d{2}$/;

  if (date.value.match(validformat) === null && document.querySelector('input').value) {

    if (!date.value) {
		
      document.querySelector('p').textContent = 'К комментарию будет автоматически добавлена текущая дата';
	  
    } else {
		
      document.querySelector('p').textContent = 'Дата введена некорректно, и будет добавлена автоматически.';
      date.value = '';
	  
    }

    document.querySelector('p').style.color = 'green';	
    flag = false;

  }
}


function getDateTime () {
	
  let date = document.getElementById('date');
  let currentDate = formatDate().slice(0,8);

  if ( !date.value || date.value == currentDate ) {

    document.getElementById('time').textContent = 'сегодня' + formatDate().slice(8);

  } else if (currentDate.replace(/\./g,'') - date.value.replace(/\./g,'') == 10000) {

    document.getElementById('time').textContent = 'вчера' + formatDate().slice(8);
	
  } else {

    document.getElementById('time').textContent = date.value + formatDate().slice(8);		
 
  }		
}


document.onkeydown = function(e) {
  if (e.key == 'Enter') {
	dateChecking();
    addComment();
  }
}


function addComment() {

  let name = document.querySelector('input');

  if (!name.value.trim()) {		

    document.querySelector('p').textContent = 'Введите имя!';
    document.querySelector('p').style.color = 'red';
    flag = false;
	
  } else {

    let message = document.querySelector('textarea');
    let comment = document.getElementById('comment');

    comment.textContent = message.value;
    message.value = '';		

    document.querySelector('b').textContent = name.value;
    name.value = '';		

    getDateTime();
    document.getElementById('date').value = '';

    let commentsList = document.getElementById('comments-list');
    commentsList.insertAdjacentHTML('afterbegin', 
        '<div>' + document.getElementById('new-comment').innerHTML + '</div>');

    commentsList.querySelector('div').style.background = 'rgb(0,128,128,0.2)'; 
    setTimeout(() => commentsList.querySelector('div').style.background = 'rgb(0,128,128,0)', 1500); 

  }	

}


function toggleLike(elem) {
  elem.textContent = (elem.textContent == 'favorite') ? 'favorite_border' : 'favorite';
}

function closeComment(elem) {
  elem.closest('div').style.display = 'none';
}


function formatDate() {
	
  let date = new Date();

  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  return `${dayOfMonth}.${month}.${year} в ${hour}:${minutes}`;

}