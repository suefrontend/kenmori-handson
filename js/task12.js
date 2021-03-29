const ul = document.getElementById('lists');
const btn = document.getElementById('btn');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(fetch('https://jsondata.okiba.me/v1/json/zPMMU210321111158'));
    }, 3000)
  })
}

async function renderData() {

  // fetchDataで取得したデータを入れる変数
  let data;

  //loading画像を出す
  ul.appendChild(loader);

  try {
    const response = await fetchData();
    data = await response.json();
  }
  catch(error) {
    console.log(error);
  }
  finally {
    ul.removeChild(loader);
  }

  const markup = data.reduce((prev, current) => {
    return `${prev}<li>${current.id} - ${current.name} - ${current.tel}</li>`;
  }, "")
  ul.innerHTML = markup;
}

btn.addEventListener('click', renderData);
