// hide startTitle:
if (document.querySelector('.note')) { 
  $('#startTitle').css('display', 'none');
}

// create note:
function createNote() {
  window.location.replace("/notes");
}

function createList() {
  window.location.replace("/lists");
}


//send note to server for add to database:
function sendData() {
  const noteObj = {
    title: myform.elements['title'].value,
    text: myform.elements['text'].value
  };
  if (!myform.elements['text'].value) return;
  $.ajax({
    url: '/notes',      
    type: 'POST',
    data: noteObj,
    success: function(data) {
      window.location.replace("/");
    },
    error:  function(xhr, str){
        alert('Возникла ошибка: ' + xhr.responseCode);
      }
  }); 
}

// get one note:
$('.note').click(function() {
  let id = $(this).attr("data-id");
  window.location.replace("/notes/" + id);
});

//send note to server for update in database:
function updateData() {
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

//send note id to server for delete from database:
function deleteData() {
  if (!myform.elements['id'].value) return;
  $.ajax({
    url: '/notes/' + myform.elements['id'].value,      
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