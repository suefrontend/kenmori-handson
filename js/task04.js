const ul = document.querySelector('.list');

const data = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
];

const str = data.map(el => {
  return `<li><a href=${el.to}><img src=${el.img} alt=${el.alt}>${el.text}</a></li>`
}).join('');

ul.innerHTML = str;
