// hide startTitle:
if ($('.note')) { 
  $('#startTitle').css('display', 'none');
}

// create note:
$('#btnAddNote').click(function() {
  window.location.replace("/notes");
});

//cancel create note:
function cancelBtn() {
  window.location.replace("/");
}
//cancel create note:
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