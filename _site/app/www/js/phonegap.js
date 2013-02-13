// Prevent scrolling on body
document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);

// Prevent scrolling on form fields
function setTextareaPointerEvents(value) {
  var $inputs = $("input[type=time]"), $textareas = $("textarea");
  $inputs.each(function() {
    $(this).css("pointerEvents", value);
  });
  $textareas.each(function() {
    $(this).css("pointerEvents", value);
  });
}

//Adding EventListeners for each case of interaction
document.addEventListener('DOMContentLoaded', function() {
  setTextareaPointerEvents('none');
});

document.addEventListener('touchstart', function() {
  setTextareaPointerEvents('auto');
});

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
    setTextareaPointerEvents('none');
});

document.addEventListener('touchend', function() {
  setTimeout(function() {
    setTextareaPointerEvents('none');
  }, 0);
});

