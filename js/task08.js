const data = [
  {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
  {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
]

const ul = document.querySelector('#lists');

// loader画像
const loader = document.createElement('img');
loader.src = "./img/loading-circle.gif";

const promise = new Promise((resolve,reject) => {

  //loading画像
    ul.appendChild(loader);

    // いままでresolveとしていたところでrejectを実行
    //3秒後にrejectを実行
    setTimeout(() => {
      reject(data);
    }, 3000)

});

//thenでその値をコンソール出力してください
// エラーを起こしてcatchでエラーをキャッチ
promise.then().catch((error) => {
  console.log("エラーが起こりました", error);
})
