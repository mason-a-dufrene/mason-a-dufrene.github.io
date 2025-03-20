/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  }
  
  // Game Item Objects
  var walker = {
    coordX: 0,
    coordY: 0,
    speedX: 0,
    speedY: 0
  }

  // one-time setup
  var interval = setInterval(newFrame, 60000);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);            // handle key down
  $(document).on('keyup', handleKeyUp);               // handle key up 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" a new frame is drawn by calling the newFrame function and executing the code inside it
  */
  function newFrame() {
    repositionGameItem(walker);
    wallCollision(walker);
    redrawGameItem(walker);
  }
  
  /* 
  Called in response to keypresses.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    }if (event.which === KEY.UP) {
      walker.speedY = -5;
    }if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    }if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }
  }

  function handleKeyUp(event){
    if(event.which === KEY.LEFT) {
      walker.speedX = 0;
    }if(event.which === KEY.UP) {
      walker.speedY = 0;
    }if(event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }if(event.which === KEY.DOWN) {
      walker.speedY = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    clearInterval(interval);
    $(document).off();
  }
  function repositionGameItem(item) {
    let speedX = item.speedX;
    let speedY = item.speedY;

    item.coordX += speedX;
    item.coordY += speedY;
  }
  //visually moving the object
  function redrawGameItem(item) {
    let coordX = item.coordX;
    let coordY = item.coordY;
    //redraw X from the left and Y from the top to new values from repositionGameItem
    $("#walker").css("left", coordX);
    $("#walker").css("top", coordY);
  }
  function wallCollision(item) {
    // make containers to shorten conditionals
    let coordX = item.coordX;
    let coordY = item.coordY;
    let speedX = item.speedX;
    let speedY = item.speedY;
    let width = $("#board").width() - 45;
    let height = $("#board").height() - 45;

    if(coordX < 0) {
      item.coordX -= speedX;
    }if(coordY < 0) {
      item.coordY -= speedY;
    }if(coordX > width) {
      item.coordX -= speedX;
    }if(coordY > height) {
      item.coordY -= speedY;
    }
  }
}
