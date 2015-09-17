/*global DiceSixSided*/
'use strict';
function DiceEmulator(id, options) {

    this.activeDice = [];

    var defaults = {
        'canvasDefaultHeight': 500,
        'canvasDefaultWidth': 500
    };

    this.settings = this.extend(defaults, options);

    // setup
    this.target = this.getElementViaId(id);
    this.canvas = this.createCanvas(this.settings.canvasDefaultWidth,
            this.settings.canvasDefaultHeight);
    this.target.appendChild(this.canvas);
    this.canvasContext = this.retrieveContext(this.canvas);
    var dice = new DiceSixSided();
    this.activeDice.push({
        'dice': dice,
        'x': 250,
        'y': 250
    });

    this.animate();
}

DiceEmulator.prototype.animate = function() {
    var step = (function(draw, activeDice, canvasContext) {
        return function() {
            for (var i = 0; i < activeDice.length; i++) {
                activeDice[i].dice.animate(canvasContext, activeDice[i].x, activeDice[i].y);
            }
            window.requestAnimationFrame(step);

        };
    })(this.draw, this.activeDice, this.canvasContext);

    window.requestAnimationFrame(step);
};

DiceEmulator.prototype.retrieveContext = function(canvas) {
    if (canvas.getContext) {
        return canvas.getContext('2d');
    } else {
        throw new Error('The canvas context is not supported in this browser');
    }
};

DiceEmulator.prototype.createCanvas = function(width, height) {
    var diceCanvas = document.createElement('canvas');
    diceCanvas.setAttribute('class', 'diceCanvas');
    diceCanvas.width = width;
    diceCanvas.height = height;
    return diceCanvas;
};

DiceEmulator.prototype.getElementViaId = function(id) {
    var targetElement = document.getElementById(id);
    if (typeof (targetElement) !== 'undefined' && targetElement !== null) {
        return targetElement;
    } else {
        throw new Error('Could not locate target element with id: ' + id);
    }
};

/*
 * Merges 2 Object literals into one. The second argument takes priority over
 * the first
 */
DiceEmulator.prototype.extend = function(defaults, options) {
    var newOptions = {};
    for ( var i in defaults)
        newOptions[i] = defaults[i];
    for ( var j in options)
        newOptions[j] = options[j];
    return newOptions;
};
