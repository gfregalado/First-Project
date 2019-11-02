// Defining the Canvas //
let $canvas = document.getElementById("myCanvas");
let ctx = $canvas.getContext("2d");

let tileSize = $canvas.width / 10;
let groundLevel = tileSize - 5;
let currentLevel = [];
let levelStart = 0;
const images = [];

for (let i = 0; i < 23; i++) {
  let img = new Image();
  img.src = "Images/hero/Walking/0_Reaper_Man_Walking_" + i + ".png";
  images.push(img);
}

function startGame() {
  createObstacles();
  requestAnimationFrame(updateCanvas);
  requestAnimationFrame(updateHero);
  backgroundMusic();
  gameState = "running";
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
    this.isRunningRight = false;
    this.isRunningLeft = false;
    this.gameRunning = false;
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
    if (this.frames === 23) {
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

function backgroundMusic() {
  let backgroundMusic = new Audio("sounds/backgroundMusic.mp3");
  backgroundMusic.play();
}
//Background & Levels //

// Background Constructor //

class Obstacle {
  constructor(x, y, type, source) {
    (this.x = x), (this.y = y), (this.type = type), (this.source = source);
  }
}

function createObstacles() {
  for (let i = 0; i < levelOne.length; i++) {
    if (i == 0) {
      currentLevel.push(
        new Obstacle(0, 0, "ground", "Images/map/groundfull.png")
      );
    } else if (levelOne[i] === "w") {
      currentLevel.push(
        new Obstacle(
          (levelStart += tileSize),
          0,
          "water",
          "Images/map/water.png"
        )
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
}

class map {
  constructor() {
    this.col = 0;
    this.row = 320 - groundLevel;
    this.buttonX = 4592 - 140;
    this.platformX = 600;
  }

  drawLevel(level) {
    let img;
    for (let i = 0; i < level.length; i++) {
      img = new Image();
      img.src = level[i].source;
      ctx.drawImage(img, level[i].x, this.row, tileSize, tileSize);
    }
  }

  drawPlatforms() {
    let img = new Image();
    img.src = "Images/map/plank.png";
    ctx.drawImage(img, this.platformX, 180, 70, 20);
    ctx.drawImage(img, this.platformX + 70, 180, 70, 20);
    ctx.drawImage(img, this.platformX + 140, 180, 70, 20);

    ctx.drawImage(img, this.platformX + 1600, 180, 70, 20);
    ctx.drawImage(img, this.platformX + 1670, 180, 70, 20);
    ctx.drawImage(img, this.platformX + 1740, 180, 70, 20);
  }
  // drawEndGameButtonOff() {
  //   let imgButtonOff;
  //   imgButtonOff = new Image();
  //   imgButtonOff.src = "Images/map/switch_red_off.png";
  //   ctx.drawImage(imgButtonOff, this.buttonX, this.row - 25, 45, 30);
  // }
  // drawEndGameButtonOn() {
  //   let imgButtonOn;
  //   imgButtonOn = new Image();
  //   imgButtonOn.src = "Images/map/switch_red_on.png";
  //   ctx.drawImage(imgButtonOn, this.buttonX, this.row - 25, 45, 30);
  // }
}

class sky {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  drawSky1() {
    let img = new Image();
    img.src = "Images/map/cloud_1.png";
    ctx.drawImage(img, this.x, this.y, tileSize * 2, tileSize);
    ctx.drawImage(img, this.x + 1400, this.y, tileSize * 2, tileSize);
    ctx.drawImage(img, this.x + 2000, this.y, tileSize * 2, tileSize);
    ctx.drawImage(img, this.x + 2900, this.y, tileSize * 2, tileSize);
  }
  drawSky2() {
    let img = new Image();
    img.src = "Images/map/cloud_2.png";
    ctx.drawImage(img, this.x + 500, this.y, tileSize * 2, tileSize);
    ctx.drawImage(img, this.x + 1700, this.y, tileSize * 2, tileSize);
    ctx.drawImage(img, this.x + 4000, this.y, tileSize * 2, tileSize);
    ctx.drawImage(img, this.x + 4200, this.y, tileSize * 2, tileSize);
  }
  drawSky3() {
    let img = new Image();
    img.src = "Images/map/cloud_3.png";
    ctx.drawImage(img, this.x + 900, this.y, tileSize * 2, tileSize);
    ctx.drawImage(img, this.x + 2300, this.y, tileSize * 2, tileSize);
    ctx.drawImage(img, this.x + 3200, this.y, tileSize * 2, tileSize);
  }
}

// Movement and behaviour //

function checkGroundType() {
  currentLevel.forEach(level => {
    if (
      hero.positionX >= level.x - 25 &&
      hero.positionX <= level.x + 15 &&
      level.type === "water" &&
      hero.positionY >= 213
    ) {
      dyingAnimation();
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
function dyingAnimation() {
  gameState = "restart";
  hero.dead = true;
  hero.jump = false;
  hero.velocityY += 0.1;
  hero.friction = 0.3;
  hero.positionY += hero.velocityY;
  hero.velocityY += hero.gravity;
  hero.velocityY *= hero.friction;
}
function Jump() {
  hero.velocityY -= 17;
  hero.positionY += hero.velocityY;
  hero.velocityY += hero.gravity;
  hero.velocityY *= hero.friction;
  hero.jump = false;
}

function checkPlatform() {
  if (
    hero.positionX >= level.platformX - 30 &&
    hero.positionX <= level.platformX + 185 &&
    hero.positionY >= 129 &&
    hero.positionY <= 131
  ) {
    hero.positionY = 130;
    hero.velocityY = 0;
    hero.jump = true;
  }
  if (
    hero.positionX >= level.platformX + 1570 &&
    hero.positionX <= level.platformX + 1785 &&
    hero.positionY >= 129 &&
    hero.positionY <= 131
  ) {
    hero.positionY = 130;
    hero.velocityY = 0;
    hero.jump = true;
  }
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
      hero.isRunningLeft = true;
      break;
    case 39: // right arrow
      console.log("position Y" + hero.positionY);
      console.log("position X" + hero.positionX);
      hero.isRunningRight = true;
      break;
    case 13: // Enter Key
      if (gameState === "start") {
        startGame();
      } else if (gameState === "restart") {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height);
        requestAnimationFrame(updateCanvas);
        requestAnimationFrame(updateHero);
      }

      break;
  }
};

document.onkeyup = e => {
  switch (e.keyCode) {
    case 37:
      hero.isRunningLeft = false;
      break;
    case 39: // right arrow
      hero.isRunningRight = false;
      break;
  }
};

function HeroMovement() {
  if (hero.isRunningRight) {
    hero.velocityX += 0.3;
  } else if (hero.isRunningLeft) {
    hero.velocityX -= 0.3;
  } else {
    hero.velocityX = 0;
  }
  hero.positionX += hero.velocityX;
  hero.velocityX *= hero.friction;
  hero.positionY += hero.velocityY;
  hero.velocityY += hero.gravity;
  hero.velocityY *= hero.friction;

  // Player State Animations //

  hero.renderIdlePlayer();
  hero.renderDeadPlayer();
}

function moveGround() {
  if (hero.dead != true && level.buttonX >= 450) {
    for (let i = 0; i < currentLevel.length; i++) {
      currentLevel[i].x -= 2;
      clouds.x -= 0.1 / 6;
      level.buttonX -= 0.1 / 4;
      level.platformX -= 0.1 / 4;
    }
  }
}

// function youWin() {
//   if (
//     level.buttonX >= 448 &&
//     level.buttonX <= 450 &&
//     hero.positionX >= 425 &&
//     hero.positionX <= 457 &&
//     hero.positionY >= 188 &&
//     hero.positionY <= 195
//   )
//     level.drawEndGameButtonOn();
//   else level.drawEndGameButtonOff();
// }

function heroDeath() {
  if (hero.dead === true) {
    hero.gravity = 0.3;
    hero.friction = 0.9;
  }
}
// Screen Types //
function StartScreen() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  level.drawLevel(currentLevel);
  clouds.drawSky1();
  clouds.drawSky2();
  clouds.drawSky3();
  ctx.fillStyle = "rgb(25, 25, 25, 0.1)";
  ctx.fillRect(0, 0, $canvas.width, $canvas.height);
  ctx.font = "14px 'Press Start 2P'";
  ctx.fillStyle = "white";
  ctx.fillText(
    `Press "Enter" to Start`,
    $canvas.width - 435,
    $canvas.height / 2
  );
  requestAnimationFrame(StartScreen);
}

function endScreen() {
  if (gameState === "restart") {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    level.drawLevel(currentLevel);
    clouds.drawSky1();
    clouds.drawSky2();
    clouds.drawSky3();
    ctx.fillStyle = "rgb(25, 25, 25, 0.1)";
    ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "25px 'Press Start 2P'";
    ctx.fillText(
      `Game Over`,

      $canvas.width - 390,
      $canvas.height / 2
    );
    checkGroundType();
    HeroMovement();
    heroDeath();
    moveGround();
    //youWin();
    requestAnimationFrame(endScreen);
  }
}

function updateCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  level.drawLevel(currentLevel);
  clouds.drawSky1();
  clouds.drawSky2();
  clouds.drawSky3();
  level.drawPlatforms();
  requestAnimationFrame(updateCanvas);
}

function updateHero() {
  checkGroundType();
  HeroMovement();
  heroDeath();
  moveGround();
  //youWin();
  requestAnimationFrame(updateHero);
  endScreen();
  checkPlatform();
}

function restartGame() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}

// Creating a Player & World //

let gameState = "start";

let hero = new player(100, 0);
let clouds = new sky(100, 50);
let level = new map();

requestAnimationFrame(StartScreen);
