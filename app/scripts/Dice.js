/**
 * Super Dice object, all dice extend this prototype. The Dice constructor with
 * pattern argument is not used by sub classes only by custom shapes and its
 * used in testing to ensure the methods function correctly.
 */
'use strict';
function Dice(customPattern) {
    
    // constants
    this.DICE_SPEED = 10;
    this.MAX_DURATION = 500;
    
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
    
    if(customPattern !== undefined){
        this.originalPattern = JSON.parse(JSON.stringify(customPattern));
    }
    this.pattern = this.extend(defaultPattern, customPattern);
    
    // anchor is used to reset the pattern to its default state
    this.anchor = {
        x:this.pattern.nodes[0].x,
        y:this.pattern.nodes[0].y,
        z:this.pattern.nodes[0].z
    }
}

Dice.prototype.rotateZ = function(angle) {
    
    var radians = angle * Math.PI / 180; 
    
    var sinT = Math.sin(radians);
    var cosT = Math.cos(radians);

    for (var n = 0; n < this.pattern.nodes.length; n++) {
        var x = this.pattern.nodes[n].x;
        var y = this.pattern.nodes[n].y;
        this.pattern.nodes[n].x = x * cosT - y * sinT;
        this.pattern.nodes[n].y = y * cosT + x * sinT;
    }
    
    for (var l = 0; l < this.pattern.sides.length; l++) {
        if(typeof this.pattern.sides[l].graphic !== "undefined" ){
            for (var m = 0; m < this.pattern.sides[l].graphic.length; m++) {
                for (var n = 0; n < this.pattern.sides[l].graphic[m].length; n++) {
                    var x = this.pattern.sides[l].graphic[m][n].x;
                    var y = this.pattern.sides[l].graphic[m][n].y;
                    this.pattern.sides[l].graphic[m][n].x = x * cosT - y * sinT;
                    this.pattern.sides[l].graphic[m][n].y = y * cosT + x * sinT;
                }
            }
        }
    }
};

Dice.prototype.rotateY = function(angle) {
    var radians = angle * Math.PI / 180; 
    
    var sinT = Math.sin(radians);
    var cosT = Math.cos(radians);

    for (var n = 0; n < this.pattern.nodes.length; n++) {
        var x = this.pattern.nodes[n].x;
        var z = this.pattern.nodes[n].z;
        this.pattern.nodes[n].x = x * cosT - z * sinT;
        this.pattern.nodes[n].z = z * cosT + x * sinT;
    }
    
    for (var l = 0; l < this.pattern.sides.length; l++) {
        if(typeof this.pattern.sides[l].graphic !== "undefined" ){
            for (var m = 0; m < this.pattern.sides[l].graphic.length; m++) {
                for (var n = 0; n < this.pattern.sides[l].graphic[m].length; n++) {
                    var x = this.pattern.sides[l].graphic[m][n].x;
                    var z = this.pattern.sides[l].graphic[m][n].z;
                    this.pattern.sides[l].graphic[m][n].x = x * cosT - z * sinT;
                    this.pattern.sides[l].graphic[m][n].z = z * cosT + x * sinT;
                }
            }
        }
    }
   
};

Dice.prototype.rotateX = function(angle) {
    var radians = angle * Math.PI / 180; 
    
    var sinT = Math.sin(radians);
    var cosT = Math.cos(radians);

    for (var n = 0; n < this.pattern.nodes.length; n++) {
        var y = this.pattern.nodes[n].y;
        var z = this.pattern.nodes[n].z;
        this.pattern.nodes[n].y = y * cosT - z * sinT;
        this.pattern.nodes[n].z = z * cosT + y * sinT;
    }
    
    for (var l = 0; l < this.pattern.sides.length; l++) {
        if(typeof this.pattern.sides[l].graphic !== "undefined" ){
            for (var m = 0; m < this.pattern.sides[l].graphic.length; m++) {
                for (var n = 0; n < this.pattern.sides[l].graphic[m].length; n++) {
                    var y = this.pattern.sides[l].graphic[m][n].y;
                    var z = this.pattern.sides[l].graphic[m][n].z;
                    this.pattern.sides[l].graphic[m][n].y = y * cosT - z * sinT;
                    this.pattern.sides[l].graphic[m][n].z = z * cosT + y * sinT;
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
    this.pattern = JSON.parse(JSON.stringify(this.originalPattern));
    
    for(var i = 0; i < this.pattern.sides.length; i++){
        if(this.pattern.sides[i].id === sideId){
            this.rotateX(this.pattern.sides[i].show.x);
            this.rotateY(this.pattern.sides[i].show.y);
            this.rotateZ(this.pattern.sides[i].show.z);
            break;
        }
    }
}

Dice.prototype.mostVisibleSide = function(){
    return this.pattern.sides[this.pattern.sides.length-1].id;
}

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
            var zIndexA = dicePlugin.averageSideZindex(sideA.edges);
            var zIndexB = dicePlugin.averageSideZindex(sideB.edges);
            return  zIndexA - zIndexB 
        };
    })(this))
    
    for(var i =0; i < this.pattern.sides.length; i++){
        
        context.beginPath();
        var from = this.pattern.nodes[this.pattern.sides[i].edges[0][0]];
        var too = this.pattern.nodes[this.pattern.sides[i].edges[0][1]];
        context.moveTo(x + from.x, y + from.y);
        context.lineTo(x + too.x, y + too.y);
        for(var j =1; j < this.pattern.sides[i].edges.length; j++){
            var from = this.pattern.nodes[this.pattern.sides[i].edges[j][0]];
            var too = this.pattern.nodes[this.pattern.sides[i].edges[j][1]];
            context.lineTo(x + from.x, y + from.y);
            context.lineTo(x + too.x, y + too.y);
        }
        context.strokeStyle = '#000';
        context.stroke();
        context.fillStyle=this.pattern.sides[i].color;
        context.fill();
        
        if(typeof this.pattern.sides[i].graphic !== "undefined" ){
            for(var k =0; k < this.pattern.sides[i].graphic.length; k++){
                context.beginPath();
                var sideGraphic = this.pattern.sides[i].graphic[k];
                
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
    
};

/**
 * Returns an average zIndex for a side. This allows sides to be organized that sides that are further away are rendered first avoiding overlapping
 */
Dice.prototype.averageSideZindex = function(edges){
    var zIndex = 0;
    for(var i =1; i < edges.length; i++){
        var from = this.pattern.nodes[edges[i][0]].z;
        var too = this.pattern.nodes[edges[i][1]].z;
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
