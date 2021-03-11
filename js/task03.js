const item1 = {};
item1.href = "a1.html";
item1.src = "/img/bookmark.png";
item1.text = "a1";

const item2 = {};
item2.href = "a2.html";
item2.src = "/img/bookmark.png";
item2.text = "a2";

const ul = document.querySelector('#lists');

const markup = `
  <li><a href=${item1.href}><img src=${item1.src}>${item1.text}</a></li>
  <li><a href=${item2.href}><img src=${item2.src}>${item2.text}</a></li>
`;
ul.innerHTML = markup;
