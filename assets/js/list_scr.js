function listToJSON(node) {
  let currList = {
    type: 'list', // тип заметки - список
    title: '', // заголовок заметки - списка
    openToDoList: {}, // список не закрытых дел 
    closedToDoList: {} // список закрытых дел
  };
  currList.title = node.childNodes[0].childNodes[1].value
  // сохраняем список не завершенных дел
  for(i=0;i<node.childNodes[1].childElementCount;i++){
    currList.openToDoList[i] = node.childNodes[1].childNodes[i].childNodes[1].value;
  }
  // сохраняем список завершенных дел
  for(i=0;i<node.childNodes[3].childElementCount;i++){
    currList.closedToDoList[i] = node.childNodes[3].childNodes[i].childNodes[1].value;
  }
  return JSON.stringify(currList);
}

// // hide startTitle:
// if (document.querySelector('.note')) { 
//   $('#startTitle').css('display', 'none');
// }

// // create note:
// function createNote() {
//   window.location.replace("/notes");
// }

function createList() {
  window.location.replace("/list");
}

function cancelBtn() {
  console.log('cancel');
  window.location.replace("/");
}

//send list to server for add to database:
function sendData() {
  const noteObj = document.getElementById('todolist');
  // добавить проверку что список не пустой или есть заголовок - иначе на выход
  // if (проверка) return;
  console.log(listToJSON(noteObj));
  $.ajax({
    url: '/list',      
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

// // get one note:
// $('.note').click(function() {
//   let id = $(this).attr("data-id");
//   window.location.replace("/notes/" + id);
// });

//send note to server for update in database:
function updateData() {
  const noteObj = document.getElementById('todolist');
  const noteObj = {
    id: myform.elements['id'].value,
    title: myform.elements['title'].value,
    text: myform.elements['text'].value
  };
  if (!myform.elements['text'].value) return;
  $.ajax({
    url: '/notes/' + myform.elements['id'].value,      
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

// //send note id to server for delete from database:
// function deleteData() {
//   if (!myform.elements['id'].value) return;
//   $.ajax({
//     url: '/notes/' + myform.elements['id'].value,      
//     type: 'DELETE',
//     success: function(data) {
//       console.log(data);
//       window.location.replace("/");
//       },
//     error: function(xhr, str){
//         alert('Возникла ошибка: ' + xhr.responseCode);
//       }
//   }); 
// }