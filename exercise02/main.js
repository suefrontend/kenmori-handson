const ul = document.querySelector('#lists');

const li = document.createElement('li');

const image = document.createElement('img');
image.src = 'images/bookmark.png';
image.alt = 'bookmark';

const link = document.createElement('a');
link.href = '1.html';
link.innerHTML = 'Insert this';

ul.appendChild(li).appendChild(link).appendChild(image);
