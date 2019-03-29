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

////////////////////////////////////////////////////////////////////
//SOUND
var slider = document.getElementById("masterVolume");

var gameMusic = new Audio('www/sound/placeholder_music.mp3');
gameMusic.volume = 0.1;
var enterClick = new Audio('www/sound/enter.wav');
enterClick.volume = 0.1;

var oldSound = slider.value;
///////////////////////////////////////////////////////////////////
//PLAYER & CONTROLS

var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;

var startButton = document.getElementById('startButton')

var tileMap; //current map displayed

var player = new Player(1, 3);
var playerImgX = 0;
var playerImgY = 0;
var playerImgFrame = 0;

var currentMap;

///////////////////////////////////////////////////////////////////
//IMAGES
var img = new Image();
img.onload= imageLoaded;
img.src = "www/img/menubackground.png";

var img2 = new Image();
img2.src = "www/img/menu.png";
var menuBackgroundMovement = setInterval(menuDraw, 50); //set a variable for the this setInterval for the movement of background so that it can be cleared later
var imageX = 0;
var imageMovement = -1;
///////////////////////////////////////////////////////////////////
//GAME RELATED VARIABLES
var coins = 0;

var radiusTransparent = 65;
var radiusBlack = 100;

document.addEventListener("keydown",keyDownListener,false); //These are listeners where they detect if ANY key is pressed DOWN, if so the keyDownHandler() will be activated
document.addEventListener("keyup",keyUpListener,false); //These the other listeners where they dectect if ANY key is pressed UP (meaning that the key was let go), if so the keyUpHandler() will be activated


function imageLoaded() {
    menuBackgroundMovement //calls the setInterval to start when the image has finally loaded
}

function menuDraw() {
    var volume = 0.1 - (slider.value / 100); //gets value of volume slider
    enterClick.volume = 0.1 - volume;
    gameMusic.volume = 0.1 - volume;
    if (oldSound != slider.value) { //checks if the value of slider has changed then plays sound
      enterClick.play();
      oldSound = slider.value
    }
    ctx.drawImage(img, imageX, 0);
    ctx.drawImage(img2, 0, 0);
    if (imageX == -1140) { //the image reaches its maximum length when x is -480 or 0, this makes it so that when the image reaches -480 or 0 it will move the other direction
      imageMovement = 0.5
    } else if (imageX == 0) {
      imageMovement = -0.5
    }
    imageX = imageX + imageMovement
}

function startGame() { //prepares the game to start
    clearInterval(menuBackgroundMovement)
    enterClick.play();
    gameMusic.loop = true;
    gameMusic.play();
    masterVolume.style.display = 'none'
    startButton.style.display = 'none'
    currentMap = 1;
    loadMap(map1);
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
        player.x = player.x + 2;
        playerImgFrame = (playerImgFrame + 0.05) % 4;
        playerImgX = Math.floor(playerImgFrame) * 32;
        playerImgY = 64;
    }
    if(leftPressed && player.x > 0) {
        player.x = player.x - 2;
        playerImgFrame = (playerImgFrame + 0.05) % 4;
        playerImgX = Math.floor(playerImgFrame) * 32;
        playerImgY = 32;
    }
    if(upPressed && player.y > 0) {
        player.y = player.y - 2;
        playerImgFrame = (playerImgFrame + 0.05) % 4;
        playerImgX = Math.floor(playerImgFrame) * 32;
        playerImgY = 96;
    }
    if(downPressed && player.y < canvas.height - 30) {
        player.y = player.y + 2;

        playerImgFrame = (playerImgFrame + 0.05) % 4; //Goes through numbers 1 - 3
        playerImgX = Math.floor(playerImgFrame) * 32; //Floors the frame so it is a whole number and multiplies by 32 to find the sprite art position

        playerImgY = 0;
    }
    if(tileMap.collisionCheck(player)){
        player.x = tempX;
        player.y = tempY;
    }

    //draws the circle around the player if you need this disabled comment the section below
    var gradient = ctx.createRadialGradient(player.x+15, player.y+15, radiusTransparent, player.x+15, player.y+15, radiusBlack);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, 'black');
    ctx.beginPath();
    ctx.arc(player.x+15, player.y+15, 1250, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    player.show();
}
