// Defining the Canvas //
let $canvas = document.getElementById("myCanvas");
let ctx = $canvas.getContext("2d");

const images = [];

for (let i = 0; i < 17; i++) {
  let img = new Image();
  img.src = "/Images/hero/Idle/0_Reaper_Man_Idle_" + i + ".png";
  images.push(img);
}

class player {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = 64;
    this.height = 64;
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 0.3;
    this.friction = 0.9;
    //animation counters and booleans//
    this.frames = 0;
    this.deadframes = 14;
    this.jump = false;
    this.dead = false;
  }

  renderIdlePlayer() {
    let img = images[this.frames];
    if (this.dead === false)
      ctx.drawImage(
        img,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    this.frames++;
    if (this.frames === 17) {
      this.frames = 0;
    }
  }

  renderDeadPlayer() {
    let img = new Image();
    if (this.dead === true)
      for (let i = 0; i <= 14; i++) {
        img.src = "/Images/hero/Dying/0_Reaper_Man_Dying_" + i + ".png";
      }
    ctx.drawImage(
      img,
      this.positionX,
      this.positionY - 54,
      this.width,
      this.height
    );
  }
}

//Background & Levels //

// Constants //
let numberOfTiles = 10;
let tileSize = $canvas.width / numberOfTiles;
let groundLevel = tileSize - 5;

// Background Constructor //

class Obstacle {
  constructor(x, y, type, source) {
    (this.x = x), (this.y = y), (this.type = type), (this.source = source);
  }
}

let currentLevel = [];
let levelStart = 0;

for (let i = 0; i < levelOne.length; i++) {
  if (i == 0) {
    currentLevel.push(
      new Obstacle(0, 0, "ground", "Images/map/groundfull.png")
    );
  } else if (levelOne[i] === "w") {
    currentLevel.push(
      new Obstacle((levelStart += tileSize), 0, "water", "Images/map/water.png")
    );
  } else if (levelOne[i] === "g") {
    currentLevel.push(
      new Obstacle(
        (levelStart += tileSize),
        0,
        "ground",
        "Images/map/groundfull.png"
      )
    );
  }
}

class map {
  constructor() {
    this.col = 0;
    this.row = 320 - groundLevel;
  }

  drawLevel(level) {
    let img;
    for (let i = 0; i < level.length; i++) {
      img = new Image();
      img.src = level[i].source;
      ctx.drawImage(img, level[i].x, this.row, tileSize, tileSize);
    }
  }
}

let level = new map();

// Map Movement //

function viewFinderRight() {
  for (let i = 0; i < currentLevel.length; i++) {
    currentLevel[i].x -= 30;
  }
}

function viewFinderLeft() {
  for (let i = 0; i < currentLevel.length; i++) {
    currentLevel[i].x += 30;
  }
}
// Creating a Player //

let hero = new player(100, 0);

// Movement and behaviour //

//let actualPosition = posX + 30;

// function detectGround(posX) {
//   currentLevel.forEach(level => {
//     if (hero.positionY >= 215.3 && level.type === "ground") {
//       hero.positionY = $canvas.height - 105;
//       hero.velocityY = 0;
//     }
//   });
// }

//Jump Action //

// function checkIfGrounded() {
//   if (hero.positionY > 212 && hero.positionY <= 215) {
//     return true;
//   } else return false;
// }

// function jumpCheck() {
//   let onGround = checkIfGrounded();
//   if (onGround === true) {
//     hero.jump = true;
//   } else hero.jump = false;
// }

function checkGroundType() {
  currentLevel.forEach(level => {
    if (
      hero.positionX >= level.x - 25 &&
      hero.positionX <= level.x + 15 &&
      level.type === "water"
    ) {
      hero.dead = true;
      hero.positionY = 260;
      this.gravity = 0.3;
      this.friction = 0.9;
      if (hero.positionY <= 320) hero.velocityY = 0.4;
    } else if (
      hero.positionX >= level.x - 25 &&
      hero.positionX <= level.x + 15 &&
      level.type === "ground"
    ) {
      hero.dead = false;
    } else if (hero.positionY > 213 && hero.positionY <= 214) {
      hero.gravity = 0;
      hero.friction = 0;
      hero.jump = true;
    } else if (hero.positionY > 213 && hero.positionY <= 214) {
    }
  });
}

// Controls //

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 32: // space
      //Jump Action //

      if (hero.jump === true) {
        console.log("JUMP");
        hero.velocityY -= 30;
        hero.jump = false;
      }
      break;
    case 37: // left arrow
      if (hero.positionX > 70 && hero.positionX < 380 && hero.dead === false) {
        hero.velocityX -= 0.5;
      }
      viewFinderLeft();
      break;
    case 39: // right arrow
      if (hero.positionX > 0 && hero.positionX < 350 && hero.dead === false) {
        hero.velocityX += 0.5;
      }
      //console.log(hero);
      viewFinderRight();
      console.log(hero);
      break;
  }
};

function HeroMovement() {
  hero.positionX += hero.velocityX;
  hero.velocityX *= hero.friction;
  hero.positionY += hero.velocityY;
  hero.velocityY += hero.gravity;
  hero.velocityY *= hero.friction;

  // Player State Animations //

  hero.renderIdlePlayer();
  hero.renderDeadPlayer();
}

// Constructor for creating Components //

function updateCanvas() {
  //detectGround(hero.positionX);
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  level.drawLevel(currentLevel);
  checkGroundType();
  HeroMovement();
  //jumpCheck();

  requestAnimationFrame(updateCanvas);
}
requestAnimationFrame(updateCanvas);
