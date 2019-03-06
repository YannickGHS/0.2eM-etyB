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
    constructor(x, y, type){
        let imagePath;
        switch(type){
            case 0: imagePath = ¨¨; //enter the path of the image
                brake;
            default: imagePath = ¨www\img\placeholder.png¨;
                brake;
        }
    }
}

//class Player extends Sprite
