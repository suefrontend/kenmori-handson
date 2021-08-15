const ul = document.getElementById('lists');

let currentImage = 0;

function createLoader() {
  const fragment = document.createDocumentFragment();
  const loaderContainer = document.createElement('li')
  const loader = document.createElement('img');
  loader.src = "./img/loading-circle.gif";
  fragment.appendChild(loader);
  loader.appendChild(loaderContainer)
  loader.classList.add('loader_image');
  return loader;
}

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fetch('./js/json/task17.json'));
    }, 3000)
  })
}

async function getData() {
  const loaderImage = createLoader();

  const fragment = document.createDocumentFragment();
  const li = document.createElement('li');
  li.classList.add('loader')

  li.appendChild(loaderImage)
  fragment.appendChild(li)
  ul.appendChild(fragment)
   
  try {
    ul.appendChild(fragment);
    const response = await fetchData();
    return await response.json();
  }
  catch(error) {
    ul.innerHTML = "Couldn't get response."
  }
  finally {
    console.log("You got the result.")
    ul.removeChild(li);
  }
}

async function displayImage(currentImage) {
  const res = await getData();
  const data = res.data;  
  const loaderImage = createLoader();
  const fragment = document.createDocumentFragment();

  let images = data.map(el => {

    const image = document.createElement('img');
    const li = document.createElement('li');
    li.classList.add('active');
    
    image.src = el.image;
    li.appendChild(image);
  
    return li;
  })

  fragment.appendChild(images[currentImage]);
  ul.innerHTML = "";
  ul.appendChild(fragment);
  
}

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
  ul.parentNode.appendChild(nextBtn);
}

createPrevButton();
createNextButton();

const prevBtn = document.getElementById('prev');
prevBtn.addEventListener('click', async function(e) {

  e.target.disabled = true;

  if(currentImage > 0) {
    e.target.disabled = false;
    nextBtn.disabled = false;
    currentImage--;
    displayImage(currentImage);
  }
  if(currentImage === 0) {
    e.target.disabled = true;
  }  
})

const nextBtn = document.getElementById('next');
nextBtn.addEventListener('click', async function(e) {

  prevBtn.disabled = false;
  currentImage++;
  console.log(currentImage)
  displayImage(currentImage);

  if(currentImage === 4) {
    e.target.disabled = true;
  }
})

document.addEventListener("DOMContentLoaded", async function() {
  displayImage(currentImage);    
});
