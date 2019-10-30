function registerControls() {
  window.onkeydown = function(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 37: // left
        held.left = true;
        break;
      case 32: // space
        held.up = true;
        break;
      case 38: // up
        held.up = true;
        break;
      case 39: // right
        held.right = true;
        break;
      case 40: // down
        held.down = true;
        break;
      case 27: // escape
        initGame();
      default:
        return;
    }
    return false;
  };

  window.onkeyup = function(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 37: // left
        held.left = false;
        break;
      case 32: // space
        held.up = false;
        break;
      case 38: // up
        held.up = false;
        break;
      case 39: // right
        held.right = false;
        break;
      case 40: // down
        held.down = false;
        break;
      default:
        return;
    }
    return false;
  };
}
