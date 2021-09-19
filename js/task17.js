const ul = document.getElementById('lists');

let currentImage = 0;
const imagesArr = [];

function createLoader() {
	const loaderContainer = document.createElement('li');
	const loader = document.createElement('img');
	loader.src = './img/loading-circle.gif';
	ul.appendChild(loader).appendChild(loaderContainer);

	loader.classList.add('loader_image');
	return loader;
}

function fetchData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(fetch('./js/json/task17.json'));
		}, 3000);
	});
}

async function getData() {
	const loaderImage = createLoader();

	const li = document.createElement('li');
	li.classList.add('loader');

	ul.appendChild(li).appendChild(loaderImage);

	let response, res, data;

	try {
		response = await fetchData();
		res = await response.json();
		data = res.data;

		return data;
	} catch (error) {
		ul.innerHTML = "Couldn't get response.";
	} finally {
		console.log('You got the result.');

		data.forEach((el, index) => {
			const fragment = document.createDocumentFragment();
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
			ul.appendChild(fragment);
		});
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
