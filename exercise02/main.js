const ul = document.querySelector('#lists');

const li = document.createElement('li');

const image = document.createElement('img');
image.src = "bookmark.png";
image.alt = 'ブックマーク';

const link = document.createElement('a');
link.href = "1.html";
link.innerHTML = "これです";

ul.appendChild(li).appendChild(link).appendChild(image);
