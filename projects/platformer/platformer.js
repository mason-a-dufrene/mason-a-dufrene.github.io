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
      checkCookie()
      var savedLevel = parseInt(getCookie("lvlNum"))
      levelmake();


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

    function levelmake() {
      if (savedLevel === 1) { //level editor

        createPlatform(0, 725, 355, 20) //spawn platform    platform 0
        createPlatform(100, 0, 10, 600) //Wall              platform 1
        createPlatform(353, 645, 50, 100) //Jump 1          platform 2
        createPlatform(570, 530, 55, 220) //Jump 2          platform 3
        createPlatform(800, 510, 90, 15) //Jump 3           platform 4
        createPlatform(545, 400, 50, 15) //Jump 4 left      platform 5
        createPlatform(250, 400, 40, 15) //Jump 5 left      platform 6
        createPlatform(100, 300, 30, 15) //Jump 6 right     platform 7
        createPlatform(1115, 400, 90, 15) //Jump 4 right    platform 8
        createPlatform(1350, 300, 60, 15) //Jump 5 right    platform 9
        createPlatform(1120, 200, 50, 15) //Jump 6 right    platform 10
        createPlatform(870, 190, 60, 15) //Jump 7 right     platform 11
        // createPlatform(100, 525, 50, 15) //not in final (testing help only)
        //createPlatform(x,y,width,height)
        createCannon("right", 800, 500) // bottom cannon
        createCannon("right", 604, 900) // side Cannon 1
        createCannon("top", 550, 1000) // Top Cannon 1
        createCannon("top", 1000, 1500) //Top Cannon 2-1
        createCannon("top", 1010, 1500) //Top Cannon 2-2
        createCannon("top", 1020, 1500) //Top Cannon 2-3
        createCannon("bottom", 900, 1500) //floor Cannon 1-1
        createCannon("bottom", 910, 1500) //floor Cannon 1-2
        createCannon("bottom", 920, 1500) //floor Cannon 1-3
        createCannon("bottom", 645, 1500) //floor Cannon 2-1
        createCannon("bottom", 655, 1500) //floor Cannon 2-2
        createCannon("bottom", 665, 1500) //floor Cannon 2-3
        createCollectable("minecraft", 800, 400, 0, 0) //jump 3 collectable
        createCollectable("minecraft", 1350, 20, 0, 0) // off jump 6 right collectable
        createCollectable("minecraft", 650, 100, 0, 0) // off jump 7 right colllectable
        createCollectable("minecraft", 250, 300, 0, 0) //  jump 5 left collectable
        createCollectable("minecraft", 250, 100, 0, 0) //  jump 6 left collectable
      }else if (savedLevel === 2) {

        //level two spawns after 5th collectable is collected
        createPlatform(700, 0, 10, 150) //starting box left wall      #12
        createPlatform(1300, 250, 100, 10) //first fall right platform  #13
        createPlatform(1000, 250, 200, 10) //first fall left platform   #14
        createPlatform(900, 150, 10, 200) //above left wall             #15
        createPlatform(1200, 250, 10, 100) //above paralell wall        #16
        createPlatform(900, 345, 400, 5) //2 above's floor              #17
        createPlatform(1300, 440, 100, 10) //2nd fall right platform    #18
        createPlatform(1200, 550, 100, 10) //2nd fall left platform     #19
        createPlatform(1300, 655, 100, 10) //3rd fall right platform    #20
        createPlatform(1200, 350, 10, 300) //zigzag contain wall        #21
        createPlatform(150, 640, 1060, 10) //floor-roof                 #22
        createPlatform(100, 540, 500, 10) //roof2-left                  #23
        createPlatform(400, 440, 600, 10) //jump1-left                  #24
        createPlatform(100, 350, 10, 200)//above wall                   #25
        createPlatform(100, 350, 300, 12) // above roof                 #26
        createPlatform(700, 540, 400, 10) //roof2-right                 #27
        createPlatform(1000, 500, 50, 50) //jump1-right                 #28
        createPlatform(950, 450, 50, 90) //jump2-right                  #29
        createPlatform(100, 250, 10, 10) // last jump                   #30
        createPlatform(300, 145, 800, 10) //final platform              #31
        createCannon("top", 550, 1000) // Top Cannon 1
        createCannon("top", 1000, 1500) //Top Cannon 2-1
        createCannon("top", 1010, 1500) //Top Cannon 2-2
        createCannon("top", 1020, 1500) //Top Cannon 2-3
        createCannon("bottom", 840, 1500) //floor Cannon 1-1
        createCannon("bottom", 850, 1500) //floor Cannon 1-2
        createCannon("bottom", 860, 1500) //floor Cannon 1-3
        createCannon("bottom", 645, 1500) //floor Cannon 2-1
        createCannon("bottom", 655, 1500) //floor Cannon 2-2
        createCannon("bottom", 665, 1500) //floor Cannon 2-3
        createCollectable("minecraft", 800, 400, 0, 0) //jump 3 collectable
        createCollectable("minecraft", 1350, 20, 0, 0) // off jump 6 right collectable
        createCollectable("minecraft", 650, 100, 0, 0) // off jump 7 right colllectable
        createCollectable("minecraft", 250, 300, 0, 0) //  jump 5 left collectable
        createCollectable("minecraft", 1050, 300, 0, 0) // off jump 6 left collectable
      }else if (savedLevel === 3) {
        createPlatform(0, 400, 1400, 10)
        createCannon('right', 360, 1500)
        createCannon('right', 380, 1500)
        createCannon('right', 400, 1500)
        createCannon('right', 420, 1500)
        createCannon('right', 440, 1500)
        createCannon('left', 340, 2000)
        createCollectable("minecraft", 1050, 300, 0, 0) // 1 right
        createCollectable("minecraft", 1050, 500, 0, 0) // 2 right
        createCollectable("minecraft", 1050, 500, 0, 0) // 3 right
        createCollectable("minecraft", 150, 500, 0, 0) // 1 left
        createCollectable("minecraft", 150, 500, 0, 0) // 2 left
        createCollectable("minecraft", 150, 500, 0, 0) // 3 left

      }

    }


    // collectable choices 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve';
    // createCollectable(type, x, y, gravity, bounce)


    //createCannon(side, position, delay, width, height)  height and width  not needed



    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});
