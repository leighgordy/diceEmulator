/*global Dice*/
'use strict';
function DiceFourSided() {

    var pattern = {
        "nodes" : [ {
            "x" : 0,
            "y" : -35,
            "z" : -7
        }, {
            "x" : 0,
            "y" : 50,
            "z" : 35
        }, {
            "x" : 50,
            "y" : 50,
            "z" : -50
        }, {
            "x" : -50,
            "y" : 50,
            "z" : -50
        }, {
            "x" : -14,
            "y" : 20,
            "z" : -6
        }, {
            "x" : 0,
            "y" : 20,
            "z" : -35
        }, {
            "x" : 14,
            "y" : 20,
            "z" : -5
        }, {
            "x" : 0,
            "y" : 50,
            "z" : -25
        } ],
        "sides" : [ {
            "id" : "2",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 0, 3 ], [ 3, 4 ], [ 4, 0 ] ]
        }, {
            "id" : "1",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 0, 4 ], [ 4, 1 ], [ 1, 0 ] ]
        }, {
            "id" : "4",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 3, 4 ], [ 4, 1 ], [ 1, 3 ] ]
        }, {
            "id" : "3",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 0, 5 ], [ 5, 3 ], [ 3, 0 ] ]
        }, {
            "id" : "1",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 0, 5 ], [ 5, 2 ], [ 2, 0 ] ]
        }, {
            "id" : "4",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 2, 5 ], [ 5, 3 ], [ 3, 2 ] ]
        }, {
            "id" : "2",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 0, 6 ], [ 6, 2 ], [ 2, 0 ] ]
        }, {
            "id" : "3",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 0, 6 ], [ 6, 1 ], [ 1, 0 ] ]
        }, {
            "id" : "4",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 6, 2 ], [ 2, 1 ], [ 1, 6 ] ]
        }, {
            "id" : "3",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 3, 2 ], [ 2, 7 ], [ 7, 3 ] ]
        }, {
            "id" : "2",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 2, 1 ], [ 1, 7 ], [ 7, 2 ] ]
        }, {
            "id" : "1",
            "color" : "green",
            'show'  :{x: 0, y: 0, z: 0},
            "edges" : [ [ 3, 7 ], [ 7, 1 ], [ 1, 3 ] ]
        } ]
    };

    Dice.call(this, pattern); // call super constructor.

}

DiceFourSided.prototype = new Dice();
