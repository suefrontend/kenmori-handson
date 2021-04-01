const ul = document.getElementById('lists');
let modalBtn = document.getElementById("modal-btn")
let modal = document.querySelector(".modal")
let closeBtn = document.querySelector(".close-btn")

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(fetch('https://jsondata.okiba.me/v1/json/ARA1Z210401070524'));
    }, 3000)
  })
}

async function renderData() {

  // fetchDataで取得したデータを入れる変数
  let data;

  //loading画像を出す
  if(!data) {
    ul.appendChild(loader);
  }

  try {
    const response = await fetchData();
    data = await response.json();
  }
  catch(error) {
    console.log(error);
  }
  finally {
    if(data) {
      ul.removeChild(loader);
    }
  }

  const markup = data.reduce((prev, current) => {
    return `${prev}<li>${current.id} - ${current.name} - ${current.tel}</li>`;
  }, "")
  ul.innerHTML = markup;
}

modalBtn.addEventListener('click', function() {
  modal.style.display = "block"
  renderData();
});

closeBtn.addEventListener("click", function() {
  modal.style.display = "none"
});

document.addEventListener('click', function(e) {
  console.log("e", e)
  if(e.target == modal){
    modal.style.display = "none"
  }
})
