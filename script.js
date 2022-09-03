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

function start() {
}

start();