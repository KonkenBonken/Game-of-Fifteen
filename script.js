const size = 4,
	{ floor, abs, random } = Math,
	timer = document.querySelector('#timer'),
	restart = document.querySelector('#restart'),
	field = document.querySelector('#field'),
	cells = field.getElementsByTagName('div'),
	empty = document.createElement('div');

empty.id = 'empty';

for (const n of [...Array(size ** 2).keys()].slice(1)) {
	const cell = document.createElement('div');
	cell.innerHTML = cell.value = n;
	field.append(cell);
}

field.append(empty);

for (const cell of cells)
	cell.addEventListener('click', () => {
		if (!cell.classList.contains('neighbor')) return;
		swapNodes(cell, empty);
		displayDoneIfDone();
	});

function shuffle() {
	setNeighbors();
	for (let i in [...Array(1e3)]) {
		const neighbors = field.querySelectorAll('.neighbor'),
			cell = neighbors[floor(random() * neighbors.length)];
		swapNodes(cell, empty, true);
	}
	while ([...cells].findIndex(cell => cell == empty) !== 15) {
		const neighbors = field.querySelectorAll('.neighbor'),
			cell = [...neighbors].at(-1);
		swapNodes(cell, empty, true);
	}
}

function setNeighbors() {
	const Ei = [...cells].findIndex(cell => cell == empty),
		Ex = Ei % size,
		Ey = floor(Ei / size);

	[...cells].forEach((cell, i) => {
		const x = i % size,
			y = floor(i / size);

		if (
			y == Ey && abs(x - Ex) == 1 ||
			x == Ex && abs(y - Ey) == 1
		)
			cell.classList.add('neighbor');
		else
			cell.classList.remove('neighbor');
	})
}

function swapNodes(cell, empty, instant = false) {
	const temp = document.createComment('');

	if (!instant) {
		const from = cell.getBoundingClientRect(),
			to = empty.getBoundingClientRect(),
			Δx = from.x - to.x,
			Δy = from.y - to.y;

		cell.style.transform = `translate(${Δx}px,${Δy}px)`;
		if (cell.timeout) clearTimeout(cell.timeout);
		cell.timeout = setTimeout(() => cell.style.transform = '', 300);
	}

	empty.replaceWith(temp);
	cell.replaceWith(empty);
	temp.replaceWith(cell);

	setNeighbors();
}

let stopClock = () => false;

function startTimer() {
	const timerStart = Date.now(),
		interval = setInterval(() => {
			let time = Date.now() - timerStart,
				text = (new Date(time)).toISOString().substring(14, 22);
			timer.innerText = text;
		}, 20);
	stopClock = () => clearInterval(interval);
}

function isDone() {
	let index = 1;
	for (const cell of [...cells].slice(0, -1))
		if (cell.value != index++)
			return false;
	return true;
}

function displayDoneIfDone() {
	if (isDone()) {
		stopClock();
		timer.classList.add('finish');
	}
}

function start() {
	shuffle();
	startTimer();
	timer.classList.remove('finish');
}

start();

restart.addEventListener('click', start)