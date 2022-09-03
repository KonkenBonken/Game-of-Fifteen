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

function shuffle() {
	const elements = [...cells, empty];
	for (let i = elements.length - 1; i > 0; i--) {
		const j = floor(random() * (i + 1));
		[elements[i], elements[j]] = [elements[j], elements[i]];
	}
	field.append(...elements);
}

function start() {
	shuffle();
}

start();