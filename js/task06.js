const data = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

const promise = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve(data);
  }, 3000)
});

const ul = document.querySelector('#lists');

promise.then(response => {

  console.log("response", response)

  response.map(data => {

    const {to, img, alt, text} = data;

    const markup = `<li><a href="${to}"><img src="${img}" alt="${alt}">${text}</a></li>`;
    ul.insertAdjacentHTML('afterbegin', markup);
  })

})
