// Defining the Canvas //
let $canvas = document.getElementById("myCanvas");
let ctx = $canvas.getContext("2d");

class player {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.frames = 0;
  }

  renderIdlePlayer() {
    let img = new Image();
    img.src = "/Images/hero/Idle/0_Reaper_Man_Idle_" + this.frames + ".png";
    ctx.drawImage(img, this.positionX, this.positionY - 56, 64, 64);
    this.frames++;
    if (this.frames === 17) {
      this.frames = 0;
    }
  }
}

// Creating a Player //

let mario = new player(32, $canvas.height);

// Movement and behaviour //

// Controls //

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: // up arrow
      mario.positionY -= 5;
      console.log(mario.positionY);
      break;
    case 37: // left arrow
      mario.positionX -= 5;
      console.log(mario.positionX);
      break;
    case 39: // right arrow
      mario.positionX += 5;
      console.log(mario.positionX);
      break;
  }
};

// Constructor for creating Components //

function updateCanvas() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  mario.renderIdlePlayer();
}

setInterval(updateCanvas, 20);
