/*global Dice*/
'use strict';
function DiceFourSided() {

    var pattern = {
        'nodes' : [{
            x : 0,
            y : -50,
            z : 0
        }, {
            x : 50,
            y : 50,
            z : 50
        }, {
            x : -50,
            y : 50,
            z : 50
        }, {
            x : 0,
            y : 50,
            z : -50
        }],
        'sides' : [ 
                   {
                       'id' : '1',
                       'color' : 'green',
                       'show'  :{x: 0, y: 0, z: 0},
                       'edges' : [ [ 0, 1 ], [ 1, 2 ]],
                   },{
                       'id' : '2',
                       'color' : 'green',
                       'show'  :{x: 0, y: 270, z: 0},
                       'edges' : [ [ 2, 3 ], [ 0, 2 ]],
                   },{
                       'id' : '3',
                       'color' : 'green',
                       'show'  :{x: 0, y: 90, z: 0},
                       'edges' : [ [ 0, 3 ], [ 3, 1 ]],
                   },
                   {
                       'id' : '4',
                       'color' : 'green',
                       'show'  :{x: 90, y: 0, z: 0},
                       'edges' : [ [ 1, 2 ], [ 2, 3 ]],
                   }]
    };

    Dice.call(this, pattern); // call super constructor.

}

DiceFourSided.prototype = new Dice();
