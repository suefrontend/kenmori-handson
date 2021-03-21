const ul = document.querySelector('#lists');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

async function fetchData() {

  const response = await fetch('https://jsondata.okiba.me/v1/json/zPMMU210321111158');
  const data = response.json();

  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(data);
    }, 3000)
  });

}

async function renderData() {

  //resolveになるまでの間にloading画像を出す
  ul.appendChild(loader);

  try {

    const data = await fetchData();

    const markup = data.reduce((prev, current) => {
      return `${prev}<li>${current.id} - ${current.name} - ${current.tel}</li>`;
    }, "")
    ul.innerHTML = markup;
  }
  catch(error) {
    console.log(error);
  }
  finally {
    ul.removeChild(loader);
  }
}

renderData();
