// DONE - それぞれのカテゴリタブを開くことができてそれぞれのジャンルに応じた記事が4つ表示できる。(記事のタイトル名は適当)

// DONE - それぞれのカテゴリにはそれぞれ固有の画像が入る(右側四角。画像は適当)

// DONE - 記事にはnewという新着かどうかのラベルがつく(どこの記事にそれが入るかは適当でいいです)

// DONE - 記事にはそれぞれコメントがあり、0件なら表示しない、1以上ならアイコンと共に数字が表示される

// DONE - カテゴリタブは切り替えられる。面倒なら2つのカテゴリだけでよいです。その場合ニュースと経済だけにします
  // DONE - タブ切り替え用のボタンを作る。ボタンにeventListenerを付けて、各カテゴリーのデータをfetchする
  // DONE - そのボタンは、createElementで作る

// DONE - どのカテゴリタブを初期表示時に選んでいるかはデータとして持っている

// DONE - htmlはulだけ作ってあとはcreateElementで作る

// DONE - try-catchでエラー時はulの中に「ただいまサーバー側で通信がぶっ壊れています」みたいなテキストを画面内に表示すること

const ul = document.getElementById('lists');

const btn1 = document.createElement('button');
btn1.id = 'news';
btn1.innerHTML = "ニュース";

const btn2 = document.createElement('button');
btn2.id = 'economy';
btn2.innerHTML = "経済";

const image1 = document.createElement('img');
image1.src = "./img/oli.jpg";

const image2 = document.createElement('img');
image2.src = "./img/economy.jpg";

const today = new Date();
const date = `${today.getFullYear()}${(today.getMonth()+1) < 10 ? `0` + (today.getMonth()+1) : (today.getMonth()+1) }${today.getDate() < 10 ? `0` + today.getDate() : today.getDate()}`;

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

function fetchData() {
  return new Promise((resolve, reject) => {

    resolve(fetch('./data.json'));

  })
}

async function getNewsData() {

  ul.appendChild(loader);

  try {
    const response = await fetchData();
    return await response.json();
  }
  catch(error) {
    ul.innerHTML = "サーバーから情報を取得できませんでした。"
  }
  finally {
    console.log("サーバーから情報が取得できました")
    ul.removeChild(loader);
  }
}

const addDataToInnerHTML = data => {
  const createNode = data.reduce((prev, current) => `${prev}<li>${current.title} ${date - (current.published.split('-').join('')) <= 14 ? "NEW" : ""} ${ (date - current.published) <= 14 ? `New` : '' } ${current.comment >= 1 ? `<img src="./comment.png" alt="comment icon" />` + current.comment : ''}</li>`, "");
  ul.innerHTML = createNode;
  ul.prepend(btn1, btn2);
}

window.addEventListener('load', async (event) => {
  const data = await getNewsData();
  const newsData = data.filter(el => el.category === 'news')
  addDataToInnerHTML(newsData);
  ul.appendChild(image1);
});

btn1.addEventListener('click', async function() {
  const data = await getNewsData();
  const newsData = data.filter(el => el.category === 'news')
  addDataToInnerHTML(newsData);
  ul.appendChild(image1);
})

btn2.addEventListener('click', async function() {
  const data = await getNewsData();
  const newsData = data.filter(el => el.category === 'economy')
  addDataToInnerHTML(newsData);
  ul.appendChild(image2);
})
