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
//Handles all sound that happens in game
var slider = document.getElementById("masterVolume");

var gameMusic = new Audio('www/sound/placeholder_music.mp3');
gameMusic.volume = 0.1;
var enterClick = new Audio('www/sound/enter.wav');
enterClick.volume = 0.1;
var endMusic = new Audio('www/sound/endscreen_music.mp3')
endMusic.volume = 0;
var bell = new Audio("www/sound/bell.wav");
bell.volume = 0.1;

var oldSound = slider.value;
var volume;
///////////////////////////////////////////////////////////////////
//PLAYER & CONTROLS
//Handles with key controllers and functions for the player
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

var gameFrame;
var messageInterval;

var messageCounter = 0;

var messageArray = ["My name is Felix, even though my name means happy, I'm not.", "Where am I you ask? I am in my head.", "A maze of my mind.", "I'm not crazy, actually maybe, no indefinitely.",
"God I'm dumb.", "What time is it?", "It's 8:00, whatever I'll just sleep in. I really don't pay attention to school anyway.", "Plus, it's probably better if I don't go.",
"But, Lili would be in math class, and I can't risk her thinking I'm stupid for missing school. ", "If Mrs. Achan called me up to do a question Lili would surely pay attention.",
"It's quadratics too, I've never been good at that.", "When was I ever good at anything?", "Well I was sort of good at baseball.",
"Three years ago when Jude and Toby were on my team, those were good times.", "What a season that was, I'm pretty sure that was the last one.", "Eh, who cares anyway, I haven't seen them for awhile.",
"I'd love to see them again...", "If I can get out of this maze.", "Maybe I can get better..? If I can get out of here that is...", ""]
///////////////////////////////////////////////////////////////////
//IMAGES
//Handles with loading in the images that will be used in the game
var img = new Image();
img.onload= imageLoaded;
img.src = "www/img/menubackground.png";

var img2 = new Image();
img2.src = "www/img/menu.png";
var imageX = 0;
var imageMovement = -1;
var menuBackgroundMovement = null;

var img3 = new Image();
img3.src = "www/img/Endscreen.png"

img4 = new Image();
img4.src = "www/img/endbackground.png"
var alpha = 1;
var alpha1 = 0;
var alpha2 = 1;
///////////////////////////////////////////////////////////////////
//GAME RELATED VARIABLES
//Handles variables that are used at various parts in the game
var coins = 0; //Holds the amount of coins the user has collected
var oldCoins = 0; //Holds the previous value of the coin

var radiusTransparent = 10; //Used for the radius around the player
var radiusBlack = 100;

var endRadius;
var radiusExpand;

var countDownDate = Date.now()+720100; // Set the date we're counting down to
//var countDownDate = Date.now()+5000;

var isSearching = false;


document.addEventListener("keydown",keyDownListener,false); //These are listeners where they detect if ANY key is pressed DOWN, if so the keyDownHandler() will be activated
document.addEventListener("keyup",keyUpListener,false); //These the other listeners where they dectect if ANY key is pressed UP (meaning that the key was let go), if so the keyUpHandler() will be activated

function imageLoaded() {
    menuBackgroundMovement = setInterval(menuDraw, 50); //set a variable for the this setInterval for the movement of background so that it can be cleared later
}

function menuDraw() { //handles the menu of the game when started
    volume = (0.1 - (slider.value / 100)); //gets value of volume slider
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
    clearInterval(menuBackgroundMovement);
    enterClick.play();
    gameMusic.loop = true;
    gameMusic.play();
    masterVolume.style.display = 'none'
    startButton.style.display = 'none'
    currentMap = 1;
    volume = gameMusic.volume/200
    loadMap(map1);
    countDownDate = Date.now()+720100;
    //sets the count down timer for the game and ends the game when the 12 minutes is over
    var timerCountText = document.getElementById('timer')
    var timerCountDown = setInterval(function() { // Update the count down every 1 second
        var now = new Date().getTime(); // Get todays date and time
        var distance = countDownDate - now; // Find the distance between now and the count down date

        // Time calculations for , minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
        //console.log(minutes + "m" + seconds + "s");

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(timerCountDown);
          clearInterval(gameFrame);
          setInterval(endScreen, 10)
          timer.style.display = 'none'
        }
      }, 1000);
    gameFrame = setInterval(frame, 10);
    messageInterval = setInterval(messagesFunction, 7000)
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
    else if(e.key == "h"){
      isSearching = true;
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
        playerImgFrame = (playerImgFrame + 0.05) % 4; //Goes through numbers 1 - 3
        playerImgX = Math.floor(playerImgFrame) * 32; //Floors the frame so it is a whole number and multiplies by 32 to find the sprite art position
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

        playerImgFrame = (playerImgFrame + 0.05) % 4;
        playerImgX = Math.floor(playerImgFrame) * 32;

        playerImgY = 0;
    }
    if(tileMap.collisionCheck(player)){
        player.x = tempX;
        player.y = tempY;
    }
    if (oldCoins != coins) { //checks if the value of coins has changed then increases radius (temp fix due to coin counter being a bit off)
      radiusTransparent += 5
      radiusBlack += 5
      oldCoins = coins
    }

    if(!isSearching){
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
    else{
      if(alpha1 < 1){
        var gradient = ctx.createRadialGradient(player.x+15, player.y+15, radiusTransparent, player.x+15, player.y+15, radiusBlack);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, 'black');
        ctx.beginPath();
        ctx.arc(player.x+15, player.y+15, 1250, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
        player.show();
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0, 0, 0, " + alpha1 +")";
        ctx.fill();
        alpha1 = alpha1 + 0.05;
      }
      else{
        if(alpha2 > 0){
          ctx.beginPath();
          ctx.rect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "rgba(0, 0, 0, " + alpha2 +")";
          ctx.fill();
        }
        alpha2 = alpha2 - 0.02;
        player.show();
        findNearestHelp();
        if(alpha2 < -1){
          isSearching = false;
          alpha2 = 1;
          alpha1 = 0;
        }
      }
    }
    if (alpha >= 0) { //this handles fading out from black into the game
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, " + alpha +")";
      ctx.fill();
      alpha = alpha - 0.02;
    }
    messages(); //displays messages of the character
}

function messagesFunction () { //This function is mainly used to count everytime it passes 7 seconds as set by a setInterval,
  if (messageCounter < 19) {
      messageCounter += 1;
  }
  else {
    clearInterval(messageInterval);
    messageArray[19] = "";
  }
}

function messages () {
  ctx.beginPath();
  ctx.font= "25px Arial";
  ctx.fillStyle = "#adadad";
  ctx.fill();
  ctx.fillText(messageArray[messageCounter], 0, 25);
}


function endScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img4, imageX, 0);
  ctx.drawImage(img3, 0, 0);

  ctx.beginPath();
  ctx.arc(535,400,endRadius,0,2*Math.PI,false);
  ctx.fillStyle = "#4286f4";
  ctx.fill();
  if (endRadius == 170) {
	  radiusExpand = -1.25;
  }
	else if (endRadius == 0) {
	  radiusExpand = 1.25;
	}

	endRadius = endRadius + radiusExpand
	ctx.beginPath();
    ctx.arc(535,400,25,0,2*Math.PI,false);
	ctx.stroke();

	ctx.beginPath();
    ctx.arc(535,400,140,0,2*Math.PI,false);
	ctx.stroke();

  if (alpha >= 0) { //this handles fading out from black into the game
    gameMusic.volume = gameMusic.volume - volume;
    endMusic.volume = endMusic.volume + volume;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, " + alpha +")";
    ctx.fill();
    alpha = alpha - 0.005;
  }
  if (alpha == 0) {
    gameMusic.stop;
  }
  if (imageX == -1140) { //the image reaches its maximum length when x is -480 or 0, this makes it so that when the image reaches -480 or 0 it will move the other direction
    imageMovement = 0.5;
  } else if (imageX == 0) {
    imageMovement = -0.5;
  }
  imageX = imageX + imageMovement;
}
