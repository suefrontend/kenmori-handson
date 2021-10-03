const ul = document.getElementById('lists');

let currentImage = 0;
const imagesArr = [];

function showLoader() {
	const li = document.createElement('li');
	const loader = document.createElement('img');
	li.classList.add('loader');
	loader.classList.add('loader_image');
	loader.src = './img/loading-circle.gif';
	ul.appendChild(li).appendChild(loader);
}
function removeLoader() {
	const loaderImage = document.querySelector('.loader');
	ul.removeChild(loaderImage);
}

function fetchData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(fetch('./js/json/task17.json'));
		}, 3000);
	});
}

async function getData() {
	showLoader();

	// let response, res, data;

	try {
		const response = await fetchData();
		const res = await response.json();
		const data = res.data;
		return data;
	} catch (error) {
		ul.innerHTML = "Couldn't get response.";
	} finally {
		removeLoader();
	}
}
getData();

function displayPrevImage(currentImage) {
	const imageShown = imagesArr[currentImage];
	const prevImage = imagesArr[currentImage + 1];

	imageShown.classList.add('z-index-100');
	prevImage.classList.remove('z-index-100');
}

function displayNextImage(currentImage) {
	const imageShown = imagesArr[currentImage];
	const nextImage = imagesArr[currentImage - 1];

	imageShown.classList.add('z-index-100');
	nextImage.classList.remove('z-index-100');
}

function createPrevButton() {
	const prevBtn = document.createElement('button');
	prevBtn.id = 'prev';
	prevBtn.innerHTML = 'Prev';
	prevBtn.disabled = true;
	ul.parentNode.insertBefore(prevBtn, ul);
}

function createNextButton() {
	const nextBtn = document.createElement('button');
	nextBtn.id = 'next';
	nextBtn.innerHTML = 'Next';
	ul.parentNode.appendChild(nextBtn);
}

createPrevButton();
createNextButton();

const prevBtn = document.getElementById('prev');
prevBtn.addEventListener('click', function () {
	prevBtn.disabled = true;

	if (currentImage > 0) {
		currentImage--;
		prevBtn.disabled = false;
		nextBtn.disabled = false;
		displayPrevImage(currentImage);
	}
	if (currentImage === 0) {
		prevBtn.disabled = true;
	}
});

const nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', function () {
	currentImage++;
	prevBtn.disabled = false;
	displayNextImage(currentImage);

	if (currentImage === imagesArr.length - 1) {
		nextBtn.disabled = true;
	}
});

document.addEventListener('DOMContentLoaded', async function () {
	const data = await getData();
	const fragment = document.createDocumentFragment();

	data.forEach((el, index) => {
		const image = document.createElement('img');
		const li = document.createElement('li');

		image.src = el.image;
		li.appendChild(image);
		imagesArr.push(li);

		li.classList.add('slide-images');

		if (index === 0) {
			li.classList.add('z-index-100');
		}
		fragment.appendChild(li);
	});

	ul.appendChild(fragment);
});
