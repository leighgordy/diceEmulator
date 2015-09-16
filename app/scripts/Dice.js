/**
 * Super Dice object, all dice extend this prototype. The Dice constructor with
 * pattern argument is not used by sub classes only by custom shapes and its
 * used in testing to ensure the methods function correctly.
 */
'use strict';
function Dice(customPattern) {

    // default pattern is a 200px line
    var defaultPattern = {
        'nodes': [ {
            x: -100,
            y: -100,
            z: -100
        }, {
            x: 100,
            y: 100,
            z: 100
        } ],
        'edges': [ [ 0, 1 ] ]
    };

    this.pattern = this.extend(defaultPattern, customPattern);
}

Dice.prototype.rotateZ = function(angle) {
    var sinT = Math.sin(angle);
    var cosT = Math.cos(angle);

    for (var n = 0; n < this.pattern.nodes.length; n++) {
        var x = this.pattern.nodes[n].x;
        var y = this.pattern.nodes[n].y;
        this.pattern.nodes[n].x = x * cosT - y * sinT;
        this.pattern.nodes[n].y = y * cosT + x * sinT;
    }
};

Dice.prototype.rotateY = function(angle) {
    var sinT = Math.sin(angle);
    var cosT = Math.cos(angle);

    for (var n = 0; n < this.pattern.nodes.length; n++) {
        var x = this.pattern.nodes[n].x;
        var z = this.pattern.nodes[n].z;
        this.pattern.nodes[n].x = x * cosT - z * sinT;
        this.pattern.nodes[n].z = z * cosT + x * sinT;
    }
};

Dice.prototype.rotateX = function(angle) {
    var sinT = Math.sin(angle);
    var cosT = Math.cos(angle);

    for (var n = 0; n < this.pattern.nodes.length; n++) {
        var y = this.pattern.nodes[n].y;
        var z = this.pattern.nodes[n].z;
        this.pattern.nodes[n].y = y * cosT - z * sinT;
        this.pattern.nodes[n].z = z * cosT + y * sinT;
    }
};

/**
 * Called by DiceEmulator
 */
Dice.prototype.animate = function(){
    this.rotateZ(0.05);
    this.rotateY(0.05);
    this.rotateX(0.05);
};

/*
 * Merges 2 Object literals into one. The second argument takes priority over
 * the first
 */
Dice.prototype.extend = function(defaults, options) {
    var newOptions = {};
    for ( var i in defaults)
        newOptions[i] = defaults[i];
    for ( var j in options)
        newOptions[j] = options[j];
    return newOptions;
};
