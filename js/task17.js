// 画面遷移してから3秒後に解決されるPromiseが返すオブジェクトを元にimgタグを5つつくる。

// それぞれは.z-indexで重ねた状態。クリックを押すと画像が変わる

// 5枚中何枚目かを表示して、5/5の場合Nextの矢印はdisabledにする。1/5枚の時はBackボタンはdisabledにする

// for か map でループして、ボタンを押すと、[1] が表示されるようにする

// loadされた時は、[0] が表示されている
// もしボタンを押すと、[1]が表示される
// Prev Next ボタンが必要


const ul = document.getElementById('lists');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

function fetchData() {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve(fetch('./js/json/task17.json'));
    }, 3000)
    
  })
}

async function getData() {

  ul.appendChild(loader);

  try {
    const response = await fetchData();
    return await response.json();
  }
  catch(error) {
    ul.innerHTML = "Couldn't get response."
  }
  finally {
    console.log("You got the result.")
    ul.removeChild(loader);
  }
}

function displayImage(res) {
  const data = res.data;  

  const fragment = document.createDocumentFragment();
  
  const image = document.createElement('img');
  const li = document.createElement('li');
  li.classList.add('active')
  image.src = data[currentImage].image;    

  li.appendChild(image)
  fragment.appendChild(li)
  ul.appendChild(fragment);
}

let currentImage = 0;

function createPrevButton() {
  const prevBtn = document.createElement('button');
  prevBtn.id = "prev";
  prevBtn.innerHTML = "Prev";
  prevBtn.disabled = true;
  ul.parentNode.insertBefore(prevBtn, ul);
}

function createNextButton() {
  const nextBtn = document.createElement('button');
  nextBtn.id = "next";
  nextBtn.innerHTML = "Next";
  nextBtn.disabled = false;
  ul.parentNode.appendChild(nextBtn);
}

if(prevBtn) {
  prevBtn.addEventListener('click', async function(e) {
    const res = await getData();
  
    e.target.disabled = true;
  
    if(currentImage > 0) {
      currentImage--;
      displayImage(res);
    }
  })
}

if(nextBtn) {
  nextBtn.addEventListener('click', async function() {
    console.log("nextBtn was cllicked");

    const res = await getData();
  
    if(currentImage < res.length - 1) {
      currentImage++;
      console.log("currentImage", currentImage)
      displayImage(res);
    }
  })
}

// (async function onDataLoad() {
//   const data = await getData();
//   displayImage(data);    
//   createPrevButton();
//   createNextButton();
// }());

document.addEventListener("DOMContentLoaded", async function() {
  createPrevButton();
  createNextButton();
  const data = await getData();
  displayImage(data);    
});
