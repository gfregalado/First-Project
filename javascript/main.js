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
    ctx.drawImage(img, this.positionX, this.positionY, this.width, this.height);
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

class sky {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  drawSky1() {
    let img;
    img = new Image();
    img.src = "Images/map/cloud_1.png";
    ctx.drawImage(img, this.x, this.y, tileSize * 2, tileSize);
  }
  drawSky2() {
    let img;
    img = new Image();
    img.src = "Images/map/cloud_2.png";
    ctx.drawImage(img, this.x + 175, this.y, tileSize * 2, tileSize);
  }
  drawSky3() {
    let img;
    img = new Image();
    img.src = "Images/map/cloud_3.png";
    ctx.drawImage(img, this.x + 900, this.y, tileSize * 2, tileSize);
  }
}

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
// Creating a Player & World //

let hero = new player(100, 0);
let clouds = new sky(100, 50);

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
      level.type === "water" &&
      hero.positionY >= 214
    ) {
      hero.dead = true;
    } else if (
      hero.positionX >= level.x - 25 &&
      hero.positionX <= level.x + 15 &&
      level.type === "ground"
    ) {
      hero.dead = false;
    } else if (hero.positionY > 210 && hero.positionY <= 215) {
      hero.positionY = 215;
      hero.velocityY = 0;
      hero.jump = true;
    }
  });
}

function Jump() {
  hero.velocityY -= 9;
  hero.positionY += hero.velocityY;
  hero.velocityY += hero.gravity;
  hero.velocityY *= hero.friction;
  hero.jump = false;
}

// Controls //

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 32: // space
      //Jump Action //
      if (hero.jump === true) {
        Jump();
      }
      break;
    case 37: // left arrow
      if (hero.positionX > 70 && hero.positionX < 380 && hero.dead === false) {
        hero.velocityX -= 0.5;
      }
      viewFinderLeft();
      clouds.x += 30;
      break;
    case 39: // right arrow
      if (hero.positionX > 0 && hero.positionX < 350 && hero.dead === false) {
        hero.velocityX += 0.5;
      }
      //console.log(hero);
      viewFinderRight();
      clouds.x -= 30;
      console.log(hero);
      break;
    case 13: // Enter Key
      // if (hero.dead === true) {
      //   requestAnimationFrame(updateCanvas);
      //   hero.dead = false;
      // }
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

function heroDeath() {
  if (hero.dead === true && hero.positionY <= 320) {
    hero.gravity = 0.3;
    hero.friction = 0.9;
    ctx.fillStyle = "rgb(25, 25, 25, 0.3)";
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    ctx.font = "50px sans-serif";
    ctx.fillText("Game Over", $canvas.width - 400, $canvas.height / 2);
    ctx.font = "15px sans-serif";
    ctx.fillText(
      `Press "Enter" to try again`,
      $canvas.width - 375,
      $canvas.height - 100
    );
  }
}
// Constructor for creating Components //

function updateCanvas() {
  //detectGround(hero.positionX);
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  level.drawLevel(currentLevel);
  clouds.drawSky1();
  clouds.drawSky2();
  clouds.drawSky3();
  checkGroundType();
  heroDeath();
  HeroMovement();
  console.log(hero.velocityX);
  if (hero.dead === true) return;

  //jumpCheck()

  requestAnimationFrame(updateCanvas);
}
requestAnimationFrame(updateCanvas);
