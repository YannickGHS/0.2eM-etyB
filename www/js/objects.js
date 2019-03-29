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
}

class Tile extends Sprite{ //core maze graphical and functional component
    constructor(x, y, imgTag){
        let imgPath;
        let _collision;
        switch(imgTag){
            case 0: imgPath = "www/img/tilesets/ground.png"; //ground
                    _collision = false;
                    break;
            case 1: imgPath = "www/img/tilesets/wall.png"; //ealls
                    _collision = true;
                    break;
            case 2: imgPath = "www/img/tilesets/portal.png"; //portals
                    _collision = false;
                    break;
            case 3: imgPath = "www/img/placeholder.png"; //coin
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
        if(this.imgTag == 4 && isColliding){
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, 1120, 640);
                ctx.beginPath();
            if(currentMap == 3)
                console.log("END");
            else{
                currentMap++;
                if(currentMap == 2)
                    loadMap(map2);
                else
                    loadMap(map3);
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

    isColliding(other, collision){
        let isColliding = super.isColliding(other, true);
        if(isColliding)
            this.portal();
        return collision;
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
}
