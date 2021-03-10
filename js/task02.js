const ul_1 = document.querySelector('.list_1');
const ul_2 = document.querySelector('.list_2');
const ul_3 = document.querySelector('.list_3');

const li = document.createElement('li');

const image = document.createElement('img');
image.src = "bookmark.png";
image.setAttribute('alt', 'ブックマーク')

const link = document.createElement('a');
link.href = "1.html";
link.innerHTML = "これです"

// ul_1.appendChild(image);
// ul_2.appendChild(link);
// ul_3.appendChild(li);

ul_1.appendChild(li).appendChild(link).appendChild(image);

//li > a > img > text
