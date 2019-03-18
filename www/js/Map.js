/* ===================================================
 * Map.js
 * ===================================================
 * Author: Byte Me 2.0 Team
 * Date: 03/11/2019
 * Description:
 * This file contains all the functionality for the in game map
 */
var map1 = [ //map 1
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

Array.prototype.display = function(){
    for(i = 0; i < this.length; i++)
        for(j = 0; j < this[i].length; j++)
            this[i][j].show();
}

Array.prototype.collisionCheck = function(player){
    let result = false;
    for(i = 0; i < this.length; i++)
        for(j = 0; j < this[i].length; j++)
            result = this[i][j].isColliding(player);
    return result;
}

function loadMap(){
    tileMap = new Array(map1.length);
    tileMap = twoDArray(tileMap, map1.length);

    for(i = 0; i < tileMap.length; i++)
        for(j = 0; j < tileMap[i].length; j++)
            tileMap[i][j] = new Tile(32 * j, 32 * i, map1[i][j]);
    
}

function twoDArray(temp, x){ //generates a 2D array
    for(i = 0; i < temp.length; i++)
        temp[i] = new Array(x);
    return temp;
}