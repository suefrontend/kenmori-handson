// Access to DOMs
const ul = document.getElementById('js-lists');

// Show/remove loader
const showLoader = () => {
	const li = document.createElement('li');
	const loader = document.createElement('img');
	li.classList.add('loader');
	loader.classList.add('loader_image');
	loader.src = './images/loading-circle.gif';
	ul.appendChild(li).appendChild(loader);
};

const removeLoader = () => {
	const loaderImage = document.querySelector('.loader');
	ul.removeChild(loaderImage);
};

const fetchData = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(fetch('./data.json'));
		}, 3000);
	});
};

const getData = async () => {
	showLoader();
	try {
		const response = await fetchData();
		const res = await response.json();
		const data = res.data;
		console.log('data', data);
		return data;
	} catch (error) {
		ul.innerHTML = "Couldn't get response.";
	} finally {
		removeLoader();
	}
};

document.addEventListener('DOMContentLoaded', async function () {
	const data = await getData();
});
