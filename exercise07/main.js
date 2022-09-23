const data = [
	{ to: 'bookmark.html', img: '1.png', alt: 'Image 1', text: 'bookmark' },
	{ to: 'message.html', img: '2.png', alt: 'Image 2', text: 'message' },
];

const ul = document.querySelector('#lists');

// loader
const loader = document.createElement('img');
loader.src = 'loading-circle.gif';

ul.appendChild(loader);

const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(data);
	}, 3000);
});

promise.then((response) => {
	ul.removeChild(loader);

	const markup = response.reduce((prev, current) => {
		return `${prev}<li><a href="${current.to}"><img src="${current.img}" alt="${current.alt}">${current.text}</a></li>`;
	}, '');

	ul.insertAdjacentHTML('afterbegin', markup);
});
