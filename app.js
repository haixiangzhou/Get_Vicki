var stage = new createjs.Stage("gameView");

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);

var gameView = new createjs.Container();
gameView.x = 30;
gameView.y = 30;
stage.addChild(gameView);

var circleArr = [[],[],[],[],[],[],[],[],[]];
var currentV;
var MOVE_NONE=-1, MOVE_LEFT=0, MOVE_UP_LEFT=1, MOVE_UP_RIGHT=2, MOVE_RIGHT=3, MOVE_DOWN_RIGHT=4, MOVE_DOWN_LEFT=5;

function getMoveDir(vicki) {
	var can = true;
	var distanceMap=[];
	
	//left
	for (var x = vicki.indexX; x>=0; x--) {
		if (circleArr[x][vicki.indexY].getCircleType() == Circle.TYPE_BLOCK) {
			can =false;
			distanceMap[MOVE_LEFT] = vicki.indexX-x;
			break;
		}
	}
	if (can) {
		return MOVE_LEFT;
	}
	
	//up left
	can =true;
	var x=vicki.indexX, y=vicki.indexY;
	while (true) {
		if (circleArr[x][y].getCircleType() == Circle.TYPE_BLOCK) {
			can = false;
			distanceMap[MOVE_UP_LEFT] = vicki.indexY-y;
			break;
		}
		if (y%2 == 0) {
			x--;
		}
		y--;
		if (y<0 || x<0) {
			break;
		}
	}
	if (can) {
		return MOVE_UP_LEFT;
	}
	
	//up right
	can = true;
	var x=vicki.indexX, y=vicki.indexY;
	while (can) {
		if (circleArr[x][y].getCircleType() == Circle.TYPE_BLOCK) {
			can = false;
			distanceMap[MOVE_UP_RIGHT] = vicki.indexY-y;
		}
		if (y%2 == 1) {
			x++;
		}
		y--;
		if (x>8 || y<0) {
			can =false;
		}
	}
	if (can) {
		return MOVE_UP_RIGHT;
	}
	
	//right
	can = true;
	var x=vicki.indexX, y=vicki.indexY;
	while (can) {
		if (circleArr[x][vicki.indexY].getCircleType() == Circle.TYPE_BLOCK) {
			can = false;
			distanceMap[MOVE_RIGHT] = x-vicki.indexX;
		}
		x++;
		if (x>8) {
			can = false;
		}
	}
	if (can) {
		return MOVE_RIGHT;
	}
	
	//down right
	can = true;
	var x=vicki.indexX, y=vicki.indexY;
	while (can) {
		if (circleArr[x][y].getCircleType() == Circle.TYPE_BLOCK) {
			can = false;
			distanceMap[MOVE_DOWN_RIGHT] = y-vicki.indexY;
		}
		if (y%2 == 1) {
			x++;
		}
		y++;
		if (x>8 || y>8) {
			can = false;
		}
	}
	if (can) {
		return MOVE_DOWN_RIGHT;
	}
	
	//down left
	can = true;
	var x=vicki.indexX, y=vicki.indexY;
	while (can) {
		if (circleArr[x][y].getCircleType() == Circle.TYPE_BLOCK) {
			can = false;
			distanceMap[MOVE_DOWN_LEFT] = y-vicki.indexY;
		}
		if (y%2 == 0) {
			x--;
		}
		y++;
		if (x<0 || y>8) {
			can = false;
		}
	}
	if (can) {
		return MOVE_DOWN_LEFT;
	}
	
	var maxDir=-1, maxValue=-1;
	for (var dir = 0; dir<distanceMap.length; dir++) {
		if (distanceMap[dir]>maxValue) {
			maxValue = distanceMap[dir];
			maxDir = dir;
		}
	}
	if (maxValue>1) {
		return maxDir;
	}else {
		return MOVE_NONE;
	}
}


function circleClicked(event) {
	if (event.target.getCircleType() != Circle.TYPE_VICKI) {
		event.target.setCircleType(Circle.TYPE_BLOCK);
	}
	else {
		return;
	}
	
	if (currentV.indexX == 0 || currentV.indexX ==8 || currentV.indexY == 0 || currentV.indexY ==8) {
		alert("Game Over! Vicki got away!");
		return;
	}
	
	var dir = getMoveDir(currentV);
	alert(dir);
	switch (dir) {
		case MOVE_LEFT:
			currentV.setCircleType(Circle.TYPE_IDLE);
			currentV = circleArr[currentV.indexX-1][currentV.indexY];
			currentV.setCircleType(Circle.TYPE_VICKI);
			break;
		case MOVE_UP_LEFT:
			currentV.setCircleType(Circle.TYPE_IDLE);
			currentV = circleArr[currentV.indexY%2?currentV.indexX:currentV.indexX-1][currentV.indexY-1];
			currentV.setCircleType(Circle.TYPE_VICKI);
			break;
		case MOVE_UP_RIGHT:
			currentV.setCircleType(Circle.TYPE_IDLE);
			currentV = circleArr[currentV.indexY%2?currentV.indexX+1:currentV.indexX][currentV.indexY-1];
			currentV.setCircleType(Circle.TYPE_VICKI);
			break;
		case MOVE_RIGHT:
			currentV.setCircleType(Circle.TYPE_IDLE);
			currentV = circleArr[currentV.indexX+1][currentV.indexY];
			currentV.setCircleType(Circle.TYPE_VICKI);
			break;
		case MOVE_DOWN_RIGHT:
			currentV.setCircleType(Circle.TYPE_IDLE);
			currentV = circleArr[currentV.indexY%2?currentV.indexX+1:currentV.indexX][currentV.indexY+1];
			currentV.setCircleType(Circle.TYPE_VICKI);
			break;
		case MOVE_DOWN_LEFT:
			currentV.setCircleType(Circle.TYPE_IDLE);
			currentV = circleArr[currentV.indexY%2?currentV.indexX:currentV.indexX-1][currentV.indexY+1];
			currentV.setCircleType(Circle.TYPE_VICKI);
			break;
		default:
			alert("You Won! Got Vicki!!");
	}

}

function addCircles() {
	for (var indexY = 0;  indexY < 9; indexY++) {
		for (var indexX = 0; indexX < 9; indexX++) {
			var c = new Circle();
			gameView.addChild(c);
			circleArr[indexX][indexY] = c;
			c.indexX = indexX;
			c.indexY = indexY;
			c.x = indexY%2?indexX*55+25:indexX*55;
			c.y = indexY*55;
			
			if (indexX==4&&indexY==4) {
				c.setCircleType(2);
				currentV = c;
			}else if (Math.random()<0.1) {
				c.setCircleType(Circle.TYPE_BLOCK);
			}
			
			c.addEventListener("click", circleClicked);
		}
	}
}
addCircles();