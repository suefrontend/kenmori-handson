const ul = document.getElementById('js-lists');
const page = document.querySelector('.page');
const dotContainer = document.getElementById('js-dots');

let currentImage = 0;
const imagesArr = [];

function showLoader() {
	const li = document.createElement('li');
	const loader = document.createElement('img');
	li.classList.add('loader');
	loader.classList.add('loader_image');
	loader.src = './images/loading-circle.gif';
	ul.appendChild(li).appendChild(loader);
}
function removeLoader() {
	const loaderImage = document.querySelector('.loader');
	ul.removeChild(loaderImage);
}

function fetchData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(fetch('./data.json'));
		}, 3000);
	});
}

async function getData() {
	showLoader();

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

function displayImage(id) {
	console.log('called');
	console.log('id', id);
	currentImage = id;
	imagesArr[currentImage].classList.add('is-shown');

	page.innerHTML = `${currentImage + 1} / ${imagesArr.length}`;
}

function displayImageAuto(id) {
	currentImage = id;

	if (currentImage !== 0) {
		imagesArr[currentImage - 1].classList.remove('is-shown');
	} else if (currentImage === 0) {
		imagesArr[4].classList.remove('is-shown');
	}

	imagesArr[currentImage].classList.add('is-shown');

	if (currentImage === 4) {
		nextBtn.disabled = true;
		prevBtn.disabled = false;
	} else if (currentImage === 0) {
		prevBtn.disabled = true;
		nextBtn.disabled = false;
	} else {
		prevBtn.disabled = false;
		nextBtn.disabled = false;
	}

	page.innerHTML = `${currentImage + 1} / ${imagesArr.length}`;
}

function displayPrevImage() {
	imagesArr[currentImage].classList.remove('is-shown');
	currentImage--;
	imagesArr[currentImage].classList.add('is-shown');
	page.innerHTML = `${currentImage + 1} / ${imagesArr.length}`;
	console.log('currentImage displayPrevImage', currentImage);
}

function displayNextImage() {
	imagesArr[currentImage].classList.remove('is-shown');
	currentImage++;
	imagesArr[currentImage].classList.add('is-shown');
	page.innerHTML = `${currentImage + 1} / ${imagesArr.length}`;
	console.log('currentImage displayNextImage', currentImage);
}

function slideImages() {
	imagesArr[currentImage].classList.remove('is-shown');
	currentImage++;
	imagesArr[currentImage].classList.add('is-shown');
	console.log('currentImage slideImages', currentImage);
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
		prevBtn.disabled = false;
		nextBtn.disabled = false;
		displayPrevImage();
	}
	if (currentImage === 0) {
		prevBtn.disabled = true;
	}
});

const nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', function () {
	prevBtn.disabled = false;
	displayNextImage();

	if (currentImage === imagesArr.length - 1) {
		nextBtn.disabled = true;
	}
});

function createDots(numOfImages) {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < numOfImages; i++) {
		let dot = document.createElement('li');
		dot.classList.add('slide__dot__item');
		fragment.appendChild(dot);
	}

	dotContainer.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', async function () {
	const data = await getData();
	const fragment = document.createDocumentFragment();

	data.forEach((el, index) => {
		const image = document.createElement('img');
		const li = document.createElement('li');

		image.src = el.image;
		li.appendChild(image);
		imagesArr.push(li);

		li.classList.add('slide__list__item');

		if (index === 0) {
			li.classList.add('is-shown');
		}
		fragment.appendChild(li);
	});

	ul.appendChild(fragment);

	createDots(data.length);

	const dots = document.querySelectorAll('.slide__dot__item');

	dots.forEach((dot, index) => {
		dot.addEventListener('click', function () {
			let img = document.querySelector('.is-shown');
			img.classList.remove('is-shown');

			if (index === 4) {
				nextBtn.disabled = true;
				prevBtn.disabled = false;
			} else if (index === 0) {
				prevBtn.disabled = true;
				nextBtn.disabled = false;
			} else {
				prevBtn.disabled = false;
				nextBtn.disabled = false;
			}

			displayImage(index);
		});
	});

	// setTimeout(displayImage(currentImage), 3000);

	function yourFunction() {
		// do whatever you like here

		displayImageAuto(currentImage);
		currentImage++;

		setTimeout(yourFunction, 1000);

		if (currentImage === 5) currentImage = 0;
		console.log('currentImage', currentImage);
	}

	yourFunction();

	page.textContent = `${currentImage + 1} / ${imagesArr.length}`;
});
