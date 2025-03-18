/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
var KEY = {
  ENTER : 13,
  RIGHT : 39,
  LEFT : 37,
  UP : 38,
  DOWN : 40,
}

var posititionX = 0   // decides x positition 
var posititionY = 0 //determines the Y positition
var speedX = 0 //determines speed alonng the X axis
var speedY = 0 //determines the speed along the Y-axis

  // one-time setup
  var interval = setInterval(newFrame, 60000);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);        // change 'eventType' to the type of event you want to handle
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame(event) {
    function reposititionWalker(){
posititionX += speedX
posititionY += speedY
    }

function redrawWalker(){
  $("#walker").css("left", posititionX)
  $("#walker").css("top", posititionY)
  }
}
  /* 
  Called in response to events.
  */
  // CORE LOGIC...
function handleKeyDown(event) {
  if(event.which === KEY.ENTER){
    walker.speedX = 5
  }if(event.which === KEY.LEFT){
    walker.speedX = -5
  }if(event.which === KEY.RIGHT){
    console.log("Right pressed")
  }if(event.which === KEY.UP){
    walker.speedY = 5
  }if(event.which === KEY.DOWN){
    walker.speedY = -5
  }
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
