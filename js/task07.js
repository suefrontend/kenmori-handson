const data = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

const ul = document.querySelector('#lists');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

const promise = new Promise((resolve,reject) => {

  //resolveになるまでの間にloading画像を出す
    ul.appendChild(loader);

    setTimeout(() => {
      //終わったら除く
      ul.removeChild(loader);
      resolve(data);
    }, 3000)

});

promise.then(response => {
  response.map(data => {
    const {to, img, alt, text} = data;
    const markup = `<li><a href="${to}"><img src="${img}" alt="${alt}">${text}</a></li>`;
    ul.insertAdjacentHTML('afterbegin', markup);
  })
})
