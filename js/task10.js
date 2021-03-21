const ul = document.querySelector('#lists');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

//resolveになるまでの間にloading画像を出す
ul.appendChild(loader);

function fetchData() {

  return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve([
          {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
          {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
        ]);
      }, 3000)
  });

}

async function renderData() {

  try {

    const response = await fetchData();

    const markup = response.reduce((prev, current) => {
      return `${prev}<li><a href="${current.to}"><img src="${current.img}" alt="${current.alt}">${current.text}</a></li>`;
    }, "")
    ul.innerHTML = markup;
  }
  catch(error) {
    console.log(error);
  }
  finally {
    ul.removeChild(loader);
  }
}

renderData();
