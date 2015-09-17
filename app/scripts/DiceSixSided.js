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
            'sides':[[[ 4, 5 ], [ 5, 7 ], [ 7, 6 ], [ 6, 4 ]],
                     [[ 0, 1 ], [ 1, 3 ], [ 3, 2 ], [ 2, 0 ]],
                     [[ 0, 1 ], [ 4, 5 ], [ 0, 4 ], [ 1, 5 ]],
                     [[ 1, 3 ], [ 5, 7 ], [ 1, 5 ],  [ 3, 7 ]],
                     [[ 3, 2 ], [ 3, 7 ], [ 6, 7 ], [ 6, 2 ]],
                     [[ 0, 2 ], [ 0, 4 ], [ 6, 4 ],  [ 6, 2 ]]
            ]
    };

    Dice.call(this, pattern); // call super constructor.

}

DiceSixSided.prototype = new Dice();
