const ul = document.querySelector('.list');

const data = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
];

const markup = data.reduce((prev, current)=> {
  return `${prev}<li><a href=${current.to}><img src=${current.img} alt=${current.alt}>${current.text}</a></li>`
}, "")

ul.innerHTML = markup;
