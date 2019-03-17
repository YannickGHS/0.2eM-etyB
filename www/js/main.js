/* ===========================================================================
 * main.js
 * ===========================================================================
 * Author: Byte Me 2.0 Team
 * Date: 3/05/2019
 * Description:
 * Main javascript file
 */

var canvas = document.getElementById("myCanvas"); // Get canvas element from html document

var ctx = canvas.getContext("2d");

var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;

var startButton = document.getElementById('startButton')

var tileMap; //current map displayed

var player = new Player(64, 64);

document.addEventListener("keydown",keyDownListener,false); //These are listeners where they detect if ANY key is pressed DOWN, if so the keyDownHandler() will be activated
document.addEventListener("keyup",keyUpListener,false); //These the other listeners where they dectect if ANY key is pressed UP (meaning that the key was let go), if so the keyUpHandler() will be activated

function startGame() {
    startButton.style.display = 'none'
    loadMap();
    setInterval(frame, 10);
}

function keyDownListener(e) { //the (e) variable will allow the parameter to accept events which were set above
    if(e.key=="ArrowRight") {
        rightPressed = true;
    }
    else if(e.key=="ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key=="ArrowUp") {
        upPressed = true;
    }
    else if(e.key=="ArrowDown") {
        downPressed = true;
    }
}

function keyUpListener(e) {
    if(e.key=="ArrowRight") {
        rightPressed = false;
    }
    else if(e.key=="ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key=="ArrowUp") {
        upPressed = false;
    }
    else if(e.key=="ArrowDown") {
        downPressed = false;
    }
}

function frame() { // the function will be called every 10 miliseconds forever
    let tempX = player.x;
    let tempY = player.y;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tileMap.display();//here a 2D array of Tile objects will be traversed
    // Checks if the variable before moving player
    if(rightPressed && player.x < canvas.width - 30) {
        player.x = player.x + 4;
    }
    if(leftPressed && player.x > 0) {
        player.x = player.x - 4;
    }
    if(upPressed && player.y > 0) {
        player.y = player.y - 4;
    }
    if(downPressed && player.y < canvas.height - 30) {
        player.y = player.y + 4;
    }
    if(tileMap.collisionCheck(player)){
        player.x = tempX;
        player.y = tempY;
    }
    player.show();
    console.log(tileMap.collisionCheck(player));
}