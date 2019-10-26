// Defining the Canvas //
let $canvas = document.getElementById("myCanvas");
let ctx = $canvas.getContext("2d");

let gravity = 0.3;
class player {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocityX = 7;
    this.velocityY = 1;
    this.frames = 0;
    this.deadframes = 14;
    this.pull = 0;
    this.jump = false;
    this.dead = false;
  }

  renderIdlePlayer() {
    let sizeX = 64;
    let sizeY = sizeX;
    let img = new Image();
    if (this.dead === false)
      img.src = "/Images/hero/Idle/0_Reaper_Man_Idle_" + this.frames + ".png";
    ctx.drawImage(img, this.positionX, this.positionY, sizeX, sizeY);
    this.frames++;
    if (this.frames === 17) {
      this.frames = 0;
    }
  }

  renderDeadPlayer() {
    let sizeX = 64;
    let sizeY = sizeX;
    let img = new Image();
    if (this.dead === true)
      for (let i = 0; i <= 14; i++)
        img.src = "/Images/hero/Dying/0_Reaper_Man_Dying_" + i + ".png";
    ctx.drawImage(img, this.positionX, this.positionY - 54, sizeX, sizeY);
  }
}

//Background & Levels //

// Constants //
let numberOfTiles = 10;
let tileSize = $canvas.width / numberOfTiles;
let groundLevel = tileSize - 5;

// Background Constructor //
let levelOne = ["g", "g", "g", "w", "g", "g", "g", "w", "w", "g"];

class Obstacle {
  constructor(x, y, type, source) {
    (this.x = x), (this.y = y), (this.type = type), (this.source = source);
  }
}

let water = { x: 0, y: 0, type: "water", source: "Images/map/water.png" };
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
  } else {
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

// Creating a Player //

let hero = new player(100, 0);

// Movement and behaviour //

function detectGround(posX) {
  let actualPosition = posX + 30;
  currentLevel.forEach(level => {
    if (
      actualPosition > level.x &&
      actualPosition < level.x + tileSize &&
      level.type === "water"
    ) {
      hero.dead = true;
      hero.jump = false;
      hero.velocityY = 0;
    }
    if (hero.positionY >= 215.3 && level.type === "ground") {
      hero.jump = true;
      hero.dead = false;
      hero.positionY = $canvas.height - 105;
      hero.velocityY = 0;
    }
  });
}

// Controls //

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 32: // space
      if (hero.jump === true && hero.positionY === 215.3) {
        hero.pull = 0.5;
      }
      break;
    case 37: // left arrow
      hero.positionX -= hero.velocityX;

      break;
    case 39: // right arrow
      hero.positionX += hero.velocityX;
      console.log(hero);

      break;
  }
};

document.onkeyup = function(e) {
  switch (e.keyCode) {
    case 32: //space
      hero.pull = 0;
  }
};

// Constructor for creating Components //

function updateCanvas() {
  detectGround(hero.positionX);
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  hero.velocityY = hero.velocityY + (gravity - hero.pull);
  hero.positionY += hero.velocityY;
  level.drawLevel(currentLevel);

  hero.renderIdlePlayer();
  hero.renderDeadPlayer();

  requestAnimationFrame(updateCanvas);
}

requestAnimationFrame(updateCanvas);
