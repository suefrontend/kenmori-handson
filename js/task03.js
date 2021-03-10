function List(href, src, text) {
  return {
    href,
    src,
    text
  }
}
const item1 = new List("a1.html", "/img/bookmark.png", "a1");
const item2 = new List("a2.html", "/img/bookmark.png", "a2");

const ul = document.querySelector('.list');

const code =  `
  <li><a href=${item1.href}><img src=${item1.src}>${item1.text}</a></li>
  <li><a href=${item2.href}><img src=${item2.src}>${item2.text}</a></li>`
;
ul.innerHTML = code;
