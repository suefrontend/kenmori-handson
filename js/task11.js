const ul = document.querySelector('#lists');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

async function fetchData() {
  const response = await fetch('https://jsondata.okiba.me/v1/json/zPMMU210321111158')
  return await response.json();
}

function timerForFetchingData() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(fetchData());
    }, 3000)
  })
}


async function renderData() {

  // fetchDataで取得したデータを入れる変数
  let data;

  //loading画像を出す
  ul.appendChild(loader);

  try {
    data = await timerForFetchingData();
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

renderData();
