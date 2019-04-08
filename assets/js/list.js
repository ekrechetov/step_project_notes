
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
