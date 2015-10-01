/**
 * Super Dice object, all dice extend this prototype. The Dice constructor with
 * pattern argument is not used by sub classes only by custom shapes and its
 * used in testing to ensure the methods function correctly.
 */
'use strict';
function Dice(customPattern) {
    
    // constants
    this.DICE_SPEED = 10;
    this.MAX_DURATION = 300;
    
    this.active = false;
    
    this.distance ={x: 0, y: 0, z: 0} ; // The distance in animation frames the dice should travel 

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

    if(customPattern !== undefined){
        this.resetInitialiseDice();
    }
    
}

// used to setup and reset the dice 
Dice.prototype.resetInitialiseDice = function(angle) {
    this.activeSides = JSON.parse(JSON.stringify(this.pattern.sides));
    this.activeNodes = JSON.parse(JSON.stringify(this.pattern.nodes));
}

Dice.prototype.rotateZ = function(angle) {
    
    var radians = angle * Math.PI / 180; 
    
    var sinT = Math.sin(radians);
    var cosT = Math.cos(radians);

    for (var n = 0; n < this.activeNodes.length; n++) {
        var x = this.activeNodes[n].x;
        var y = this.activeNodes[n].y;
        this.activeNodes[n].x = x * cosT - y * sinT;
        this.activeNodes[n].y = y * cosT + x * sinT;
    }
    
    for (var l = 0; l < this.activeSides.length; l++) {
        if(typeof this.activeSides[l].graphic !== "undefined" ){
            for (var m = 0; m < this.activeSides[l].graphic.length; m++) {
                for (var n = 0; n < this.activeSides[l].graphic[m].length; n++) {
                    var x = this.activeSides[l].graphic[m][n].x;
                    var y = this.activeSides[l].graphic[m][n].y;
                    this.activeSides[l].graphic[m][n].x = x * cosT - y * sinT;
                    this.activeSides[l].graphic[m][n].y = y * cosT + x * sinT;
                }
            }
        }
    }
};

Dice.prototype.rotateY = function(angle) {
    var radians = angle * Math.PI / 180; 
    
    var sinT = Math.sin(radians);
    var cosT = Math.cos(radians);

    for (var n = 0; n < this.activeNodes.length; n++) {
        var x = this.activeNodes[n].x;
        var z = this.activeNodes[n].z;
        this.activeNodes[n].x = x * cosT - z * sinT;
        this.activeNodes[n].z = z * cosT + x * sinT;
    }
    
    for (var l = 0; l < this.activeSides.length; l++) {
        if(typeof this.activeSides[l].graphic !== "undefined" ){
            for (var m = 0; m < this.activeSides[l].graphic.length; m++) {
                for (var n = 0; n < this.activeSides[l].graphic[m].length; n++) {
                    var x = this.activeSides[l].graphic[m][n].x;
                    var z = this.activeSides[l].graphic[m][n].z;
                    this.activeSides[l].graphic[m][n].x = x * cosT - z * sinT;
                    this.activeSides[l].graphic[m][n].z = z * cosT + x * sinT;
                }
            }
        }
    }
   
};

Dice.prototype.rotateX = function(angle) {
    var radians = angle * Math.PI / 180; 
    
    var sinT = Math.sin(radians);
    var cosT = Math.cos(radians);

    for (var n = 0; n < this.activeNodes.length; n++) {
        var y = this.activeNodes[n].y;
        var z = this.activeNodes[n].z;
        this.activeNodes[n].y = y * cosT - z * sinT;
        this.activeNodes[n].z = z * cosT + y * sinT;
    }
    
    for (var l = 0; l < this.activeSides.length; l++) {
        if(typeof this.activeSides[l].graphic !== "undefined" ){
            for (var m = 0; m < this.activeSides[l].graphic.length; m++) {
                for (var n = 0; n < this.activeSides[l].graphic[m].length; n++) {
                    var y = this.activeSides[l].graphic[m][n].y;
                    var z = this.activeSides[l].graphic[m][n].z;
                    this.activeSides[l].graphic[m][n].y = y * cosT - z * sinT;
                    this.activeSides[l].graphic[m][n].z = z * cosT + y * sinT;
                }
            }
        }
    }
};


Dice.prototype.roll = function(){
    this.active = true;
    this.distance.x = Math.floor((Math.random() * this.MAX_DURATION) + 1);
    this.distance.y = Math.floor((Math.random() * this.MAX_DURATION) + 1);
    this.distance.z = Math.floor((Math.random() * this.MAX_DURATION) + 1);
};

/**
 * Renders the next step in the animation by calculating its positioning and then drawing it to the canvas
 * @param context : canvas context to be drawn to
 * @param x
 * @param y
 */
Dice.prototype.animate = function(context, x, y){
    
    if(this.distance.x > 0){
        this.distance.x--;
        this.rotateX(this.DICE_SPEED);
    }  
    if(this.distance.y > 0){
        this.distance.y--;
        this.rotateY(this.DICE_SPEED);
    }  
    if(this.distance.z > 0){
        this.distance.z--;
        this.rotateZ(this.DICE_SPEED);
    }  

    if(this.active === true && this.distance.x === 0 && this.distance.y === 0 && this.distance.z ===0){
        this.active = false;
        setTimeout((function(plugin){
            return function(){ 
                plugin.showSide(); 
            }
        })(this), 2000);
                
        
    }
    this.draw(context, x, y);
};

Dice.prototype.showSide = function(){
    var sideId =this.mostVisibleSide();
    console.log(sideId);
    this.resetInitialiseDice();
    
    for(var i = 0; i < this.activeSides.length; i++){
        if(this.activeSides[i].id === sideId){
            this.rotateX(this.activeSides[i].show.x);
            this.rotateY(this.activeSides[i].show.y);
            this.rotateZ(this.activeSides[i].show.z);
            break;
        }
    }
}

Dice.prototype.mostVisibleSide = function(){
    if(this.activeSides.length === 0){
        return 0;
    }
    else{
        return this.activeSides[this.activeSides.length-1].id;
    }
}

/**
 * Draws the dice onto the canvas at the given x, y coordinates
 * @param context : canvas context to be drawn to
 * @param x
 * @param y
 */
Dice.prototype.draw = function(context, x, y){
    
    // sort display order 
    this.activeSides.sort((function(dicePlugin){
        return function(sideA, sideB){
            var zIndexA = dicePlugin.averageSideZindex(sideA.edges);
            var zIndexB = dicePlugin.averageSideZindex(sideB.edges);
            return  zIndexA - zIndexB 
        };
    })(this))
    
    for(var i =0; i < this.activeSides.length; i++){
        
        context.beginPath();
        var from = this.activeNodes[this.activeSides[i].edges[0][0]];
        var too = this.activeNodes[this.activeSides[i].edges[0][1]];
        context.moveTo(x + from.x, y + from.y);
        context.lineTo(x + too.x, y + too.y);
        for(var j =1; j < this.activeSides[i].edges.length; j++){
            var from = this.activeNodes[this.activeSides[i].edges[j][0]];
            var too = this.activeNodes[this.activeSides[i].edges[j][1]];
            context.lineTo(x + from.x, y + from.y);
            context.lineTo(x + too.x, y + too.y);
        }
        context.strokeStyle = '#000';
        context.stroke();
        context.fillStyle=this.activeSides[i].color;
        context.fill();
        
        if(typeof this.activeSides[i].graphic !== "undefined" ){
            for(var k =0; k < this.activeSides[i].graphic.length; k++){
                context.beginPath();
                var sideGraphic = this.activeSides[i].graphic[k];
                
                context.moveTo(x + sideGraphic[0].x, y + sideGraphic[0].y);
                for(var j =1; j < sideGraphic.length; j++){
                    context.lineTo(x + sideGraphic[j].x, y + sideGraphic[j].y);
                }
                context.lineTo(x + sideGraphic[0].x, y + sideGraphic[0].y);
                context.strokeStyle = '#000';
                context.stroke();
                context.fillStyle='#fff';
                context.fill();
            }
        }
        
    } 
    
    
    for(var l = 0; l < this.activeNodes.length; l++){
        context.fillStyle='blue';
        context.fillRect(x +this.activeNodes[l].x,y +this.activeNodes[l].y, 5, 5);
        this.writeLabel(context, x +this.activeNodes[l].x, y +this.activeNodes[l].y, "node-"+l);
    }
    
    
    
};

Dice.prototype.writeLabel = function (context, x, y, text){
    context.font = "12px Arial";
    context.fillStyle = "red";
    context.fillText(text, x, y);
}

/**
 * Returns an average zIndex for a side. This allows sides to be organized that sides that are further away are rendered first avoiding overlapping
 */
Dice.prototype.averageSideZindex = function(edges){
    var zIndex = 0;
    for(var i =1; i < edges.length; i++){
        var from = this.activeNodes[edges[i][0]].z;
        var too = this.activeNodes[edges[i][1]].z;
        zIndex = zIndex + from + too;
    }
    return zIndex / ( edges.length * 2);
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
