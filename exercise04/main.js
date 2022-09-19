const ul = document.querySelector('#lists');

const data = [
	{ to: 'bookmark.html', img: '1.png', alt: 'Image 1', text: 'bookmark' },
	{ to: 'message.html', img: '2.png', alt: 'Image 2', text: 'message' },
];

const markup = data.reduce((prev, current) => {
	return `${prev}<li><a href=${current.to}><img src=${current.img} alt=${current.alt}>${current.text}</a></li>`;
}, '');

ul.innerHTML = markup;
