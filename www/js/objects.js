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
            case 0: imgPath = "www/img/tilesets/grass.png";
                    _collision = false;
                    break;
            case 1: imgPath = "www/img/tilesets/grass.png";
                    _collision = true;
                    break;
            case 2: imgPath = "www/img/tilesets/portal.png";
                    _collision = false;
                    break;
            default: imgPath = "www/img/placeholder.png";
        }
        super(x, y, imgPath);
        this.collision = _collision;
    }

    isColliding(other, collision){
        let isColliding;
        isColliding = other.x >= this.x && other.x <= this.x + this.w;
        isColliding = isColliding && other.y >= this.y && other.y <= this.y + this.h;
        isColliding = isColliding || ((other.x + other.w >= this.x) && (other.x + other.w <= this.x + this.w)) && ((other.y + other.h >= this.y) && (other.y + other.h <= this.y + this.h));
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
        img.src = "www/img/tilesets/grass.png";
        ctx.drawImage(img, this.x, this.y, this.w, this.h);
        super.show();
    }
}

class Player extends Sprite{//class Player extends Sprite
    constructor(x, y){
        super(x, y, "www/img/placeholder.png");
        
    }
}