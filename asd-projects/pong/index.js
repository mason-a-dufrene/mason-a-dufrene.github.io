/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

    var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
  }
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  
  // Game Item Objects
  var ball = makeGameItem("#ball")
  var rightPaddle = makeGameItem("#rightPaddle")
  var leftPaddle = makeGameItem("#leftPaddle")
  var score1 = 0;
  var score2 = 0;
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
                         // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDown);            // handle key down
  $(document).on('keyup', handleKeyUp); 
  startBall()


  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
  moveGameItem(leftPaddle);
  moveGameItem(rightPaddle);
  moveGameItem(ball);
  wallCollision(leftPaddle);    //Hint: CODE GOES HERE
  wallCollision(rightPaddle);
  wallCollision(ball);
  redrawGameItem(leftPaddle);
  redrawGameItem(rightPaddle);
  redrawGameItem(ball);

  }
  /* 
  Called in response to events.
  */
function handleKeyDown(event) {
    if (event.which === KEY.W) {     // moves an object when the respective botton is pressed
      leftPaddle.speedY = -5;
      console.log("w pressed");   // console.logs the botton pressed
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 5;
      console.log("s pressed");
    }
    if (event.which === KEY.UP) {
      rightPaddle.speedY = -5;
      console.log("up pressed");
    }
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 5;
      console.log("down pressed");
    }
  }

  function handleKeyUp(event){
    if (event.which === KEY.W) {
      leftPaddle.speedY = 0;         //stops movement when a botton is relesed
      console.log("w released");    // logs the result
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 0;
      console.log("s released");
    }
    if (event.which === KEY.UP) {
      rightPaddle.speedY = 0;
      console.log("up released");
    }
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 0;
      console.log("down released");
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
    function makeGameItem(box){
  var item = {};
  item.id = box;         // makes each Div into a working component for the page, so it can be moved, and adjusted as we need
  item.x = parseFloat($(box).css("left"));
  item.y = parseFloat($(box).css("top"));
  item.width = $(box).width();
  item.height = $(box).height();
  item.speedX = 0;
  item.speedY = 0;
  return item;
  }
  function moveGameItem(item) {
    let speedX = item.speedX;        // gets data to be used
    let speedY = item.speedY;
    item.x += speedX;       //moves object
    item.y += speedY;
  }
  function redrawGameItem(item) {
    let coordX = item.x;    // function scoped variables used to redraw
    let coordY = item.y;
    let id = item.id;
    $(item.id).css("left", coordX);  // redraws items based on their position
    $(item.id).css("top", coordY);
  }
  //be moved behind walls when past them
  function wallCollision(item) {
    let coordX = item.x;
    let coordY = item.y;    // makes function scoped variables to help determine placement
    let speedX = item.speedX;
    let speedY = item.speedY;
    let width = BOARD_WIDTH; 
    let height = BOARD_HEIGHT; 

    if (coordX < 0) {   //detects colision with left wall
      item.x -= speedX;
      item.speedX = -speedX;   // prevents the ball from continuing through the wall, and breaking
        if(item.id === "#ball"){
        score2++;
        $("#score2").text("Right Score: " + score2);
        if(score2 === 11){
          endGame();           // when the score reaches 11, it calls endGame
          alert("Right Wins");
        }
        startBall();
      }
    }
    if (coordY < 0) {
      
      item.y -= speedY;     //detects and redirects colision with the roof
      item.speedY = -speedY;
    }
    if (coordX + item.width > width) {      
      item.x -= speedX;
      item.speedX = -speedX;
          //detects and redirects colision with the right wall
        if(item.id === "#ball"){
        score1++;             // prevents the ball from continuing through the wall, and breaking
        $("#score1").text("Left Score: " + score1);
        if(score1 === 11){
          endGame();     // when the score reaches 11, it calls endGame
          alert("Player 1 Wins");
        }
        startBall();
      }
    }
    if (coordY + item.height > height) {
      
      item.y -= speedY;     //detects and redirects colision with floor
      item.speedY = -speedY;
    }
        if (coordX + item.width > width || doCollide(ball,rightPaddle)) {
      //collide with right wall
      item.x -= speedX;
      item.speedX = -speedX;
  }
      if(doCollide(ball,leftPaddle)) {
      //collide with left paddle
      item.x -= speedX;
      item.speedX = -speedX;
    }
  }
    //detect and change velocity of ball when it hits the paddle
  function doCollide(square1, square2) {
    // calculates the sides of square1
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.rightX = square1.x+square1.width;
    square1.bottomY = square1.y+square1.height;
    // calculates the sides of square1
    square2.leftX = square2.x;
    square2.topY = square2.y;
    square2.rightX = square2.x+square2.width;
    square2.bottomY = square2.y+square2.height;
    // will return true or false based on the position of the ball and paddle
    if(square1.leftX > square2.rightX){
      return false;
    } else if(square1.rightX < square2.leftX){
      return false;
    } else if(square1.topY > square2.bottomY){
      return false;
    } else if(square1.bottomY < square2.topY){
      return false;
    } else {
      return true;
    }
    // Hint: use the following conditions:
      // red left < blue right
      // red right > blue left
      // red top < blue bottom
      // red bottom > blue top
  }
function startBall(){   // start position of the ball, and direction it moves
    ball.x = 200;
    ball.y = 340;
    ball.speedX = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }
  
  function endGame() {    // end the game
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
  
}
