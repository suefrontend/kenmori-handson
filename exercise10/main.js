const ul = document.querySelector('#lists');

// loader
const loader = document.createElement('img');
loader.src = 'loading-circle.gif';

function fetchData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([
				{
					to: 'bookmark.html',
					img: '1.png',
					alt: 'Image 1',
					text: 'bookmark',
				},
				{
					to: 'message.html',
					img: '2.png',
					alt: 'Image 2',
					text: 'message',
				},
			]);
		}, 3000);
	});
}

async function renderData() {
	ul.appendChild(loader);

	try {
		const response = await fetchData();

		const markup = response.reduce((prev, current) => {
			return `${prev}<li><a href="${current.to}"><img src="${current.img}" alt="${current.alt}">${current.text}</a></li>`;
		}, '');
		ul.innerHTML = markup;
	} catch (error) {
		console.log(error);
	} finally {
		ul.removeChild(loader);
	}
}

renderData();
