const data = [
	{ to: 'bookmark.html', img: '1.png', alt: 'Image 1', text: 'bookmark' },
	{ to: 'message.html', img: '2.png', alt: 'Image 2', text: 'message' },
];

const ul = document.getElementById('lists');

// loader
const loader = document.createElement('img');
loader.src = 'loading-circle.gif';

ul.appendChild(loader);

function fetchData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data);
		}, 3000);
	});
}

async function renderData() {
	await fetchData(data);

	ul.removeChild(loader);

	const markup = data.reduce((prev, current) => {
		return `${prev}<li><a href="${current.to}"><img src="${current.img}" alt="${current.alt}">${current.text}</a></li>`;
	}, '');
	ul.innerHTML = markup;
}

renderData();
