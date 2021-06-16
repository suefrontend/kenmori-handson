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

async function getData() {

  ul.appendChild(loader);

  try {
    const response = await fetchData();
    return await response.json();
  }
  catch(error) {
    ul.innerHTML = "サーバーから情報を取得できませんでした。"
  }
  finally {
    console.log("処理が完了しました。")
    ul.removeChild(loader);
  }
}

function createListItem(article) {
  
  return article.data.forEach(item => {

      item.articles.forEach(el => {

        const li = document.createElement('li');
        li.textContent = article.title;
        
      
        const img = document.createElement('img')
        img.src = "./comment.png";
        img.alt = "comment icon";
      
        const comment = document.createElement('span')
        comment.innerHTML = article.comment;
      
        const newIcon = document.createElement('span');
        newIcon.innerHTML = " New!"
      
        if(date - (el.published.split('-').join('')) <= 14) {
          li.appendChild(newIcon);          
        }
        if(el.comment > 0)  {
          li.appendChild(img);
          li.appendChild(comment);
        }
      }) 

    })     
        
}

const addDataToInnerHTML = data => {

    const fragment = document.createDocumentFragment();
    ul.appendChild(fragment);

    const categoryImage = document.createElement('img');        

    data.forEach(item => {
      if(data.selected) {

        categoryImage.src = `./img/${item.category}.jpg`;
                
        data.articles.forEach(article => {          
          fragment.appendChild(categoryImage);
          ul.appendChild(fragment);
        })
      }
    })    
}

const createBtn = res => {
  res.data.forEach(item => {
    const btn = document.createElement('button');
    btn.className = "btn";
    btn.id = item.id;
    btn.innerHTML = item.label;

    ul.parentNode.insertBefore(btn, ul);
  })
}

const switchTab = res => {
  document.querySelectorAll('.btn').forEach((item) => {
    item.addEventListener('click', event => {
      const target = Number(event.target.id);
      ul.innerHTML = '';

      res.data.forEach(item => {
        item.id === target ? item.selected = true : item.selected = false;
      })
      addDataToInnerHTML(res);
    })
  })
}

(async function onDataLoad() {
  const data = await getData();
  const list = createListItem(data);
  console.log("list", list)
  addDataToInnerHTML(list);
  createBtn(data);
  switchTab(data);
}());
