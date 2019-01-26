
  var classes = [
  
  'speaking',
  'thinking',
  'speaking',
  'waiting',
  'thinking'

 
  
  ]

var classIndex = 0;

function loopClasses() {
  var currentClass = classes[classIndex];

  // loop through classes and remove from element
  for (var i = 0; i < classes.length; i++) {
    $('#bot').removeClass(classes[i]);
  }

  // add current class to element
  $('#bot').addClass(currentClass);

  // advance or reset loop counter
  classIndex = (classIndex + 1) % classes.length;

}

setInterval(loopClasses, 1000);
