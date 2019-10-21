let myGameArea = {
  canvas: document.createElement("canvas"),
  frames: 0,
  start: function() {
    this.canvas.width = 560;
    this.canvas.height = 320;
    this.context = this.canvas.getContext("2d");
    this.canvas.classList.add("canvasBg");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }
};

myGameArea.start();
