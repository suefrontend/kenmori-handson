const ul = document.getElementById('lists');

const today = new Date();
const date = `${today.getFullYear()}${
	today.getMonth() + 1 < 10
		? `0` + (today.getMonth() + 1)
		: today.getMonth() + 1
}${today.getDate() < 10 ? `0` + today.getDate() : today.getDate()}`;

// loader
const loader = document.createElement('img');
loader.src = 'loading-circle.gif';

function fetchData() {
	return new Promise((resolve, reject) => {
		resolve(fetch('./data.json'));
	});
}

async function getData() {
	ul.appendChild(loader);

	try {
		const response = await fetchData();
		return await response.json();
	} catch (error) {
		ul.innerHTML = 'Could not fetch data from server';
	} finally {
		console.log('Process has been finished');
		ul.removeChild(loader);
	}
}

function createArticle(article) {
	const li = document.createElement('li');
	li.textContent = article.title;

	const img = document.createElement('img');
	img.src = 'comment.png';
	img.alt = 'comment icon';

	const comment = document.createElement('span');
	comment.innerHTML = article.comment;

	const newIcon = document.createElement('span');
	newIcon.innerHTML = ' New!';

	if (date - article.published.split('-').join('') <= 14) {
		li.appendChild(newIcon);
	}
	if (article.comment > 0) {
		li.appendChild(img);
		li.appendChild(comment);
	}

	return li;
}

const createArticleContent = (res) => {
	const data = res.data;
	const fragment = document.createDocumentFragment();
	const categoryImage = document.createElement('img');

	data.forEach((item) => {
		if (item.selected) {
			categoryImage.src = `${('item', item.category)}.jpg`;

			item.articles.forEach((article) => {
				const li = createArticle(article);

				fragment.appendChild(li);
				fragment.appendChild(categoryImage);
			});
		}
	});
	ul.appendChild(fragment);
};

const createBtn = (res) => {
	res.data.forEach((item) => {
		const btn = document.createElement('button');
		btn.className = 'btn';
		btn.id = item.id;
		btn.innerHTML = item.label;
		ul.parentNode.insertBefore(btn, ul);
	});
};

const switchTab = (res) => {
	document.querySelectorAll('.btn').forEach((item) => {
		item.addEventListener('click', (event) => {
			const target = Number(event.target.id);
			ul.innerHTML = '';
			res.data.forEach((item) => {
				item.id === target ? (item.selected = true) : (item.selected = false);
			});
			createArticleContent(res);
		});
	});
};

(async function onDataLoad() {
	const data = await getData();
	createArticleContent(data);
	createBtn(data);
	switchTab(data);
})();
