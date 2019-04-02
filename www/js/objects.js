/* ===============================================================
 * objects.js
 * ===============================================================
 * Author: Byte Me 2.0 Team
 * Date: 3/05/2019
 * Description:
 * This file will contain all the object classes in the program
 */

class Sprite { //base visual element of the game
    constructor(x, y, imgPath) {
        this.x = x; //x position
        this.y = y; //y position
        this.w = 32; //width
        this.h = 32; //height
        this.img = document.createElement("img"); //image object
        this.img.src = imgPath;
    }

    show(){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    distance(other){
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
}

class Tile extends Sprite{ //core maze graphical and functional component
    constructor(x, y, imgTag){
        let imgPath;
        let _collision;
        switch(imgTag){
            case 0: imgPath = "www/img/tilesets/ground.png"; //ground
                    _collision = false;
                    break;
            case 1: imgPath = "www/img/tilesets/wall.png"; //walls
                    _collision = true;
                    break;
            case 2: imgPath = "www/img/tilesets/portal.png"; //portals
                    _collision = false;
                    break;
            case 3: imgPath = "www/img/tilesets/heart.png"; //coin
                    _collision = false;
                    break;
            case 4: imgPath = "www/img/tilesets/end.png"; //end
                    _collision = false;
                    break;
            default: imgPath = "www/img/placeholder.png";
        }
        super(x, y, imgPath);
        this.collision = _collision;
        this.imgTag = imgTag;
    }

    isColliding(other, collision){
        let isColliding;
        isColliding = other.x >= this.x && other.x <= this.x + this.w;
        isColliding = isColliding && other.y >= this.y && other.y <= this.y + this.h;
        isColliding = isColliding || ((other.x + other.w >= this.x) && (other.x + other.w <= this.x + this.w)) && ((other.y + other.h >= this.y) && (other.y + other.h <= this.y + this.h));
        isColliding = isColliding || ((other.x + other.w >= this.x) && (other.x + other.w <= this.x + this.w)) && ((other.y >= this.y) && (other.y <= this.y + this.h));
        isColliding = isColliding || ((other.x >= this.x) && (other.x <= this.x + this.w)) && ((other.y + other.h >= this.y) && (other.y + other.h <= this.y + this.h));
        if(this.imgTag == 4 && isColliding){
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, 1120, 640);
                ctx.beginPath();
            if(currentMap == 3) {
                endRadius = 0;
                radiusExpand = 0;
                endMusic.loop = true;
                endMusic.play();
                clearInterval(gameFrame);
                clearInterval(messageInterval);
                setInterval(endScreen, 50);
                timer.style.display = 'none'
                alpha = 1;
            }
            else{
                currentMap++;
                if(currentMap == 2){
                    loadMap(map2);
                    player.x = 1 * 32
                    player.y = 3 * 32
                }
                else{
                    loadMap(map3);
                    player.x = 0 * 32
                    player.y = 6 * 32
                }

            }
        }
        return isColliding && collision;
     }
}

class Portal extends Tile{
    constructor(x, y, newX, newY){
        super(x, y, 2);
        this.newX = newX;
        this.newY = newY;
    }

    isColliding(other, _args){
        let isColliding = super.isColliding(other, true);
        if(isColliding)
            this.portal();
        return _args;
    }

    portal(){
        player.x = this.newX;
        player.y = this.newY;
    }

    show(){
        let img = document.createElement("img");
        img.src = "www/img/tilesets/ground.png";
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
        super.show();
    }
}

class Player extends Sprite{//class Player extends Sprite
    constructor(x, y){
        super(32 * x, 32 * y, "www/img/SpriteR.png");
        this.h = 25;
        this.w = 25;
    }
    show(){
        let playerImg = document.createElement("img");
        playerImg.src = "www/img/spritesheet.png";
        ctx.drawImage(playerImg, playerImgX, playerImgY, 32, 32, this.x, this.y, this.w, this.h);
    }
}

class Coin extends Tile{
    constructor(x, y){
        super(x, y, 3);
        this.isShowing = true;
    }
    isColliding(other, _args){
        let isColliding = super.isColliding(other, true);
        if(isColliding && this.isShowing){
            coins++;
            this.isShowing = false;
        }
    }

    show(){
        let img = document.createElement("img");
        img.src = "www/img/tilesets/ground.png";
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
        if(this.isShowing){
            super.show();
        }
    }

    searchForHelp(){
        bell.play();
        let gradient = ctx.createRadialGradient(this.x + 15, this.y+15, 20, this.x+15, this.y+15, 30);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, 'black');
        ctx.beginPath();
        ctx.arc(this.x+15, this.y+15, 1250, 0, 2 * Math.PI);
        ctx.fillStyle = gradient;
        ctx.fill();
        }
}
