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

const image = document.createElement('img');

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

const addDataToInnerHTML = (res, index) => {

    const data = res.data;

    data.map(item => {

      if(item.selected) {
        const titles = item.articles.map(article => {

          const li = document.createElement('li');
          li.textContent = article.title;

          const fragment = document.createDocumentFragment();

          const img = document.createElement('img')
          img.src = "./comment.png";
          img.alt = "comment icon";

          const comment = document.createElement('span')
          comment.innerHTML = article.comment;
          console.log(comment)

          const newIcon = document.createElement('span');
          newIcon.innerHTML = " New!"

          if(date - (article.published.split('-').join('')) <= 14) {
            li.appendChild(newIcon)
          }
          if(article.comment > 0)  {
            li.appendChild(img);
            li.appendChild(comment);
          }

          fragment.appendChild(li)

          ul.appendChild(fragment)
        })
      }
    })

}

const renderSelectedCategory = (res, index) => {

  const data = res.data[index];

  const articles = data.articles;

  articles.map(article => {
    const li = document.createElement('li');
    li.textContent = article.title;

    const fragment = document.createDocumentFragment();

    const img = document.createElement('img')
    img.src = "./comment.png";
    img.alt = "comment icon";

    const comment = document.createElement('span')
    comment.innerHTML = article.comment;
    console.log(comment)

    const newIcon = document.createElement('span');
    newIcon.innerHTML = " New!"

    if(date - (article.published.split('-').join('')) <= 14) {
      li.appendChild(newIcon)
    }
    if(article.comment > 0)  {
      li.appendChild(img);
      li.appendChild(comment);
    }

    fragment.appendChild(li)

    ul.appendChild(fragment)
    })
}

const createBtn = res => {
  res.data.map(item => {
    const btn = document.createElement('button');
    btn.className = "btn";
    btn.id = item.id;
    btn.innerHTML = item.label;

    ul.parentNode.insertBefore(btn, ul);
  })
}

window.addEventListener('load', async (event) => {
  const data = await getNewsData();
  addDataToInnerHTML(data);
  createBtn(data);

  // カテゴリー選択用ボタン
  document.querySelectorAll('.btn').forEach((item, index) => {
    item.addEventListener('click', event => {
      ul.innerHTML = '';
      renderSelectedCategory(data, index);
    })
  })

});
