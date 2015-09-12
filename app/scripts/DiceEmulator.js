function DiceEmulator (id, options){
    
    this.target = this.getElementViaId(id);
    
	var defaults ={
	        'canvasDefaultHeight':500,
	        'canvasDefaultWidth':500,
	};

	this.settings = this.extend(defaults, options);
}

DiceEmulator.prototype.getElementViaId = function(id) {
    var targetElement = document.getElementById(id);
    if (typeof(targetElement) !== 'undefined' && targetElement !== null){
        return targetElement;
    }
    else{
        throw new Error("Could not locate target element with id: "+ id);
    }
    
};


/*
 * Merges 2 Object literals into one. The second argument takes priority over the first 
 */
DiceEmulator.prototype.extend = function(defaults, options) {
	var newOptions = {};
	for(var key in defaults) newOptions[key] = defaults[key];
	for(var key in options) newOptions[key] = options[key];
    return newOptions;
};