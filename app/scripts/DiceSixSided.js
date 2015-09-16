/*global Dice*/
'use strict';
function DiceSixSided(){

    var pattern = {
            'nodes': [ {
                x: -100,
                y: -100,
                z: -100
            }, {
                x: -100,
                y: -100,
                z: 100
            }, {
                x: -100,
                y: 100,
                z: -100
            }, {
                x: -100,
                y: 100,
                z: 100
            }, {
                x: 100,
                y: -100,
                z: -100
            }, {
                x: 100,
                y: -100,
                z: 100
            }, {
                x: 100,
                y: 100,
                z: -100
            }, {
                x: 100,
                y: 100,
                z: 100
            } ],
            'edges': [ [ 0, 1 ], [ 1, 3 ], [ 3, 2 ], [ 2, 0 ], [ 4, 5 ],
                    [ 5, 7 ], [ 7, 6 ], [ 6, 4 ], [ 0, 4 ], [ 1, 5 ], [ 2, 6 ],
                    [ 3, 7 ] ]
    };

    Dice.call(this, pattern); // call super constructor.

}

DiceSixSided.prototype = new Dice();
