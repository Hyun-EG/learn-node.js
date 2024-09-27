node.js

[ express를 통한 포트여는법 ]

1. express 함수 변수 지정해주고

const app = express()

2. listen 사용해서 안에 포트번호
app.listen('8080')

[ express를 통한 데이터 보내는법 및 얻는법 ]

1. 마찬가지로 express 변수 app에 넣어줬다는 가정하
   
   문자열일때는 send , 파일일때는 sendFile

ex) app.get ('경로', (req,res)=>{
     res.send('반가워')
})

ex) app.get ('경로', (req,res)=>{
     res.sendFile(__dirname + '파일경로')
})


node server js 가 귀찮으면

nodemon 설치해주고

nodemon server.js 

[ 웹페이지에 디자인 넣으려면 ]

1. app.use 사용해야함 

ex) app.use(express.static(__dirname + '/public'))



[ 몽고 디비에 연결을 하려면 ... ]

const { MongoClient } = require("mongodb");

let db;
const url =
  "mongodb+srv://아이디:비번@codiee.fzkvs.mongodb.net/?retryWrites=true&w=majority&appName=codiee";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");

  })
  .catch((err) => {
    console.log(err);
  });

[ 몽고 디비에서 컬렉션의 document를 전부 출력하려면 ...]

app.get('/list', async (요청, 응답) => {
let result = await db.collection('post').find().toArray()
console.log(result);
}

몽고디비에서는 async , await을 사용하라고 강요함
then()안에 콜백함수로 넣어주는 방법도있고,
toArray 안에 넣어줄수도 있지만 , async, await을 사용하는걸 추천한다.


[ html을 꾸며서 데이터를 보내려면 ... ]

npm install ejs

app.set('view engine', 'ejs')

ejs 파일들은 views 폴더를 만들어서 안에 넣는게 국룰

ejs 파일은 일반 html 처럼 사용하면 됨

그리고 sendFile()이 아닌 render('경로')를 사용함
근데 이 경로는 views폴더 안에 넣어놨다면 경로 따로없이 파일 이름만 작성해도 무방함

[ 서버 데이터를 ejs 파일에 넣으려면 ... ]

1. ejs 파일로 데이터 전송
응답.render('list', {글목록 : result})  이렇게 넣어주면 되는데 { } 안에 넣어주는게 관습임

2. ejs 파일로 가서 보내준 데이터를 표시해주려면
<%= 데이터 %> 이런식으로 짜주면됨

<%= 글목록 > 
근데 이러면 객체 데이터로 나오기때문에 

<%= JSON.stringify(글목록) %>
이런식으로 문자열로 바꿔줘야함

cjs html에서 어느곳에서든 js문법을 사용할 수 있는데
조건은 js문법이 들어가는곳마다

<% %> 안에 달아줘야한다.

[ 컴포넌트 재사용 하듯 ejs 파일을 꽂아 다른 ejs에 꽂아 넣으려면 ... ]

<%- include('파일명') %>

<% js문법 사용할때 %>
<%= 데이터가 html 형식일경우 문자열로 바꿔서 나오게함 %>
<%-  데이터가 html 형식일경우 html 형식으로 나오게함 %>
