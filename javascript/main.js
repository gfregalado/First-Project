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
let gameState = "start";

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
    this.buttonX = 4592 - 140;
  }

  drawLevel(level) {
    let img;
    for (let i = 0; i < level.length; i++) {
      img = new Image();
      img.src = level[i].source;
      ctx.drawImage(img, level[i].x, this.row, tileSize, tileSize);
    }
  }
  drawEndGameButtonOff() {
    let imgButtonOff;
    imgButtonOff = new Image();
    imgButtonOff.src = "Images/map/switch_red_off.png";
    ctx.drawImage(imgButtonOff, this.buttonX, this.row - 25, 45, 30);
  }
  drawEndGameButtonOn() {
    let imgButtonOn;
    imgButtonOn = new Image();
    imgButtonOn.src = "Images/map/switch_red_on.png";
    ctx.drawImage(imgButtonOn, this.buttonX, this.row - 25, 45, 30);
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

// Creating a Player & World //

let hero = new player(100, 0);
let clouds = new sky(100, 50);

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

// Controls //

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 32: // space
      //Jump Action //
      console.log(level.buttonX);
      console.log("hero position X" + hero.positionX);
      console.log("hero position Y" + hero.positionY);
      if (hero.jump === true) {
        Jump();
      }
      break;
    case 37: // left arrow
      hero.isRunningLeft = true;
      break;
    case 39: // right arrow
      hero.isRunningRight = true;
      break;
    case 13: // Enter Key
      if (gameState === "start") {
        requestAnimationFrame(updateCanvas);
        requestAnimationFrame(updateHero);
        gameState = "running";
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
      currentLevel[i].x -= 1.5;
      clouds.x -= 0.1 / 6;
      level.buttonX -= 0.1 / 4;
    }
  }
}

function youWin() {
  if (
    level.buttonX >= 448 &&
    level.buttonX <= 450 &&
    hero.positionX >= 425 &&
    hero.positionX <= 457 &&
    hero.positionY >= 188 &&
    hero.positionY <= 195
  )
    level.drawEndGameButtonOn();
  else level.drawEndGameButtonOff();
}

function heroDeath() {
  if (hero.dead === true) {
    hero.gravity = 0.3;
    hero.friction = 0.9;
    // ctx.fillStyle = "rgb(25, 25, 25, 0.3)";
    // ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    // ctx.font = "50px sans-serif";
    // ctx.fillText("Game Over", $canvas.width - 400, $canvas.height / 2);
    // ctx.font = "15px sans-serif";
    // ctx.fillText(
    //   `Press "Enter" to try again`,
    //   $canvas.width - 375,
    //   $canvas.height - 100
    // );
  }
}
// Screen Types //
function StartScreen() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  if (gameState === "start") level.drawLevel(currentLevel);
  clouds.drawSky1();
  clouds.drawSky2();
  clouds.drawSky3();
  ctx.font = "14px 'Press Start 2P'";
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
    youWin();
    requestAnimationFrame(endScreen);
  }
}

function updateCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  level.drawLevel(currentLevel);
  clouds.drawSky1();
  clouds.drawSky2();
  clouds.drawSky3();
  requestAnimationFrame(updateCanvas);
}

function updateHero() {
  checkGroundType();
  HeroMovement();
  heroDeath();
  moveGround();
  youWin();
  requestAnimationFrame(updateHero);
  endScreen();
  console.log(gameState);
}

requestAnimationFrame(StartScreen);
