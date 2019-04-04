//hide startTitle:
if ($('.note')) { 
  $('#startTitle').css('display', 'none');
}

// get one nout:
$('.note').click(function() {
  let id = $(this).attr("data-id");
  window.location.replace("/notes/" + id);
});