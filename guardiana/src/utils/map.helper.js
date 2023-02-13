"use strict";
// run the following line form this directory
// tsc map.helper.ts 
// then run the following line from this directory
// node map.helper.js
exports.__esModule = true;
var startLocation = [33, 38]; // x y
var endLocation = [31, 38]; //x y
var updatedValue = 6;
// Example Map

var map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 6, 9, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 0, 9, 9, 0, 9, 9, 9, 9, 0, 0, 9, 9, 9, 0, 9, 9, 9, 9, 6, 9, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 0, 9, 9, 9, 9, 6, 0, 0, 0, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 9, 9, 0, 9, 9, 9, 9, 6, 0, 0, 0, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 6, 0, 9, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 9, 9, 9, 9, 6, 9, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 6, 0, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 6, 9, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 0, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 6, 9, 9, 9, 6, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 6, 9, 9, 9, 6, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 6, 9, 9, 9, 6, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 6, 9, 9, 9, 6, 6, 6, 9, 9, 0, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 9, 9, 9, 6, 9, 9, 9, 9, 9, 6, 9, 9, 0, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 9, 9, 9, 6, 9, 9, 9, 9, 6, 6, 9, 9, 0, 0, 0, 0, 0, 9, 0, 0, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 6, 6, 6, 6, 6, 9, 9, 9, 6, 9, 9, 6, 6, 0, 0, 0, 0, 0, 9, 0, 0, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 0, 9, 0, 9, 9, 9, 9, 9, 9, 6, 6, 9, 9, 9, 9, 9, 9, 9, 9, 6, 6, 6, 6, 6, 9, 9, 9, 6, 6, 6, 6, 6, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 6, 6, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 6, 6, 6, 6, 9, 6, 6, 6, 6, 6, 6, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 7, 9, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 6, 6, 9, 9, 6, 6, 6, 6, 6, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 0, 0, 6, 6, 9, 6, 6, 6, 6, 6, 6, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 7, 7, 7, 7, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 9, 9, 9, 9, 0, 6, 9, 9, 9, 6, 6, 6, 6, 6, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7, 9, 9, 0, 9, 9, 0, 9, 9, 0, 0, 9, 0, 9, 9, 0, 9, 9, 9, 9, 0, 6, 9, 9, 9, 6, 6, 6, 6, 6, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7, 7, 0, 0, 9, 0, 9, 9, 0, 9, 9, 0, 9, 9, 0, 0, 0, 0, 0, 0, 9, 9, 9, 6, 6, 6, 6, 6, 6, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7, 7, 0, 0, 9, 9, 9, 9, 9, 0, 9, 9, 0, 0, 9, 9, 0, 0, 9, 9, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 9, 9, 9, 9, 9, 0, 9, 9, 0, 0, 9, 9, 0, 0, 9, 9, 6, 6, 6, 6, 6, 6, 6, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 0, 9, 9, 0, 9, 7, 7, 9, 9, 0, 0, 0, 0, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 6, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9, 9, 9, 9, 0, 9, 7, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 9, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 6, 9, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 9, 9, 9, 0, 9, 7, 7, 7, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 9, 0, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 0, 0, 9, 0, 7, 7, 7, 9, 0, 9, 9, 9, 0, 9, 0, 9, 9, 0, 9, 9, 9, 0, 9, 9, 9, 0, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 9, 0, 9, 9, 9, 9, 9, 0, 0, 0, 0, 9, 9, 9, 0, 9, 9, 9, 0, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 9, 0, 0, 0, 9, 0, 9, 9, 9, 9, 0, 9, 9, 9, 0, 0, 9, 0, 0, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 9, 0, 0, 0, 9, 0, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 9, 6, 6, 6, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 6, 9, 9, 9, 0],
    [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,41,41,41,41,41,41, 9, 9, 9, 9, 6, 9, 9, 9, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
// the function!
var updatePoint = function () {
    var result = map;
    var x = startLocation[1];
    var y = startLocation[0];
    var xE = endLocation[1];
    var yE = endLocation[0];
    // the great filter
    console.log("y: ".concat(y, " > ").concat(map[0].length, ". yE: ").concat(yE));
    if (y < 0 || y > map[0].length || yE > map[0].length) {
        console.log('Error: unable to understand range of y.');
        return;
    }
    if (x < 0 || x > map.length || xE > map.length) {
        console.log('Error: unable to understand range of x.');
        return;
    }
    // fill in all values between x and x and y and y
    if (xE !== -1 && xE !== x) {
        // order the start and end from largest to smallest
        var start = xE < x ? xE : x;
        var end = xE > x ? xE : x;
        for (var i = end; i >= start; i--) {
            map[i][y] = updatedValue;
            console.log("x = ".concat(i));
            // in case my math is bad.
            if (i === -1) {
                return;
            }
            ;
        }
    }
    else if (yE !== -1 && yE !== y) {
        // order the start and end from largest to smallest
        var start = yE < y ? yE : y;
        var end = yE > y ? yE : y;
        for (var i = end; i >= start; i--) {
            map[x][i] = updatedValue;
            // in case my math is bad.
            if (i === -1) {
                return;
            }
            ;
        }
    }
    else {
        map[x][y] = updatedValue;
    }
    //console.table(result);
    console.log(result);
};
updatePoint();
