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
var rectX = 50;
var rectY = 50;
var rectSize = 30;

var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;

var startButton = document.getElementById('startButton')

var map1 = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

var tileMap;


document.addEventListener("keydown",keyDownListener,false); //These are listeners where they detect if ANY key is pressed DOWN, if so the keyDownHandler() will be activated
document.addEventListener("keyup",keyUpListener,false); //These the other listeners where they dectect if ANY key is pressed UP (meaning that the key was let go), if so the keyUpHandler() will be activated

function loadMap(){
    tileMap = new Array(map1.length);
    tileMap = twoDArray(tileMap, map1.length);
    
}

function twoDArray(temp, x){ //generates a 2D array
    for(i = 0; i < temp.length; i++)
        temp[i] = new Array(x);
    return temp;
}

function startGame() {
    startButton.style.display = 'none'
    setInterval(frame, 10)
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


function player () {
    ctx.beginPath();
    ctx.rect(rectX, rectY, rectSize, rectSize);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function frame() { // the function will be called every 10 miliseconds forever
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //here a 2D array of Tile objects will be traversed
    player();
    
    // Checks if the variable before moving player
    if(rightPressed && rectX < canvas.width - 30) {
        rectX = rectX + 4;
    }
    if(leftPressed && rectX > 0) {
        rectX = rectX - 4;
    }
    if(upPressed && rectY > 0) {
        rectY = rectY - 4;
    }
    if(downPressed && rectY < canvas.height - 30) {
        rectY = rectY + 4;
    }
}




