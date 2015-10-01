/*global DiceSixSided*/
'use strict';
function DiceEmulator(id, options) {

    this.activeDice = [];
    this.animationRequest = null;
    var defaults = {
        'introImage': 'images/dice.jpg',
        'introText': "Welcome to Dice Emulator 0.1",
        'canvasDefaultHeight': 500
    };

    this.settings = this.extend(defaults, options);

    this.init(id);

    this.adjustForCanvasResize();
}

DiceEmulator.prototype.init = function(id){
    // setup
    this.target = this.getElementViaId(id);
    var parentWidth = this.target.offsetWidth;
    this.canvas = this.createCanvas(parentWidth,
            this.settings.canvasDefaultHeight);
    this.target.appendChild(this.canvas);
    this.canvasContext = this.retrieveContext(this.canvas);
    
    window.onresize = (function(diceEmulator){
        return function(){
            diceEmulator.adjustForCanvasResize();
        };
    })(this);
}

/**
 * Factory method used to add dice of type format to the dice collection
 * @param format
 */
DiceEmulator.prototype.addDice = function(format){
    var dice = null;
    switch (format) {
    case 2:
        dice = new Coin();
        break;
    case 4:
        dice = new DiceFourSided();
        break;
    case 6:
        dice = new DiceSixSided();
        break;
    case 8:
        dice = null;
        break;
    case 10:
        dice = null;
        break;
    case 12:
        dice = null;
        break;
    case 20:
        dice = null;
        break;
    }
    if(dice !== null){
        this.activeDice.push({
            'dice': dice,
            'x': 0,
            'y': 0
        });
        this. updateDicePositioning();
        if(this.animationRequest === null){
            this.animate();
        }
    }
    else{
        if(this.activeDice.length ===0){
            this.splashScreen();
        }
        alert(format + ' sided dice not supported yet!');
    }
}

/**
 * remove last dice that was added
 */
DiceEmulator.prototype.updateDicePositioning = function(){
    if(this.activeDice.length > 0){
        var row = 0;
        var col = -1;
        var xOffSet = 85;
        var yOffSet = 100;
        
        var positionsX = Math.floor((this.canvas.width - xOffSet) / 175); 
        for(var i = 0; i < this.activeDice.length; i++){
            if(positionsX === col){
                row++;
                col=0;
            }
            else{
                col++;
            }
            
            this.activeDice[i].x = xOffSet + (175 * col);
            this.activeDice[i].y = yOffSet + (row * 175);
        }
        var newHeight = 200 + (200 * row );
        this.canvas.height = newHeight > this.settings.canvasDefaultHeight ? newHeight : this.settings.canvasDefaultHeight;
    }
}

/**
 * remove last dice that was added
 */ 
DiceEmulator.prototype.removeDice = function(){
    if(this.activeDice.length > 0){
        this.activeDice.pop();
        if(this.activeDice.length === 0){
            this.splashScreen();
        }
        else{
            this. updateDicePositioning();
        }
    }
}

DiceEmulator.prototype.adjustForCanvasResize = function(){
    var parentWidth = this.target.offsetWidth;
    this.canvas.width = parentWidth;
    this.splashScreen();
}

/**
 * Intro Screen used by dice emulator
 */
DiceEmulator.prototype.splashScreen = function() {
    this.cancelAnimation();
    var img = new Image();
    img.onload = (function(diceEmulator){
            return function(){
                diceEmulator.canvasContext.clearRect(0, 0, diceEmulator.canvas.width, diceEmulator.canvas.height);
                var width =  diceEmulator.canvas.width;
                var height = diceEmulator.canvas.height;
                
                var imageX = (width - img.width)/2;
                var imageY = (height - img.height)/3;
                
                diceEmulator.canvasContext.drawImage(img,imageX, imageY);
                
                var textY = imageY + img.height + 60;
                var textX = width /2;
                diceEmulator.canvasContext.fillStyle = '#000';
                diceEmulator.canvasContext.textAlign = 'center';
                diceEmulator.canvasContext.font = "30px Arial";
                diceEmulator.canvasContext.fillText(diceEmulator.settings.introText,textX,textY);
            };
    })(this);
    img.src = this.settings.introImage;

}

DiceEmulator.prototype.cancelAnimation = function() {
    if(this.animationRequest !== null){
        window.cancelAnimationFrame(this.animationRequest);
        this.animationRequest = null;
    }
};

DiceEmulator.prototype.animate = function() {
    var step = (function(draw, activeDice, canvasContext, canvas) {
        return function() {
            canvasContext.clearRect(0, 0, canvas.width, canvas.height, diceEmulator);
            for (var i = 0; i < activeDice.length; i++) {
                activeDice[i].dice.animate(canvasContext, activeDice[i].x, activeDice[i].y);
            }
            diceEmulator.animationRequest = window.requestAnimationFrame(step);

        };
    })(this.draw, this.activeDice, this.canvasContext, this.canvas, this);

    this.animationRequest = window.requestAnimationFrame(step);
};


DiceEmulator.prototype.roll = function(){
    for(var i = 0; i < this.activeDice.length; i++){
        this.activeDice[i].dice.roll();
    }
}

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
