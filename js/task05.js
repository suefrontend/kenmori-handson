const data = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

var promise = new Promise((resolve,reject) => {

  resolve(data);

});

const ul = document.querySelector('.list');

promise.then(response => {
  response.map(el => {
    let str = `<li><a href="${el.to}"><img src="${el.img}" alt="${el.alt}">${el.text}</a></li>`;
    console.log(str)
    ul.insertAdjacentHTML('afterbegin', str);
  })
})
