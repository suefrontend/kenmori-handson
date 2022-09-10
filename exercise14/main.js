const ul = document.getElementById('lists');
const modalBtn = document.getElementById("modal-btn")
const fetchBtn = document.getElementById("fetch-btn")
const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close-btn")
const input = document.getElementById("input");

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

// 13で作ったモーダル内にinput (typeはnumber)をおいて、
// クリックした際にinput(type number)のvalueを取得して、リクエストできるようにしてください。
// (その値はPromiseを実行する手前でconsole.log出力されていればいいです)


function fetchData() {
  return new Promise((resolve, reject) => {

    resolve(fetch('https://jsondata.okiba.me/v1/json/ARA1Z210401070524'));

  })
}

async function renderData() {

  // fetchDataで取得したデータを入れる変数
  let data;

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

modalBtn.addEventListener('click', function() {
  // 前回fetchしたデータが表示されていた部分を空にする
  ul.innerHTML = "";
  // 前回inputに入れた数字を空にする
  input.value = "";
  modal.style.display = "block";
})

fetchBtn.addEventListener('click', function() {
  console.log("input value", input.value);
  renderData();
  modal.style.display = "none";
});

closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

document.addEventListener('click', function(e) {
  if(e.target === modal){
    modal.style.display = "none";
  }
})
