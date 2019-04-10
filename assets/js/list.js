
// обработка заголовка
listtitle.onclick = function (e){
	if (e.target.innerHTML=="Заголовок ...") e.target.innerHTML="";

};

listtitle.onkeydown = (e) => {
		if ((e.keyCode == 13)&&(e.target.tagName=='INPUT')) {
			listnewitem.getElementsByClassName('form-control')[0].focus();
			return false;
		}
	};



// обработка поля ввода
listnewitem.onclick = function (e){
	//создаем новый элемент сверху
	let newBox = document.createElement('div');
	newBox.classList.add('input-group');
	newBox.classList.add('mb-3');
	newBox.innerHTML = '<div class="input-group-prepend"><div class="input-group-text"><input type="checkbox" class="check-box" aria-label="Checkbox for following text input"></div></div><input type="text" class="form-control alert-dismissible" aria-label="Text input with checkbox"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
	console.log(newBox.getElementsByClassName('form-control')[0]);

	newBox.getElementsByClassName('close')[0].onclick = (e) => {
		e.target.parentElement.parentElement.remove();
		listnewitem.getElementsByClassName('form-control')[0].focus();
	};

	newBox.getElementsByClassName('check-box')[0].onclick = (e) => {
		let elem = e.target.parentElement.parentElement.parentElement;
		let box = e.target;
		if (box.checked) {
			// перенести вниз
			closedlist.appendChild(elem);
		}
		else{
			// перенести вверх
			openlist.appendChild(elem);
		};
	};

	newBox.getElementsByClassName('form-control')[0].onkeydown = (e) => {
		console.log(e.target.tagName);
		if ((e.keyCode == 13)&&(e.target.tagName=='INPUT')) {
			listnewitem.getElementsByClassName('form-control')[0].focus();
			return false;
		}
	};

	openlist.appendChild(newBox);
	newBox.getElementsByClassName('form-control')[0].focus();
};

listnewitem.onkeydown = listnewitem.onclick;

function listToJSON(node) {

  let note = {
    type: 'list', // тип заметки - список
    title: '', // заголовок заметки - списка
    content: '' // reg - text, list - JSON содержащий два списка дел
  };

  let content = {
    openToDoList: {}, // список не закрытых дел 
    closedToDoList: {} // список закрытых дел
  }
  
  // сохраняем заголовок
  note.title = node.childNodes[0].childNodes[1].value;
  // сохраняем список не завершенных дел
  for(i=0;i<node.childNodes[1].childElementCount;i++){content.openToDoList[i] = node.childNodes[1].childNodes[i].childNodes[1].value;}
  // сохраняем список завершенных дел
  for(i=0;i<node.childNodes[3].childElementCount;i++){content.closedToDoList[i] = node.childNodes[3].childNodes[i].childNodes[1].value;}
  note.content = JSON.stringify(content);
  return note;
}

function noteToNode(node, data_list) {

};

// function createList() {
//   window.location.replace("/lists");
// }

// function cancelBtn() {
//   console.log('cancel');
//   window.location.replace("/");
// }

//send list to server for add to database:
function sendData() {
  const noteObj = document.getElementById('todolist');
  // добавить проверку что список не пустой или есть заголовок - иначе на выход
  // if (проверка) return;
  console.log(listToJSON(noteObj));
  $.ajax({
    url: '/lists',      
    type: 'POST',
    data: listToJSON(noteObj),
    success: function(data) {
      window.location.replace("/");
    },
    error:  function(xhr, str){
        alert('Возникла ошибка: ' + xhr.responseCode);
      }
  }); 
}

//send note to server for update in database:
function updateData() {
    // const noteObj = document.getElementById('todolist');
    const noteObj = listToJSON(todolist);
    noteObj.id = todolist.getAttribute('data-id'); 
  // const noteObj = {
  //   id: todolist.getAttribute('data-id'),
  //   title: todolist.childNodes[0].childNodes[1].value;,
  //   content: myform.elements['text'].value
  // };
  console.log(noteObj);
  // if (!myform.elements['text'].value) return;
  $.ajax({
    url: '/notes/' + noteObj.id,      
    type: 'PUT',
    data: noteObj,
    success: function(data) {
      console.log(data);
      window.location.replace("/");
      },
    error: function(xhr, str){
        alert('Возникла ошибка: ' + xhr.responseCode);
      }
  }); 
}

// // Сохранить в базе данных
// listbtnsave.onclick = (e) => {

// };

// // Включить редактирование
// listbtnedit.onclick = (e) => {

// };

// // Удалить запись из Базы данных
// listbtndelete.onclick = (e) => {

// };

// // Закрыть страницу без изменений
// listbtncancel.onclick = (e) => {

// };


(function(){
  console.log('start_new_list');
  // if (todolist.)
  // console.log(_.isNull(todolist.getAttribute('data-note')));
  if (todolist.hasAttribute('data-id')) {console.log('yes');
      noteToNode(todolist.getAttribute('data-note'));// разворачиваем элемент
      };
}());