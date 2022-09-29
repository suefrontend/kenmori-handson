const ul = document.getElementById('lists');
let modalBtn = document.getElementById('modal-btn');
let fetchBtn = document.getElementById('fetch-btn');
let modal = document.querySelector('.modal');
let closeBtn = document.querySelector('.close-btn');

// loader
const loader = document.createElement('img');
loader.src = 'loading-circle.gif';

function fetchData() {
	return new Promise((resolve, reject) => {
		resolve(fetch('https://jsondata.okiba.me/v1/json/ARA1Z210401070524'));
	});
}

async function renderData() {
	let data;

	ul.appendChild(loader);

	try {
		const response = await fetchData();
		data = await response.json();
	} catch (error) {
		console.log(error);
	} finally {
		ul.removeChild(loader);
	}

	const markup = data.reduce((prev, current) => {
		return `${prev}<li>${current.id} - ${current.name} - ${current.tel}</li>`;
	}, '');
	ul.innerHTML = markup;
}

modalBtn.addEventListener('click', function () {
	ul.innerHTML = '';
	modal.style.display = 'block';
});

fetchBtn.addEventListener('click', function () {
	renderData();
	modal.style.display = 'none';
});

closeBtn.addEventListener('click', function () {
	modal.style.display = 'none';
});

document.addEventListener('click', function (e) {
	if (e.target === modal) {
		modal.style.display = 'none';
	}
});
