$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    //create walls
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the loops below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can give you a better idea of where to create new platforms
     * Comment the lines out to remove the grid
     */

    for (let i = 100; i < canvas.width; i += 100) {
       createPlatform(i, canvas.height, -1, -canvas.height);
     }
     for (let i = 100; i < canvas.height; i += 100) {
       createPlatform(canvas.width, i, -canvas.width, -1);
     }

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    createPlatform(0, 725, 355, 20) //spawn platform
    createPlatform(100, 0, 10, 600) //Wall
    createPlatform(353, 645, 50, 100) //Jump 1
    createPlatform(570, 530, 55, 220) //Jump 2
    createPlatform(800, 510, 90, 15) //Jump 3 
    createPlatform(545, 400, 50, 15) //Jump 4 left
    createPlatform(250, 400, 40, 15) //Jump 5 left
    createPlatform(100, 300, 30, 15) //Jump 6 right
    createPlatform(1115, 400, 90, 15) //Jump 4 right
    createPlatform(1350, 300, 60, 15) //Jump 5 right
    createPlatform(1120, 200, 50, 15) //Jump 6 right
    createPlatform(870, 190, 60, 15) //Jump 7 right
    //createPlatform(100, 525, 50, 15) //not in final (testing help only)
    //createPlatform(x,y,width,height)

    createCollectable("minecraft", 800, 400, 3, .5) //jump 3 collectable
    createCollectable("minecraft", 1350, 20, 0, 0) // off jump 6 left collectable
    createCollectable("minecraft", 650, 100, 0, 0) // off jump 6 right colllectable
    createCollectable("minecraft", 250, 200, 3, .5) //  jump 5 left collectable
    createCollectable("minecraft", 250, 100, 0, 0) // off jump 6 left collectable
    //collectable choices 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve';
    //createCollectable(type, x, y, gravity, bounce)

    createCannon("right", 800, 500) // bottom cannon (active)
    createCannon("right", 604, 900) // side Cannon 1 (active)
    createCannon("top", 550, 1000) // Top Cannon 1(active)
    createCannon("top", 1000, 1500) //Top Cannon 2(active)
    createCannon("top", 1010, 1500) //Top Cannon 2(active)
    createCannon("top", 1020, 1500) //Top Cannon 2(active)
    createCannon("bottom", 900, 1500) //floor Cannon 1(active)
    createCannon("bottom", 910, 1500) //floor Cannon 2(active)
    createCannon("bottom", 920, 1500) //floor Cannon 3(active)
    createCannon("bottom", 645, 1500) //floor Cannon 4(active)
    createCannon("bottom", 655, 1500) //floor Cannon 5(active)
    createCannon("bottom", 665, 1500) //floor Cannon 6(active)
    //createCannon(side, position, delay, width, height)  height and with  not needed



    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
