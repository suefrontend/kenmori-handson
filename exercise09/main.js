const data = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

const ul = document.getElementById('lists');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

//resolveになるまでの間にloading画像を出す
ul.appendChild(loader);

function fetchData() {

  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(data);
    }, 3000)
  });

}

async function renderData() {

  await fetchData(data);

  //終わったら除く
  ul.removeChild(loader);

  const markup = data.reduce((prev, current) => {
    return `${prev}<li><a href="${current.to}"><img src="${current.img}" alt="${current.alt}">${current.text}</a></li>`;
  }, "")
  ul.innerHTML = markup;

}

renderData();
