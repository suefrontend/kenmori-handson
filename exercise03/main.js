const data = [
  {
    href: "a1.html",
    src: "/img/bookmark.png",
    text: "a1"
  },
  {
    href: "a2.html",
    src:"/img/bookmark.png",
    text: "a2"
  }
]

const ul = document.querySelector('#lists');

const template = data.reduce((prev, current) => {
  return `${prev}<li><a href=${current.href}><img src=${current.src}>${current.text}</a></li>`;
}, "")

ul.innerHTML = template;
