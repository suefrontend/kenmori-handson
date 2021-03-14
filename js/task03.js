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

const arr = [];

// 関数を作り、動的にhtmlを作成する
data.forEach(item => {
  arr.push(`<li><a href=${item.href}><img src=${item.src}>${item.text}</a></li>`);
})

const html = arr.reduce((prev, current) => {
  return prev + current;
});

ul.innerHTML = html;
