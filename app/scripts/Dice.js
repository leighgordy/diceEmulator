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
 * Renders the next step in the animation by calculating its positioning and then drawing it to the canvas
 * @param context : canvas context to be drawn to
 * @param x
 * @param y
 */
Dice.prototype.animate = function(context, x, y){
    this.rotateZ(0.01);
    this.rotateY(0.01);
    this.rotateX(0.00);
    this.draw(context, x, y);
};

/**
 * Draws the dice onto the canvas at the given x, y coordinates
 * @param context : canvas context to be drawn to
 * @param x
 * @param y
 */
Dice.prototype.draw = function(context, x, y){
    
    // sort display order 
    this.pattern.sides.sort((function(dicePlugin){
        return function(sideA, sideB){
            var zIndexA = dicePlugin.averageSideZindex(sideA);
            var zIndexB = dicePlugin.averageSideZindex(sideB);
            return  zIndexA - zIndexB 
        };
    })(this))
    
    context.clearRect(0, 0, 500, 500);
    for(var i =0; i < this.pattern.sides.length; i++){
        context.beginPath();
        var from = this.pattern.nodes[this.pattern.sides[i][0][0]];
        var too = this.pattern.nodes[this.pattern.sides[i][0][1]];
        context.moveTo(x + from.x, y + from.y);
        context.lineTo(x + too.x, y + too.y);
        for(var j =1; j < this.pattern.sides[i].length; j++){
            var from = this.pattern.nodes[this.pattern.sides[i][j][0]];
            var too = this.pattern.nodes[this.pattern.sides[i][j][1]];
            context.lineTo(x + from.x, y + from.y);
            context.lineTo(x + too.x, y + too.y);
        }
        context.strokeStyle = '#000';
        context.stroke();
        context.fillStyle="#FF0000";
        context.fill();
    } 
};

/**
 * Returns an average zIndex for a side. This allows sides to be organized that sides that are further away are rendered first avoiding overlapping
 */
Dice.prototype.averageSideZindex = function(side){
    var zIndex = 0;
    for(var i =1; i < side.length; i++){
        var from = this.pattern.nodes[side[i][0]].z;
        var too = this.pattern.nodes[side[i][1]].z;
        zIndex = zIndex + from + too;
    }
    return zIndex / ( side.length * 2);
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
