console.log("up");

// const skier =


const gameBoard = [ [0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
]

for(let i = 0; i < gameBoard.length; i++) {
	let row = gameBoard[i];
	$('.game-board').append(`<div class='game-row'></div>`)
	for(let x = 0; i < row.length; x++) {
		$('.game-row').append('<div class="game-square"></div>')
		}
		
};
