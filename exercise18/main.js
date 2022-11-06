// Access to DOMs
const ul = document.getElementById('js-lists');
const dotContainer = document.getElementById('js-dots');

let numOfImages = 0;

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
		return data;
	} catch (error) {
		ul.innerHTML = "Couldn't get response.";
	} finally {
		removeLoader();
	}
};

const createPrevButton = () => {
	const prevBtn = document.createElement('button');
	prevBtn.id = 'prev';
	prevBtn.innerHTML = 'Prev';
	prevBtn.disabled = true;
	ul.parentNode.insertBefore(prevBtn, ul);
};

const createNextButton = () => {
	const nextBtn = document.createElement('button');
	nextBtn.id = 'next';
	nextBtn.innerHTML = 'Next';
	ul.parentNode.appendChild(nextBtn);
};

const createDots = () => {
	const fragment = document.createDocumentFragment();

	for (let i = 0; i < numOfImages; i++) {
		let dot = document.createElement('li');
		dot.classList.add('slide__dot__item');
		fragment.appendChild(dot);
	}

	dotContainer.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', async function () {
	const data = await getData();
	numOfImages = data.length;
	createPrevButton();
	createNextButton();
	createDots();
});

// やること
// -- 画像をul内に表示させる関数を作る
// -- 表示させる関数を3秒ごとに呼び出す
// -- 画像の数だけドットを生成 createDotButtons()
// -- ドットをクリックすると、画像を表示させる関数が呼び出される
// -- 現在の画像の順番のUI部分をアップデートする
