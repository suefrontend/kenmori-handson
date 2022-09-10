const ul = document.getElementById('lists');
const modalBtn = document.getElementById("modal-btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const numberInput = document.getElementById("number_input");
const nameInput = document.getElementById("name_input");
const requestForm = document.getElementById('api_request_form');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

function fetchData() {
  return new Promise((resolve, reject) => {

    resolve(fetch('https://jsondata.okiba.me/v1/json/ARA1Z210401070524'));

  })
}

async function getFetchedData() {

  ul.appendChild(loader);

  try {
    const response = await fetchData();
    return await response.json();
  }
  catch(error) {
    console.log(error);
  }
  finally {
    console.log("finally")
    ul.removeChild(loader);
  }
}

const addDataToInnerHTML = data => {
  const createNode = data.reduce((prev, current) => `${prev}<li>${current.id} - ${current.name} - ${current.tel}</li>`, "");
  ul.innerHTML = createNode;
}

modalBtn.addEventListener('click', function() {
  // 前回fetchしたデータが表示されていた部分を空にする
  ul.innerHTML = "";

  // 前回inputに入れた数字を空にする
  numberInput.value = "";

  // 前回inputに入れた名前を空にする
  nameInput.value = "";

  modal.style.display = "block";
})

requestForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  console.log(`input number, ${numberInput.value}`);
  console.log(`input value, ${nameInput.value}`);
  const data = await getFetchedData();
  addDataToInnerHTML(data);
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
