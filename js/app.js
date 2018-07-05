let seconds = 0; 
let minutes = 0;
let paused = false;
let timePasses = null;


 const skier = {
	crashlives: 1,
	xCoordinate: 5,
	yCoordinate: 1,

	
	moveLeft(){
		if(this.xCoordinate > 0 && $(`.game-square-${this.xCoordinate}-1`).hasClass('skierRight')){
			console.log("ROOM TO MOVE LEFT")
			$(`.game-square-${this.xCoordinate}-1`).removeClass('skierRight');
			this.xCoordinate -= 1;
			$(`.game-square-${this.xCoordinate}-1`).addClass('skier');
		}
		else if(this.xCoordinate > 0 && $(`.game-square-${this.xCoordinate}-1`).hasClass('skier')){
			$(`.game-square-${this.xCoordinate}-1`).removeClass('skier');
			this.xCoordinate -= 1;
			$(`.game-square-${this.xCoordinate}-1`).addClass('skier');
		}
	},
	moveRight(){
		if(this.xCoordinate < 10 && $(`.game-square-${this.xCoordinate}-1`).hasClass('skier')){
			console.log("ROOM TO MOVE RIGHT")
			$(`.game-square-${this.xCoordinate}-1`).removeClass('skier');
			this.xCoordinate += 1;
			$(`.game-square-${this.xCoordinate}-1`).addClass('skierRight')
		}
		else if(this.xCoordinate < 10 && $(`.game-square-${this.xCoordinate}-1`).hasClass('skierRight')){
			$(`.game-square-${this.xCoordinate}-1`).removeClass('skierRight');
			this.xCoordinate += 1;
			$(`.game-square-${this.xCoordinate}-1`).addClass('skierRight');
		}
	}
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
		if(collisionSquare.hasClass('skier') || collisionSquare.hasClass('skierRight')){
			collisionSquare.removeClass('skier');
			collisionSquare.removeClass('skierRight');

			collisionSquare.addClass('skierDown');
			console.log("COLLISION!");


			setTimeout(()=>{
				collisionSquare.removeClass('skierDown');
				collisionSquare.addClass('skier');
			}, 200);


			if(skier.crashlives > 0){
				skier.crashlives -=1;
				$("span#crash-lives").text(skier.crashlives);
			}
			else {
				gameOver()
			}
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
	startGame()
	$('#start').hide();
});


function startGame () {
	obstaclesMove();
	startTimer(); 
}

// function reset () {
	
// 	console.log("reset-start game button works");
// 	$('#reset').hide();
// 	startGame(); 
// };
	
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

function gameOver () {
	if(skier.crashlives == 0){
		$('.game-board').empty();
		clearInterval(timePasses);
		$('.game-board').append("<button type='reset' class='btn btn-success' id='reset'>Start Over</button>");
		$('#reset').on('click', () => {
			location.reload()
			console.log("reset works");
		});
	}
}


// ----- A
// $('#stoptimer').click(function(){
//    clearInterval(timePasses);
//    clearInterval(obstaclesMove);
//    paused == true;
// })



// ---- ANIMATION ATTEMPT RIPPED FROM TOMAGOTCHI
// function animateRight() {
// 	$(".skier").animate({left: "+=100"}, 2000, function() {
// 		animateLeft();
// 	});
// }

// function animateLeft(){
// 	$(".skier").animate({left: "-=100"}, 2000, function () {
// 		setTimeout(animateRight, 50);
// 	});
// }

// setTimeout(animateRight, 50);

  
 


  
  
  



	


