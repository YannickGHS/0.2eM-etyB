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
        var w = 32; //width
        var h = 32; //height
        var img = document.createElement("img"); //image object
        img.src = imgPath;
        this.show = function () {
            ctx.drawImage(img, x, y, w, h);
        };
    }
}

class Tile extends Sprite{ //core maze graphical and functional component
    constructor(x, y, imgTag){
        var imgPath;
        switch(imgTag){
            case 0: imgPath = "www/img/tilesets/grass.png";
            break;
            default: imgPath = "www/img/placeholder.png";
        }
        super(x, y, imgPath);
    }
}

//class Player extends Sprite