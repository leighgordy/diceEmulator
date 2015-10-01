/*global Dice*/
'use strict';
function Coin() {

    var pattern = {
        'nodes' : [ {
            x : -50,
            y : -50,
            z : -1
        }, {
            x : -50,
            y : -50,
            z : 1
        }, {
            x : -50,
            y : 50,
            z : -1
        }, {
            x : -50,
            y : 50,
            z : 1
        }, {
            x : 50,
            y : -50,
            z : -1
        }, {
            x : 50,
            y : -50,
            z : 1
        }, {
            x : 50,
            y : 50,
            z : -1
        }, {
            x : 50,
            y : 50,
            z : 1
        } ],
        'sides' : [ {
            'id' : '1',
            'color' : 'red',
            'show'  :{x: 0, y: 0, z: 0},
            'edges' : [ [ 1, 3 ], [ 5, 7 ], [ 1, 5 ], [ 3, 7 ] ],
        },{
            'id' : '6',
            'color' : 'black',
            'show'  :{x: 180, y: 0, z: 0},
            'edges' : [ [ 0, 2 ], [ 0, 4 ], [ 6, 4 ], [ 6, 2 ] ],
        } ]
    };

    Dice.call(this, pattern); // call super constructor.

}

Coin.prototype = new Dice();

Dice.prototype.roll = function(){
    this.active = true;
    this.distance.x = Math.floor((Math.random() * this.MAX_DURATION) + 1);
    this.distance.y = Math.floor((Math.random() * this.MAX_DURATION) + 1);
    //this.distance.z = Math.floor((Math.random() * this.MAX_DURATION) + 1);
};
