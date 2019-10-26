// Defining the Canvas //
let $canvas = document.getElementById("myCanvas");
let ctx = $canvas.getContext("2d");

class player {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocityX = 7;
    this.velocityY = 0;
    this.frames = 0;
    this.gravity = 0.1;
    this.pull = 0;
  }

  renderIdlePlayer() {
    let sizeX = 64;
    let sizeY = sizeX;
    let img = new Image();
    img.src = "/Images/hero/Idle/0_Reaper_Man_Idle_" + this.frames + ".png";
    ctx.drawImage(img, this.positionX, this.positionY - 54, sizeX, sizeY);
    this.frames++;
    if (this.frames === 17) {
      this.frames = 0;
    }
  }
}

//Background & Levels //

// Constants //
let numberOfTiles = 10;
let tileSize = $canvas.width / numberOfTiles;
let groundLevel = tileSize - 5;

// Background Constructor //

let levelOne = ["x", "x", "w", "w", "w", "x", "x", "x", "x", "x", "x", "x"];
class map {
  constructor() {
    this.col = 0;
    this.row = 320 - groundLevel;
  }

  drawLevel(level) {
    let img;
    let imageGround = "Images/map/groundfull.png";
    let imageDirt = "Images/map/ground_dirt.png";
    let imageWater = "Images/map/water.png";
    let levelStart = 0;
    for (let i = 0; i < level.length; i++) {
      img = new Image();
      if (level[i] === "x") {
        img.src = imageGround;
      }
      if (level[i] === "o") {
        img.src = imageDirt;
      }
      if (level[i] === "w") {
        img.src = imageWater;
      }
      ctx.drawImage(img, levelStart, this.row, tileSize, tileSize);
      levelStart += tileSize;
    }
  }
}

let level = new map();

// Creating a Player //

let hero = new player(100, 100);

// Movement and behaviour //

// Hitting the ground //

function ground() {
  let rockBottom = $canvas.height - groundLevel;
  if (hero.positionY > rockBottom) {
    hero.positionY = rockBottom;
    hero.velocityY = 0;
  }
}

// Controls //

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 32: // space
      if (hero.positionY >= $canvas.height - (tileSize - 5)) hero.pull = 0.5;
      break;
    case 37: // left arrow
      hero.positionX -= hero.velocityX;
      break;
    case 39: // right arrow
      hero.positionX += hero.velocityX;
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
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  level.drawLevel(levelOne);
  ground();
  hero.velocityY = hero.velocityY + (hero.gravity - hero.pull);
  hero.positionY += hero.velocityY;
  hero.renderIdlePlayer();
  requestAnimationFrame(updateCanvas);
}

requestAnimationFrame(updateCanvas);
