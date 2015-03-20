function Circle(){
	createjs.Shape.call(this);
	
	this.setCircleType = function(type) {
		this._circleType = type;
		
		switch (type) {
		case Circle.TYPE_IDLE:
			this.setColor("gray");
			break;
		case Circle.TYPE_BLOCK:
			this.setColor("orange");
			break;
		case Circle.TYPE_VICKI:
			this.setColor("blue");
			break;
		}
	}
	
	this.setColor = function (colorString){
		this.graphics.beginFill(colorString);
		this.graphics.drawCircle(0,0,25);
		this.graphics.endFill();
	}
	this.getCircleType = function() {
		return this._circleType;
	}
	this.setCircleType(0);
}

Circle.prototype = new createjs.Shape();
Circle.TYPE_IDLE = 0;
Circle.TYPE_BLOCK = 1;
Circle.TYPE_VICKI = 2;
