

const skier = {
	lives: 3,
	xCoordinate: 5,
	moveLeft(){
		if(this.xCoordinate > 1){
			console.log("ROOM TO MOVE LEFT")
			$(`.game-square-${this.xCoordinate}-1`).removeClass('skier');
			this.xCoordinate -= 1;
			$(`.game-square-${this.xCoordinate}-1`).addClass('skier')
		}
	},
	moveRight(){
		if(this.xCoordinate < 10){
			console.log("ROOM TO MOVE RIGHT")
			$(`.game-square-${this.xCoordinate}-1`).removeClass('skier');
			this.xCoordinate += 1;
			$(`.game-square-${this.xCoordinate}-1`).addClass('skier')
		}
	}
}
// const obstacles = [];

class Obstacle {
	constructor(type){
		this.type = type;
		this.xCoordinate = Math.floor(Math.random() * (11));
		this.yCoordinate = 9; 
		$(`.game-square-${this.xCoordinate}-9`).addClass(this.type);
		// $(`.game-square-${this.xCoordinate}-9`).addClass('obstacle')
	}
	moveUp(){
		$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).removeClass(this.type)
		this.yCoordinate--;
		$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).addClass(this.type)
		setTimeout(()=>{
		this.moveUp()
		}, 1000)
	}
}


const gameBoard = [ [0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0]

]

for(let i = 0; i < gameBoard.length; i++) {
	let row = gameBoard[i];
	$('.game-board').append(`<div class='game-row-${i} game-row'></div>`)
	for(let x = 0; x < row.length; x++) {
		$(`.game-row-${i}`).append(`<div class="game-square game-square-${x}-${i}"></div>`)
		}
}
$('.game-square-5-1').addClass('skier');
$(document).keydown(function(e){
	let keyPressed = e.which;
	if(keyPressed == 37){
		skier.moveLeft();
	}	else if(keyPressed == 39){
		skier.moveRight();
	}	
})

const tree = new Obstacle('tree');
tree.moveUp();

const rock = new Obstacle('rock');
rock.moveUp();
