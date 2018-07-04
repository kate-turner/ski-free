let seconds = 0; 
let minutes = 0;
let paused = false;
let timePasses = null;
 
 const skier = {
	crashlives: 0,
	xCoordinate: 5,
	yCoordinate: 1,
	moveLeft(){
		if(this.xCoordinate > 0){
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
	},
	// moveDown(){
	// 	if(this.yCoordinate < 8){
	// 		console.log("ROOM TO MOVE DOWN")
	// 		$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).removeClass('skier')
	// 		this.yCoordinate ;
	// 		$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).addClass('skier')
	// 	}
	// }
}
class Obstacle {
	constructor(type){
		this.type = type;
		this.xCoordinate = Math.floor(Math.random() * (11));
		this.yCoordinate = 9; 
	}
	renderObstacle(){
		$(`.game-square-${this.xCoordinate}-9`).addClass(this.type);
	}
	moveUp(){
		$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).removeClass(this.type)
		this.yCoordinate--;
		$(`.game-square-${this.xCoordinate}-${this.yCoordinate}`).addClass(this.type)
		this.detectCollision()
		setTimeout(()=>{
		this.moveUp()
		}, 1000)
	}
	detectCollision(){
		const collisionSquare = $(`.game-square-${this.xCoordinate}-${this.yCoordinate}`)
		if(collisionSquare.hasClass('skier') == true){
			collisionSquare.removeClass('skier');
			collisionSquare.addClass('skierDown');
			console.log("COLLISION!");
			setTimeout(()=>{
				collisionSquare.removeClass('skierDown');
				collisionSquare.addClass('skier');
			}, 200)
		}
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
	}else if(keyPressed == 39){
		skier.moveRight();
	}else if(keyPressed == 40){
		skier.moveDown();
	}
})


$('#start').on('click', () => {
	obstaclesMove();
	startTimer(); 
	$('#start').hide();
});
	


function startTimer () {
	paused == false;
	timePasses = setInterval(function() {
		seconds +=1;
		if(seconds % 60 == 0){
			minutes+= 1;
			seconds = 0;
		}
		$('#timer').text(`${minutes}:${seconds}`)
		}, 1000)
	}



function obstaclesMove () {
	
	const treeInterval = setInterval(function() {
	const tree = new Obstacle("tree");
	tree.renderObstacle();
	tree.moveUp();	
	}, 3000);

	const rockInterval = setInterval(function() {
	const rock = new Obstacle("rock");
	rock.renderObstacle();
	rock.moveUp();
	}, 3000);
};

$('#stoptimer').click(function(){
   clearInterval(timePasses);
   clearInterval(obstaclesMove);
   paused == true;
})

  
 


  
  
  



	


