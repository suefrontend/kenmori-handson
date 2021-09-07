const ul = document.getElementById('lists');

let currentImage = 0;
const imagesArr = [];

function createLoader() {
	const fragment = document.createDocumentFragment();
	const loaderContainer = document.createElement('li');
	const loader = document.createElement('img');
	loader.src = './img/loading-circle.gif';
	fragment.appendChild(loader);
	loader.appendChild(loaderContainer);
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

	const fragment = document.createDocumentFragment();
	const li = document.createElement('li');
	li.classList.add('loader');

	li.appendChild(loaderImage);
	fragment.appendChild(li);
	console.log('fragment', fragment);
	ul.appendChild(fragment);

	try {
		const response = await fetchData();
		const res = await response.json();
		const data = res.data;

		data.map((el) => {
			const image = document.createElement('img');
			const li = document.createElement('li');

			image.src = el.image;
			li.appendChild(image);

			imagesArr.push(li);
		});

		imagesArr.forEach((el, index) => {
			el.classList.add('slide-images');

			if (index === 0) {
				el.classList.add('z-index-100');
			}
			ul.appendChild(el);
		});
	} catch (error) {
		ul.innerHTML = "Couldn't get response.";
	} finally {
		console.log('You got the result.');
	}
}
getData();

function displayImage(currentImage, clickEvent) {
	let imageShown, nextImage;
	let btnType = clickEvent.id;

	if (btnType === 'next') {
		imageShown = imagesArr[currentImage];
		nextImage = imagesArr[currentImage - 1];

		imageShown.classList.add('z-index-100');
		nextImage.classList.remove('z-index-100');
	} else if (btnType === 'prev') {
		imageShown = imagesArr[currentImage];
		prevImage = imagesArr[currentImage + 1];

		imageShown.classList.add('z-index-100');
		prevImage.classList.remove('z-index-100');
	}
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
prevBtn.addEventListener('click', function (e) {
	e.target.disabled = true;

	if (currentImage > 0) {
		e.target.disabled = false;
		nextBtn.disabled = false;
		currentImage--;
		displayImage(currentImage, e.target);
	}
	if (currentImage === 0) {
		e.target.disabled = true;
	}
});

const nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', function (e) {
	prevBtn.disabled = false;
	currentImage++;
	displayImage(currentImage, e.target);

	if (currentImage === 4) {
		e.target.disabled = true;
	}
});
