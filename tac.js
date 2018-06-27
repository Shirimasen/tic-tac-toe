const board = document.getElementsByClassName('tic-tac-toe')[0];
const whoNext = document.getElementsByClassName('who')[0];
const newG = document.getElementsByClassName('new-game')[0];

let buttons = [];
let whoMove = 1;
let inGame = 1;
whoNext.innerHTML = 'x';

newG.addEventListener('click', newGame);

for (let i = 0; i < 9; i++) {
	let button = document.createElement('button');
	button.value = 0;

	button.addEventListener('click', clicked);
	buttons.push(button);
	board.appendChild(button);
}

function clicked() {
	if (this.value != 0)
		return;

	if (!inGame)
		return;

	this.value = whoMove;
	this.innerHTML = whoString(whoMove);

	switch (check()) {
		case 1:
			win();
			return;
		case -1:
			draw();
			return;
	}

	whoMove *= -1;
	whoNext.innerHTML = whoString(whoMove);
}

function whoString(whoMove) {
	switch (whoMove) {
		case 1:
			return 'x';
		case -1:
			return 'o';
	}
}

let winCases = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

function check() {
	for (let i = 0; i < winCases.length; i++) {
		let a = buttons[winCases[i][0]].value;
		let b = buttons[winCases[i][1]].value;
		let c = buttons[winCases[i][2]].value;

		if (a === b && b === c)
			if (a != 0)
				return 1;
	}

	for (let i = 0; i < 9; i++) {
		if (buttons[i].value == 0)
			return 0;
	}

	return -1;
}

function win() {
	board.classList.add('win');
	newG.classList.add('show');
	whoNext.innerHTML += ' wins!';
	inGame = 0;
}

function draw() {
	board.classList.add('draw');
	newG.classList.add('show');
	whoNext.innerHTML = 'draw!';
	inGame = 0;
}

function newGame() {
	whoMove = 1;
	inGame = 1;
	whoNext.innerHTML = 'x';
	board.classList.remove('win');
	board.classList.remove('draw');
	newG.classList.remove('show');

	for (let i = 0; i < 9; i++) {
		buttons[i].value = 0;
		buttons[i].innerHTML = '';
	}
}
