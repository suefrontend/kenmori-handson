const data = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

const ul = document.querySelector('#lists');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

 //promiseがresolveになるまでの間にloading画像を出す
 ul.appendChild(loader);

const promise = new Promise((resolve,reject) => {

    setTimeout(() => {
      resolve(data);
    }, 3000)

});

promise.then(response => {

  ul.removeChild(loader);

  const markup = response.reduce((prev, current) => {

    return `${prev}<li><a href="${current.to}"><img src="${current.img}" alt="${current.alt}">${current.text}</a></li>`;
  }, "")

  ul.insertAdjacentHTML('afterbegin', markup);
})
