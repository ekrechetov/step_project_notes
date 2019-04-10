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

let newBoxDelete = (e) => {
		e.target.parentElement.parentElement.remove();
		listnewitem.getElementsByClassName('form-control')[0].focus();
	};

let newBoxCheck = (e) => {
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

let newBoxKey = (e) => {
		// console.log(e.target.tagName);
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
	// console.log(newBox.getElementsByClassName('form-control')[0]);

	newBox.getElementsByClassName('close')[0].onclick = newBoxDelete;

	newBox.getElementsByClassName('check-box')[0].onclick = newBoxCheck;

	newBox.getElementsByClassName('form-control')[0].onkeydown = newBoxKey;

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

function cancelBtn() {
  window.location.replace("/");
}

function noteToNode(node, data_list) {
	// развернуть data_list на node
	let noteObj = JSON.parse(node.getAttribute('data-note'));
	let content = JSON.parse(noteObj.content);
	// console.log(content.openToDoList);
	let newBox = null;
  	// заголовок
  	node.childNodes[0].childNodes[1].value = noteObj.title;
	// список не завершенных дел
	for (key in content.openToDoList) {
		newBox = document.createElement('div');
		newBox.classList.add('input-group');
		newBox.classList.add('mb-3');
		newBox.innerHTML = '<div class="input-group-prepend"><div class="input-group-text"><input type="checkbox" class="check-box" aria-label="Checkbox for following text input"></div></div><input type="text" class="form-control alert-dismissible" aria-label="Text input with checkbox"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		newBox.childNodes[1].value = content.openToDoList[key];
		newBox.getElementsByClassName('close')[0].onclick = newBoxDelete;
		newBox.getElementsByClassName('check-box')[0].onclick = newBoxCheck;
		newBox.getElementsByClassName('form-control')[0].onkeydown = newBoxKey;
		openlist.appendChild(newBox);
	}

  	// список завершенных дел
	for (key in content.closedToDoList) {
		newBox = document.createElement('div');
		newBox.classList.add('input-group');
		newBox.classList.add('mb-3');
		newBox.innerHTML = '<div class="input-group-prepend"><div class="input-group-text"><input type="checkbox" class="check-box" checked aria-label="Checkbox for following text input"></div></div><input type="text" class="form-control alert-dismissible" aria-label="Text input with checkbox"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		newBox.childNodes[1].value = content.closedToDoList[key];
		newBox.getElementsByClassName('close')[0].onclick = newBoxDelete;
		newBox.getElementsByClassName('check-box')[0].onclick = newBoxCheck;
		newBox.getElementsByClassName('form-control')[0].onkeydown = newBoxKey;
		closedlist.appendChild(newBox);
	}

};

//send list to server for add to database:
function sendData() {
  const noteObj = document.getElementById('todolist');
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
    const noteObj = listToJSON(todolist);
    noteObj.id = todolist.getAttribute('data-id'); 
  $.ajax({
    url: '/lists/' + noteObj.id,      
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

//send note id to server for delete from database:
function deleteData() {
	if (!confirm("Уверен ?")) {return};

  $.ajax({
    url: '/lists/' + todolist.getAttribute('data-id'),      
    type: 'DELETE',
    success: function(data) {
      console.log(data);
      window.location.replace("/");
      },
    error: function(xhr, str){
        alert('Возникла ошибка: ' + xhr.responseCode);
      }
  }); 
}

function editData(){
	document.getElementsByClassName('container')[0].classList.remove('uneditable');
	document.getElementsByClassName('container')[0].classList.add('editable');
}

(function(){
  console.log('start_new_list');
  if (todolist.hasAttribute('data-id')) {console.log('yes');
      	noteToNode(todolist);
   		document.getElementsByClassName('container')[0].classList.add('uneditable');
      	}
    else{document.getElementsByClassName('container')[0].classList.add('new-note');};

}());