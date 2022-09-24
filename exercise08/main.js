const data = [
	{ to: 'bookmark.html', img: '1.png', alt: 'Image', text: 'bookmark' },
	{ to: 'message.html', img: '2.png', alt: 'Image 2', text: 'message' },
];

const ul = document.querySelector('#lists');

// loader
const loader = document.createElement('img');
loader.src = 'loading-circle.gif';

//loading
ul.appendChild(loader);

const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(data);
	}, 3000);
});

promise.catch((error) => {
	console.log('An error has been occurred', error);
});
