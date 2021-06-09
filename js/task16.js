// それぞれのカテゴリタブを開くことができてそれぞれのジャンルに応じた記事が4つ表示できる。(記事のタイトル名は適当)

// それぞれのカテゴリにはそれぞれ固有の画像が入る(右側四角。画像は適当)

// DONE - 記事にはnewという新着かどうかのラベルがつく(どこの記事にそれが入るかは適当でいいです)

// DONE - 記事にはそれぞれコメントがあり、0件なら表示しない、1以上ならアイコンと共に数字が表示される

// カテゴリタブは切り替えられる。面倒なら2つのカテゴリだけでよいです。その場合ニュースと経済だけにします
  // タブ切り替え用のボタンを作る。ボタンにeventListenerを付けて、各カテゴリーのデータをfetchする
  // そのボタンは、createElementで作る

// どのカテゴリタブを初期表示時に選んでいるかはデータとして持っている

// htmlはulだけ作ってあとはcreateElementで作る

// DONE - try-catchでエラー時はulの中に「ただいまサーバー側で通信がぶっ壊れています」みたいなテキストを画面内に表示すること

const ul = document.getElementById('lists');

const btn = document.createElement('button');
btn.innerHTML = "News";

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
    console.log("finally")
    ul.removeChild(loader);
  }
}

const addDataToInnerHTML = data => {
  ul.appendChild(btn);
  const createNode = data.reduce((prev, current) => `${prev}<li>${current.title} ${date - (current.published.split('-').join('')) <= 14 ? "NEW" : ""} ${ (date - current.published) <= 14 ? `New` : '' } ${current.comment >= 1 ? `<img src="./comment.png" alt="comment icon" />` + current.comment : ''}</li>`, "");
  ul.innerHTML = createNode;
}

window.addEventListener('load', async (event) => {
  const data = await getNewsData();
  addDataToInnerHTML(data);
});
