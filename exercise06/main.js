const data = [
	{ to: 'bookmark.html', img: '1.png', alt: 'Image 1', text: 'bookmark' },
	{ to: 'message.html', img: '2.png', alt: 'Image 2', text: 'message' },
];

const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(data);
	}, 3000);
});

const ul = document.querySelector('#lists');

promise.then((response) => {
	const markup = response.reduce((prev, current) => {
		return `${prev}<li><a href="${current.to}"><img src="${current.img}" alt="${current.alt}">${current.text}</a></li>`;
	}, '');

	ul.insertAdjacentHTML('afterbegin', markup);
});
