const size = 4,
	{ floor, abs, random } = Math,
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
		setNeighbors();
	});

function shuffle() {
	setNeighbors();
	for (let i in [...Array(1e3)]) {
		const neighbors = field.querySelectorAll('.neighbor'),
			cell = neighbors[floor(random() * neighbors.length)];
		swapNodes(cell, empty);
		setNeighbors();
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

function swapNodes(cell1, cell2) {
	const temp = document.createComment('');
	cell2.replaceWith(temp);
	cell1.replaceWith(cell2);
	temp.replaceWith(cell1);
}

function start() {
	shuffle();
}

start();