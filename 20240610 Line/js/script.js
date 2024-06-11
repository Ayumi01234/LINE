// Import the functions you need from the SDKs you need ここに書いた関数しか使えない
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/**
 * Config = 機密情報です！！！
 * この部分はGitHubに上げないこと！！！！！！！
 */
//


// Initialize Firebase firebaseにアクセス
const app = initializeApp(firebaseConfig);
// リアルデータベースにアクセスして、アクセスしたところから情報を取得した
const database = getDatabase(app);
// chatという階層にデータを入れる
const dbRef = ref(database, "chat");


//送信ぼたんを押した時の処置
$('#send').on("click",function(){
  // 入力欄のデータの取得
  const userName = $('#userName').val();
  const text = $("#text").val();
  console.log("12",userName,text);


// 送信データをオブジェクトにまとめる
const message = {
userName: userName,
// 右はconstのやつ
// 最近のJSでは、右と左が同じ時に左を省略できる
text: text
};

// firebase realtime databaseにオブジェクト送信
const newPostRef = push(dbRef);　　//ユニークキー(重複しないキーを自動で作る)をつける
set(newPostRef, message);　//作ったものがユニークキーの中に生成される
});

// 指定した場所にデータが追加されたことをけんち
onChildAdded(dbRef, function(data){
  // 追加されたデータをfirebaseから受け取り、
  // 分解ルールに則った分解方法
const message = data.val();
const key =data.key;
// ()の中身は何？データが（）に入ってくるという意味
let h = '<p>';
h += message.userName;
h += '<br>';
h += message.text;
h += '</p>';
$("#output").append(h); 
});