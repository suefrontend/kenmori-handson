const data = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

const promise = new Promise((resolve,reject) => {

  resolve(data);

});

const ul = document.querySelector('#lists');

promise.then(response => {

  const arr = [];

  response.forEach(data => {

    const {to, img, alt, text} = data;
    arr.push(`<li><a href="${to}"><img src="${img}" alt="${alt}">${text}</a></li>`);

  })

  ul.insertAdjacentHTML('afterbegin', arr.join(''));
})
