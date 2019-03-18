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
            default: imgPath = "www/img/placeholder.png";
        }
        super(x, y, imgPath);
        this.collision = _collision;
    }

    isColliding(other){
        let isColliding = other.x >= this.x && other.x <= this.x + this.w;
        isColliding = isColliding && other.y >= this.y && other.y <= this.y + this.h;
        return isColliding && this.collision;
    }
}

class Player extends Sprite{//class Player extends Sprite
    constructor(x, y){
        super(x, y, "www/img/placeholder.png");
        
    }
}